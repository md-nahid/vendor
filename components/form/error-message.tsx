import { cx } from "@/config/cva.config";
import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod/v4";

type ErrorMessageProps = {
  meta: AnyFieldMeta;
  className?: string;
  labelHidden?: boolean;
};

export const ErrorMessage = ({
  meta,
  className,
  labelHidden,
}: ErrorMessageProps) => {
  if (!meta.isTouched) return null;
  if (meta.isValid) return null;
  return meta.errors.map(({ message }: ZodError) => (
    <p
      role="alert"
      key={message}
      className={cx(
        "text-destructive text-xs",
        labelHidden &&
          "bg-destructive/70 text-background flex flex-col justify-center p-1 leading-none font-medium",
        className
      )}
    >
      {message}
    </p>
  ));
};
