import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Switch } from '@/components/ui/switch'
import { cx } from '@/cva.config'
import { ErrorMessage } from './error-message'
interface SwitchFieldProps extends React.ComponentProps<typeof Switch> {
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
}

export function SwitchField(props: SwitchFieldProps) {
  const { label, field, labelHidden = false, ...rest } = props
  return (
    <div className="flex items-center gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Switch
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        onBlur={field.handleBlur}
        {...rest}
      />
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
      {/* {field.state.meta.errors.map((error) => (
                          <p key={error as string}>{error}</p>
                        ))} */}
    </div>
  )
}
