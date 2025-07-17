import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cx } from '@/cva.config'
import { ErrorMessage } from './error-message'
import { isEmpty } from 'lodash'
interface SelectFieldProps extends React.ComponentProps<typeof Select> {
  placeholder?: string
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
  options: { value: string | number; label: string }[]
}

export function SelectField(props: Readonly<SelectFieldProps>) {
  const { label, field, options, labelHidden = false, placeholder = 'Select an option', ...rest } = props
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Select onValueChange={field.handleChange} value={field.state.value} {...rest}>
        <SelectTrigger id={field.name} onBlur={field.handleBlur} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {isEmpty(options) ? (
            <div className="text-muted-foreground py-8 text-center text-sm">No options available</div>
          ) : null}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  )
}
