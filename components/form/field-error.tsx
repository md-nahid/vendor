import { AnyFieldApi } from '@tanstack/react-form'

export function FieldError({ field }: { field: AnyFieldApi }) {
  return (
    <p className="mt-1.5 text-xs text-red-500">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <>{field.state.meta?.errors?.map((err) => err?.message)?.join(',')}</>
      ) : null}
    </p>
  )
}
