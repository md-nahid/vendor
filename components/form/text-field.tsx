import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cx } from '@/config/cva.config'
import type { AnyFieldApi } from '@tanstack/react-form'
import { ErrorMessage } from './error-message'
interface TextFieldProps extends React.ComponentProps<typeof Input> {
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
}

export function TextField(props: TextFieldProps) {
  const { label, type = 'text', labelHidden = false, field, ...rest } = props
  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        type={type}
        {...rest}
      />
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  )
}
