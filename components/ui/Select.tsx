import type { SelectHTMLAttributes } from "react";
import "./ui.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({ label, error, options, placeholder, id, className = "", ...props }: SelectProps) {
  const inputId = id ?? props.name;
  return (
    <label className="ui-field" htmlFor={inputId}>
      <span>{label}</span>
      <select id={inputId} className={`ui-input ui-select ${className}`} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="field-error">{error}</p> : null}
    </label>
  );
}
