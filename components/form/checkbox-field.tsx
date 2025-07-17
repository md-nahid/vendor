'use client'

import { Checkbox } from '@/components/ui/checkbox'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { cx } from '@/cva.config'
import { ErrorMessage } from './error-message'

// const FormSchema = z.object({
//   items: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one item.",
//   }),
// })

interface CheckboxGroupFieldProps extends React.ComponentProps<typeof Checkbox> {
  labelHidden?: boolean
  label: string
  options: { value: string; label: string }[]
  field: AnyFieldApi
}
export function CheckboxField(props: Readonly<CheckboxGroupFieldProps>) {
  const { label, options, field, className, labelHidden = false, ...rest } = props

  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <div className={cx('flex flex-col gap-2', className)}>
        {options.map((option) => (
          <div className="flex items-center space-x-2" key={option.value}>
            <Checkbox
              id={option.value}
              checked={field.state.value?.includes(option.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  return field.handleChange([...field.state.value, option.value])
                }
                return field.handleChange(field.state.value?.filter((value: string) => value !== option.value))
              }}
              {...rest}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  )
}
