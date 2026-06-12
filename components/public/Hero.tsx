import Image from "next/image";
import { ArrowDown, PlayCircle, Recycle } from "lucide-react";
import type { SiteContent } from "@/types";
import { Button } from "@/components/ui/Button";
import "./public.css";

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section className="hero" style={{ minHeight: "auto", height: "480px", padding: 0, display: "flex", alignItems: "center" }}>
      <Image
        src={content.heroImageUrl}
        alt="ECOCO 智慧回收機應用場域"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "80% 38%", zIndex: 0 }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero__copy" style={{ maxWidth: "600px" }}>
          <span className="eyebrow" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)", background: "rgba(0,0,0,0.25)", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            <Recycle size={16} />
            Circular Economy Solution
          </span>
          <h1 className="page-title" style={{ color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.5)" }}>{content.heroTitle}</h1>
          <p style={{ color: "rgba(255, 255, 255, 0.95)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>{content.heroSubtitle}</p>
          <div className="hero__actions" style={{ marginTop: "12px" }}>
            <a href="#apply">
              <Button size="lg" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>立即申請設置</Button>
            </a>
            <a className="hero__secondary" href="#cases" style={{ borderColor: "rgba(255,255,255,0.6)", color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.8)", background: "rgba(0,0,0,0.15)" }}>
              <PlayCircle size={22} />
              查看案例
            </a>
          </div>
        </div>
        <div className="hero__stat" style={{ position: "absolute", right: "0", bottom: "-40px", left: "auto" }}>
          <strong>{content.heroStatNumber ?? "98%"}</strong>
          <span>{content.heroStatLabel ?? "合作場域滿意度"}</span>
        </div>
      </div>
    </section>
  );
}
