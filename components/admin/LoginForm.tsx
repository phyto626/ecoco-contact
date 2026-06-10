"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import "./admin.css";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { username, password, redirect: false });
    setLoading(false);

    if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setError("帳號或密碼不正確。");
  }

  return (
    <form className="login-card card" onSubmit={submit}>
      <div className="login-card__brand">
        <img src="/images/logo.png" alt="ECOCO Logo" style={{ height: "40px", width: "auto" }} />
        <div>
          <span>智慧回收機申請管理</span>
        </div>
      </div>
      <Input label="帳號" value={username} onChange={(e) => setUsername(e.target.value)} />
      <div className="ui-field">
        <span>密碼</span>
        <div style={{ position: "relative" }}>
          <input
            id="password"
            className="ui-input"
            style={{ paddingRight: "44px" }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword((p) => !p)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>
      {error ? <p className="field-error">{error}</p> : null}
      <Button disabled={loading} size="lg">
        <LockKeyhole size={18} />
        {loading ? "登入中..." : "登入後台"}
      </Button>
    </form>
  );
}
