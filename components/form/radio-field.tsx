import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cx } from '@/cva.config'
import { ErrorMessage } from './error-message'
interface RadioGroupFieldProps extends React.ComponentProps<typeof RadioGroup> {
  labelHidden?: boolean
  label: string
  options: { value: string; label: string }[]
  field: AnyFieldApi
}

export function RadioGroupField(props: RadioGroupFieldProps) {
  const { label, options, field, className, labelHidden = false, ...rest } = props
  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <RadioGroup
        id={field.name}
        name={field.name}
        defaultValue={field.state.value}
        // onBlur={field.handleBlur}
        onValueChange={field.handleChange}
        className={cx('flex flex-wrap', className)}
        {...rest}
        // className="flex flex-col space-y-1"
      >
        {/* flex items-center space-x-3 space-y-0 */}
        {options.map((option) => (
          <div className="flex items-center space-x-2" key={option.value}>
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
      {/* <Label htmlFor={field.name}>{label}</Label>
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
      /> */}
      {/* {field.state.meta.errors.map((error) => (
                          <p key={error as string}>{error}</p>
                        ))} */}
    </div>
  )
}
