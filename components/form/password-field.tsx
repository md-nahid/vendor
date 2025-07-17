"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { cx } from "@/config/cva.config";
import { Label } from "../ui/label";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ErrorMessage } from "./error-message";

interface PasswordFieldProps extends React.ComponentProps<typeof Input> {
  labelHidden?: boolean;
  label: string;
  field: AnyFieldApi;
}

export function PasswordField({
  label,
  field,
  labelHidden = false,
  ...props
}: Readonly<PasswordFieldProps>) {
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="relative">
      <Label
        htmlFor={field.name}
        className={cx("mb-2 block text-sm font-medium", {
          "sr-only": labelHidden,
        })}
      >
        {label}
      </Label>
      <div className="relative mb-3">
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={handlePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <IconEyeOff className="text-muted-foreground size-5" />
          ) : (
            <IconEye className="text-muted-foreground size-5" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  );
}
