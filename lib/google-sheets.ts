import type { CaseStudy, Lead, LeadStatus, SiteContent } from "@/types";
import { DEFAULT_CASES, DEFAULT_CONTENT, MOCK_LEADS } from "@/lib/constants";

type AppsScriptAction =
  | "getLeads"
  | "addLead"
  | "updateLeadStatus"
  | "getContent"
  | "saveContent"
  | "getCases"
  | "saveCases"
  | "ensureSetup";

type AppsScriptResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

const hasAppsScriptConfig = () => Boolean(process.env.GOOGLE_APPS_SCRIPT_URL);

async function callAppsScript<T>(action: AppsScriptAction, payload: Record<string, unknown> = {}) {
  if (!hasAppsScriptConfig()) return null;

  const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL as string, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action,
      secret: process.env.GOOGLE_APPS_SCRIPT_SECRET ?? "",
      ...payload
    }),
    cache: "no-store",
    redirect: "follow"
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed: ${response.status}`);
  }

  const result = (await response.json()) as AppsScriptResponse<T>;
  if (!result.ok) {
    throw new Error(result.error ?? "Apps Script request failed");
  }

  return result.data as T;
}

export async function getLeads() {
  const leads = await callAppsScript<Lead[]>("getLeads");
  return leads ?? MOCK_LEADS;
}

export async function addLead(input: Omit<Lead, "id" | "timestamp" | "status">) {
  const lead = await callAppsScript<Lead>("addLead", { lead: input });
  if (lead) return lead;

  const existing = await getLeads();
  return {
    ...input,
    id: `L-${String(existing.length + 1).padStart(3, "0")}`,
    timestamp: new Date().toISOString(),
    status: "新申請" as LeadStatus
  };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const lead = await callAppsScript<Lead | null>("updateLeadStatus", { id, status });
  if (lead !== null) return lead;

  const leads = await getLeads();
  const current = leads.find((item) => item.id === id);
  return current ? { ...current, status } : null;
}

export async function getContent(): Promise<SiteContent> {
  const content = await callAppsScript<SiteContent>("getContent");
  return content ? { ...DEFAULT_CONTENT, ...content } : DEFAULT_CONTENT;
}

export async function saveContent(content: SiteContent) {
  return (await callAppsScript<SiteContent>("saveContent", { content })) ?? content;
}

export async function getCases(): Promise<CaseStudy[]> {
  const cases = await callAppsScript<CaseStudy[]>("getCases");
  return cases ?? DEFAULT_CASES;
}

export async function saveCases(cases: CaseStudy[]) {
  return (await callAppsScript<CaseStudy[]>("saveCases", { cases })) ?? cases;
}

export async function ensureLeadHeaders() {
  await callAppsScript("ensureSetup");
}
