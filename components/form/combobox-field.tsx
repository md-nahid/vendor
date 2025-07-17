import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cx } from '@/cva.config'
import { AnyFieldApi } from '@tanstack/react-form'
import isEmpty from 'lodash/isEmpty'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { ErrorMessage } from './error-message'

export type ComboboxOption = {
  value: string | number
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  placeholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  field: AnyFieldApi
  labelHidden?: boolean
  label?: string
}

export function ComboboxField(props: ComboboxProps) {
  const {
    options,
    placeholder = 'Select an option',
    emptyMessage = 'No options found.',
    className,
    disabled = false,
    field,
    labelHidden = false,
    label,
  } = props
  const [open, setOpen] = React.useState(false)
  const selectedOption = options.find((option) => option.value === field.state.value)

  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cx('line-clamp-1 flex w-full flex-nowrap justify-between text-ellipsis', {
              'text-muted-foreground font-normal': isEmpty(selectedOption?.label),
            })}
            disabled={disabled}
          >
            <span className="line-clamp-1 block text-ellipsis">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cx('w-full min-w-[var(--radix-popover-trigger-width)] p-0', className)}
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label.toString()}
                    onSelect={() => {
                      field.handleChange(option.value)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cx('mr-2 size-4', field.state.value === option.value ? 'opacity-100' : 'opacity-0')}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  )
}
