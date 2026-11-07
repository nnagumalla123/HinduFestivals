import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-ivory hover:bg-maroon-deep border border-maroon hover:border-maroon-deep",
  secondary:
    "bg-transparent text-maroon border border-maroon hover:bg-gold-tint",
  quiet:
    "bg-transparent text-saffron-deep border border-transparent underline underline-offset-4 hover:bg-gold-tint",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-base", // 44px tall: comfortable touch target
  lg: "min-h-12 px-7 text-lg",
};

/** Shared look for <Button> and <ButtonLink>, so both stay identical. */
function buttonClasses(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = main action; secondary = outlined alternative; quiet = low-emphasis text button */
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button", // avoids accidentally submitting a surrounding form
  className,
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

/**
 * A real link (<a>) that looks like a button. Use it for navigation; use <Button>
 * for actions. Screen readers announce them differently, so the distinction matters.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
