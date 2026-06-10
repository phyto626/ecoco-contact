import { Leaf } from "lucide-react";
import type { SiteContent } from "@/types";
import Image from "next/image";
import "./public.css";

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="public-footer">
      <div className="container public-footer__inner">
        <div>
          <Image src="/images/logo.png" alt="ECOCO Logo" width={160} height={54} className="public-footer__logo" />
        </div>
        <div className="public-footer__links">
          <a href="#cases">案例展示</a>
          <a href="#apply">申請設置</a>
          <span>
            <Leaf size={16} />
            Circular Economy
          </span>
        </div>
      </div>
    </footer>
  );
}
