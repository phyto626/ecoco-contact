import Link from "next/link";
import Image from "next/image";
import "./public.css";

export function Navbar() {
  return (
    <header className="public-nav">
      <nav className="container public-nav__inner" aria-label="主要導覽">
        <Link className="public-nav__brand" href="/" aria-label="回到 ECOCO 首頁">
          <Image src="/images/logo.png" alt="ECOCO 宜可可循環經濟" width={256} height={86} priority />
        </Link>
        <div className="public-nav__links">
          <a href="#cases">案例展示</a>
          <a href="#apply">申請設置</a>
        </div>
        <a className="public-nav__cta" href="#apply">
          立即申請
        </a>
      </nav>
    </header>
  );
}
