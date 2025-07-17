import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { DatePicker } from '@/components/ui/date-picker'
import { cx } from '@/cva.config'
import { ErrorMessage } from './error-message'
import { dateString } from '@/lib/utils'
interface DateFieldProps extends Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onChange'> {
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
}

export function DateField(props: Readonly<DateFieldProps>) {
  const { label, field, labelHidden = false, ...rest } = props
  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <DatePicker
        // id={field.name}
        // name={field.name}
        {...rest}
        value={field.state.value}
        // onBlur={field.handleBlur}
        onChange={(date) => field.handleChange(dateString(date, 'yyyy-MM-dd'))}
      />
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
      {/* {field.state.meta.errors.map((error) => (
                          <p key={error as string}>{error}</p>
                        ))} */}
    </div>
  )
}
