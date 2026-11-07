import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Visible label text. Required: every input must have a label for screen readers. */
  label: string;
  /** Optional helper text shown under the field. */
  hint?: string;
  /** Error message. When set, the field is marked invalid and the message is announced. */
  error?: string;
}

export function Input({ label, hint, error, className, required, ...props }: InputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  // Tells assistive tech which texts describe this field.
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-maroon">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "min-h-11 rounded-md border bg-ivory-soft px-3 text-ink placeholder:text-ink-muted/70",
          error ? "border-error" : "border-ink-muted",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-semibold text-error">
          {error}
        </p>
      )}
    </div>
  );
}
