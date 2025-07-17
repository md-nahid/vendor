import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cx } from '@/cva.config'
import type { AnyFieldApi } from '@tanstack/react-form'
import { PatternFormat } from 'react-number-format'
import { ErrorMessage } from './error-message'

interface PatternFieldProps extends React.ComponentProps<typeof PatternFormat> {
  labelHidden?: boolean
  label: string
  field: AnyFieldApi
}
// interface PatternFieldProps
//   extends Omit<React.ComponentProps<typeof Input>, "type" | "id"> {
//   label: string;
//   field: AnyFieldApi;
// }

export function PatternField(props: PatternFieldProps) {
  const { label, field, labelHidden = false, ...rest } = props
  console.log('field.state.meta.errors', field.state.meta.errors)

  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <PatternFormat
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        valueIsNumericString={true}
        onValueChange={(values) => {
          // console.log(values);
          field.handleChange(values.floatValue)
        }}
        mask="_"
        {...rest}
        customInput={Input}
      />
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
      {/* {field.state.meta.errors.map((error) => (
                          <p key={error as string}>{error}</p>
                        ))} */}
    </div>
  )
}
