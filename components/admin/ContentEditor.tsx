"use client";

import { useState } from "react";
import type { CaseStudy, SiteContent } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import "./admin.css";

const BADGE_TONE_OPTIONS = [
  { value: "primary", label: "Primary / Orange" },
  { value: "secondary", label: "Secondary / Blue" }
];

const METRIC_ICON_OPTIONS = [
  { value: "trending_up", label: "Trending up" },
  { value: "eco", label: "Eco" },
  { value: "groups", label: "Groups" }
];

function createCaseDraft(nextSortOrder: number): CaseStudy {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    isPublic: true,
    sortOrder: nextSortOrder,
    badgeTone: "primary",
    metricValue: "",
    metricLabel: "",
    metricIcon: "trending_up",
    testimonial: ""
  };
}

export function ContentEditor({ content, cases }: { content: SiteContent; cases: CaseStudy[] }) {
  const [draft, setDraft] = useState(content);
  const [caseDrafts, setCaseDrafts] = useState(cases);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveContent() {
    setSaving(true);
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft)
    });
    setMessage(response.ok ? "內容已儲存" : "內容儲存失敗，請稍後再試");
    setSaving(false);
  }

  async function saveCases() {
    setSaving(true);
    const response = await fetch("/api/cases", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(caseDrafts)
    });

    setMessage(response.ok ? "案例已儲存" : "案例儲存失敗，請稍後再試");
    setSaving(false);
  }

  async function uploadImage(file: File) {
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: form });
    if (!response.ok) {
      setMessage("圖片上傳失敗，請確認 Vercel Blob Token 設定");
      return;
    }
    const body = await response.json();
    setDraft((current) => ({ ...current, heroImageUrl: body.url }));
  }

  async function uploadCaseImage(file: File, index: number) {
    const form = new FormData();
    form.set("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: form });
    if (!response.ok) {
      setMessage("圖片上傳失敗，請確認 Vercel Blob Token 設定");
      return;
    }
    const body = await response.json();
    updateCase(index, { imageUrl: body.url });
  }

  function updateCase(index: number, patch: Partial<CaseStudy>) {
    setCaseDrafts((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function addCase() {
    setCaseDrafts((rows) => [...rows, createCaseDraft(rows.length + 1)]);
  }

  function removeCase(index: number) {
    setCaseDrafts((rows) => rows.filter((_, i) => i !== index));
  }

  return (
    <div className="editor-grid">
      <section className="editor-panel card">
        <div className="editor-panel__head">
          <h2>Hero 內容</h2>
          <Badge tone="primary">首頁</Badge>
        </div>
        <Input label="主標題" value={draft.heroTitle} onChange={(e) => setDraft({ ...draft, heroTitle: e.target.value })} />
        <Textarea label="副標題" value={draft.heroSubtitle} onChange={(e) => setDraft({ ...draft, heroSubtitle: e.target.value })} />
        <Input label="Hero 圖片網址" value={draft.heroImageUrl} onChange={(e) => setDraft({ ...draft, heroImageUrl: e.target.value })} />
        <label className="upload-box">
          <span>上傳 Hero 圖片</span>
          <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0])} />
        </label>
        <div className="case-editor__row">
          <Input label="統計數字，例如 98%" value={draft.heroStatNumber} onChange={(e) => setDraft({ ...draft, heroStatNumber: e.target.value })} />
          <Input label="統計說明" value={draft.heroStatLabel} onChange={(e) => setDraft({ ...draft, heroStatLabel: e.target.value })} />
        </div>
        <Textarea label="Footer 文字" value={draft.footerText} onChange={(e) => setDraft({ ...draft, footerText: e.target.value })} />
        <Button disabled={saving} onClick={saveContent}>
          儲存 Hero 內容
        </Button>
      </section>

      <section className="editor-panel card">
        <div className="editor-panel__head">
          <h2>Success Stories 區塊文字</h2>
          <Badge tone="primary">首頁</Badge>
        </div>
        <Input label="區塊標題" value={draft.casesTitle} onChange={(e) => setDraft({ ...draft, casesTitle: e.target.value })} />
        <Textarea label="區塊副標題" value={draft.casesSubtitle} onChange={(e) => setDraft({ ...draft, casesSubtitle: e.target.value })} />
        <Button disabled={saving} onClick={saveContent}>
          儲存區塊文字
        </Button>
      </section>

      <section className="editor-panel card">
        <div className="editor-panel__head">
          <h2>申請區塊文字</h2>
          <Badge tone="primary">首頁</Badge>
        </div>
        <Input label="區塊標題" value={draft.applyTitle} onChange={(e) => setDraft({ ...draft, applyTitle: e.target.value })} />
        <Textarea label="區塊副標題" value={draft.applySubtitle} onChange={(e) => setDraft({ ...draft, applySubtitle: e.target.value })} />
        <Button disabled={saving} onClick={saveContent}>
          儲存申請區塊文字
        </Button>
      </section>

      <section className="editor-panel card">
        <div className="editor-panel__head">
          <h2>表單選項</h2>
          <Badge tone="primary">首頁</Badge>
        </div>
        <Textarea label="申請單位選項，使用逗號分隔" value={draft.formApplicantTypeOptions} onChange={(e) => setDraft({ ...draft, formApplicantTypeOptions: e.target.value })} />
        <Textarea label="機型選項，使用逗號分隔" value={draft.formMachineTypeOptions} onChange={(e) => setDraft({ ...draft, formMachineTypeOptions: e.target.value })} />
        <Textarea label="設置位置選項，使用逗號分隔" value={draft.formPlacementLocationOptions} onChange={(e) => setDraft({ ...draft, formPlacementLocationOptions: e.target.value })} />
        <Textarea label="電源選項，使用逗號分隔" value={draft.formPowerOutletOptions} onChange={(e) => setDraft({ ...draft, formPowerOutletOptions: e.target.value })} />
        <Textarea label="可聯繫時間，使用逗號分隔" value={draft.formAvailableTimeOptions} onChange={(e) => setDraft({ ...draft, formAvailableTimeOptions: e.target.value })} />
        <Button disabled={saving} onClick={saveContent}>
          儲存表單選項
        </Button>
      </section>

      <section className="editor-panel card editor-panel--wide">
        <div className="editor-panel__head">
          <h2>Success Stories 案例管理</h2>
          <Badge tone="blue">{caseDrafts.length} 筆</Badge>
        </div>
        {caseDrafts.map((item, index) => (
          <div className="case-editor" key={item.id}>
            <div className="case-editor__head">
              <strong>案例 {index + 1}</strong>
              <Button disabled={saving} size="sm" variant="danger" onClick={() => removeCase(index)}>
                刪除
              </Button>
            </div>
            <div className="case-editor__row">
              <Input label="標題" value={item.title} onChange={(e) => updateCase(index, { title: e.target.value })} />
              <Input label="分類 Badge" value={item.category} onChange={(e) => updateCase(index, { category: e.target.value })} />
            </div>
            <Textarea label="描述" value={item.description} onChange={(e) => updateCase(index, { description: e.target.value })} />
            <Input label="圖片網址" value={item.imageUrl} onChange={(e) => updateCase(index, { imageUrl: e.target.value })} />
            <label className="upload-box">
              <span>上傳案例圖片</span>
              <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadCaseImage(event.target.files[0], index)} />
            </label>
            <div className="case-editor__row">
              <Input label="排序" type="number" value={item.sortOrder} onChange={(e) => updateCase(index, { sortOrder: Number(e.target.value) })} />
              <Select
                label="Badge 色彩"
                options={BADGE_TONE_OPTIONS}
                value={item.badgeTone ?? "primary"}
                onChange={(e) => updateCase(index, { badgeTone: e.target.value as CaseStudy["badgeTone"] })}
              />
            </div>
            <div className="case-editor__row">
              <Input label="指標數值" value={item.metricValue ?? ""} onChange={(e) => updateCase(index, { metricValue: e.target.value })} />
              <Input label="指標說明" value={item.metricLabel ?? ""} onChange={(e) => updateCase(index, { metricLabel: e.target.value })} />
            </div>
            <Select
              label="指標 Icon"
              options={METRIC_ICON_OPTIONS}
              value={item.metricIcon ?? "trending_up"}
              onChange={(e) => updateCase(index, { metricIcon: e.target.value })}
            />
            <Textarea label="推薦語 / Testimonial" value={item.testimonial ?? ""} onChange={(e) => updateCase(index, { testimonial: e.target.value })} />
            <label className="case-editor__toggle">
              <input type="checkbox" checked={item.isPublic} onChange={(e) => updateCase(index, { isPublic: e.target.checked })} />
              前台顯示
            </label>
          </div>
        ))}
        <div className="case-editor__actions">
          <Button disabled={saving} variant="secondary" onClick={addCase}>
            新增案例
          </Button>
          <Button disabled={saving} onClick={saveCases}>
            儲存案例
          </Button>
        </div>
      </section>

      {message ? <p className="editor-message">{message}</p> : null}
    </div>
  );
}
