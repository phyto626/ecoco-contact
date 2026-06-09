import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./ui.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="ui-field" htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} className={`ui-input ${className}`} {...props} />
      {error ? <p className="field-error">{error}</p> : null}
    </label>
  );
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const inputId = id ?? props.name;
  return (
    <label className="ui-field" htmlFor={inputId}>
      <span>{label}</span>
      <textarea id={inputId} className={`ui-input ui-textarea ${className}`} {...props} />
      {error ? <p className="field-error">{error}</p> : null}
    </label>
  );
}
