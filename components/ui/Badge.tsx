import type { ReactNode } from "react";
import "./ui.css";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "primary" | "secondary" | "blue" | "yellow" | "danger" | "success";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}
