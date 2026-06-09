"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TAIWAN_CITIES } from "@/lib/constants";
import "./public.css";

type FormState = {
  applicantType: string;
  contactName: string;
  phone: string;
  email: string;
  venueName: string;
  city: string;
  address: string;
  machineType: string[];
  placementLocation: string;
  hasPowerOutlet: string;
  additionalNotes: string;
  availableTime: string[];
};

const initialState: FormState = {
  applicantType: "",
  contactName: "",
  phone: "",
  email: "",
  venueName: "",
  city: "",
  address: "",
  machineType: [],
  placementLocation: "",
  hasPowerOutlet: "",
  additionalNotes: "",
  availableTime: []
};

export function ApplicationForm({ content }: { content: import("@/types").SiteContent }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const cityOptions = useMemo(() => TAIWAN_CITIES.map((city) => ({ value: city, label: city })), []);

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function toggleTime(value: string) {
    setForm((current) => ({
      ...current,
      availableTime: current.availableTime.includes(value)
        ? current.availableTime.filter((item) => item !== value)
        : [...current.availableTime, value]
    }));
    setErrors((current) => ({ ...current, availableTime: "" }));
  }

  function toggleMachineType(value: string) {
    setForm((current) => ({
      ...current,
      machineType: current.machineType.includes(value)
        ? current.machineType.filter((item) => item !== value)
        : [...current.machineType, value]
    }));
    setErrors((current) => ({ ...current, machineType: "" }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.applicantType) nextErrors.applicantType = "請選擇申請單位類型";
    if (!form.contactName.trim()) nextErrors.contactName = "請填寫聯絡人";
    if (!/^09\d{2}-?\d{3}-?\d{3}$/.test(form.phone.trim())) nextErrors.phone = "請輸入台灣手機格式，例如 0912-345-678";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "請輸入有效 Email";
    if (!form.venueName.trim()) nextErrors.venueName = "請填寫場域名稱";
    if (!form.city) nextErrors.city = "請選擇縣市";
    if (!form.address.trim()) nextErrors.address = "請填寫詳細地址";
    if (form.machineType.length === 0) nextErrors.machineType = "請選擇機型需求";
    if (!form.placementLocation) nextErrors.placementLocation = "請選擇預計放置位置";
    if (!form.hasPowerOutlet) nextErrors.hasPowerOutlet = "請確認電源狀態";
    if (form.availableTime.length === 0) nextErrors.availableTime = "請至少選擇一個方便聯繫時段";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setForm(initialState);
    setStatus("success");
  }

  return (
    <section className="section apply" id="apply">
      <div className="container apply__wrap">
        <div className="section-heading section-heading--left">
          <span className="eyebrow">Application</span>
          <h2 className="section-title">{content.applyTitle ?? "申請設置 ECOCO 智慧回收機"}</h2>
          <p className="muted">{content.applySubtitle ?? "完成表單後，我們會依照場域條件與需求，由專人安排後續聯繫與評估。"}</p>
        </div>
        <form className="apply-form card" onSubmit={submit}>
          <fieldset>
            <legend>申請單位類型 *</legend>
            <div className="chip-row">
              {(content.formApplicantTypeOptions ?? "企業,社區大樓,學校,商場零售,政府機關,其他").split(",").map((item) => (
                <label className="choice-chip" key={item}>
                  <input
                    type="radio"
                    name="applicantType"
                    checked={form.applicantType === item}
                    onChange={() => updateField("applicantType", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            {errors.applicantType ? <p className="field-error">{errors.applicantType}</p> : null}
          </fieldset>

          <div className="form-grid">
            <Input label="聯絡人 *" name="contactName" value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} error={errors.contactName} />
            <Input label="聯絡電話 *" name="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} error={errors.phone} placeholder="0912-345-678" />
            <Input label="Email *" name="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} error={errors.email} />
            <Input label="場域名稱 / 單位名稱 *" name="venueName" value={form.venueName} onChange={(e) => updateField("venueName", e.target.value)} error={errors.venueName} />
            <Select label="場域縣市 *" name="city" value={form.city} onChange={(e) => updateField("city", e.target.value)} options={cityOptions} placeholder="請選擇縣市" error={errors.city} />
            <Input label="詳細地址 *" name="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} error={errors.address} />
            
            <fieldset style={{ gridColumn: "1 / -1" }}>
              <legend>機型需求 *</legend>
              <div style={{ display: "grid", gap: "12px", marginTop: "8px" }}>
                {(content.formMachineTypeOptions ?? "寶特瓶回收機,多品項回收機,大型場域方案").split(",").map((item) => {
                  let desc = "";
                  if (item === "寶特瓶回收機") desc = "適合一般社區、商辦，專收寶特瓶";
                  else if (item === "多品項回收機") desc = "可收寶特瓶、鋁罐、塑膠杯等";
                  else if (item === "大型場域方案") desc = "適合大型商場、賣場之客製化方案";
                  
                  return (
                    <label key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer" }}>
                      <input 
                        type="checkbox" 
                        checked={form.machineType.includes(item)} 
                        onChange={() => toggleMachineType(item)} 
                        style={{ marginTop: "4px" }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "15px" }}>{item}</div>
                        {desc && <div style={{ fontSize: "13px", color: "var(--color-muted)" }}>{desc}</div>}
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.machineType ? <p className="field-error">{errors.machineType}</p> : null}
            </fieldset>

            <Select
              label="預計放置位置 *"
              name="placementLocation"
              value={form.placementLocation}
              onChange={(e) => updateField("placementLocation", e.target.value)}
              placeholder="請選擇"
              error={errors.placementLocation}
              options={(content.formPlacementLocationOptions ?? "室內,半戶外,戶外,尚未確定").split(",").map((item) => ({ value: item, label: item }))}
            />
            <Select
              label="電源狀態 *"
              name="hasPowerOutlet"
              value={form.hasPowerOutlet}
              onChange={(e) => updateField("hasPowerOutlet", e.target.value)}
              placeholder="請選擇"
              error={errors.hasPowerOutlet}
              options={(content.formPowerOutletOptions ?? "有,無,需協助確認").split(",").map((item) => ({ value: item, label: item }))}
            />
          </div>

          <fieldset>
            <legend>方便聯繫時段 *</legend>
            <div className="chip-row">
              {(content.formAvailableTimeOptions ?? "平日上午,平日下午,平日晚上,假日").split(",").map((item) => (
                <label className="choice-chip" key={item}>
                  <input type="checkbox" checked={form.availableTime.includes(item)} onChange={() => toggleTime(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            {errors.availableTime ? <p className="field-error">{errors.availableTime}</p> : null}
          </fieldset>

          <Textarea label="補充說明" name="additionalNotes" value={form.additionalNotes} onChange={(e) => updateField("additionalNotes", e.target.value)} placeholder="例如人流、預計設置時間、回收品項需求" />

          <Button disabled={status === "submitting"} size="lg" className="apply-form__submit">
            {status === "submitting" ? (
              <>
                <svg style={{ animation: "spin 1s linear infinite", width: "18px", height: "18px", marginRight: "8px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
                </svg>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                送出中...
              </>
            ) : (
              <>
                <Send size={18} style={{ marginRight: "8px" }} />
                送出申請
              </>
            )}
          </Button>
          {status === "success" ? <p className="form-message form-message--success">已收到您的申請，ECOCO 專員會盡快聯繫您，讓我們 E 起為家園動起來！</p> : null}
          {status === "error" ? <p className="form-message form-message--error">送出時發生問題，請稍後再試。</p> : null}
        </form>
      </div>
    </section>
  );
}
