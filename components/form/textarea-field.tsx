import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { ErrorMessage } from './error-message'
import { cx } from '@/cva.config'
interface TextareaFieldProps extends React.ComponentProps<typeof Textarea> {
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
}

export function TextareaField(props: TextareaFieldProps) {
  const { label, field, labelHidden = false, ...rest } = props
  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...rest}
        // onChange={(e) => field.handleChange(e.target.valueAsNumber)}
        // name="age"
        // type="number"
      />
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
      {/* {field.state.meta.errors.map((error) => (
                          <p key={error as string}>{error}</p>
                        ))} */}
    </div>
  )
}
