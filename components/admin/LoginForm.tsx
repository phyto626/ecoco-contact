"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Recycle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import "./admin.css";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <Recycle size={34} />
        <div>
          <strong>ECOCO Admin</strong>
          <span>智慧回收機申請管理</span>
        </div>
      </div>
      <Input label="帳號" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="密碼" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="預設 admin123，正式環境請改 .env" />
      {error ? <p className="field-error">{error}</p> : null}
      <Button disabled={loading} size="lg">
        <LockKeyhole size={18} />
        {loading ? "登入中..." : "登入後台"}
      </Button>
    </form>
  );
}
