import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("connects the label to the input", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("describes the field with its hint", () => {
    render(<Input label="Email" hint="Never shown publicly" />);
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription("Never shown publicly");
  });

  it("marks the field invalid and announces the error message", () => {
    render(<Input label="Email" error="Enter a valid email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email");
  });

  it("is not marked invalid when there is no error", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-invalid");
  });

  it("passes the required attribute through", () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
  });

  it("gives each input its own id", () => {
    render(
      <>
        <Input label="First" />
        <Input label="Second" />
      </>,
    );
    expect(screen.getByLabelText("First").id).not.toBe(screen.getByLabelText("Second").id);
  });
});
