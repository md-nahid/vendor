import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cx } from '@/cva.config'
import { IconCheck } from '@tabler/icons-react'
import { AnyFieldApi } from '@tanstack/react-form'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Label } from '../ui/label'
import { ComboboxOption } from './combobox-field'
import { ErrorMessage } from './error-message'
import { size } from 'lodash'

type MultiComboboxProps = {
  options: ComboboxOption[]
  field: AnyFieldApi
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  disabled?: boolean
  maxItems?: number
  labelHidden?: boolean
  label: string
}

export function MultiComboboxField({
  label,
  labelHidden = false,
  options,
  field,
  placeholder = 'Select options',
  emptyMessage = 'No results found.',
  searchPlaceholder = 'Search...',
  disabled = false,
}: MultiComboboxProps) {
  const [open, setOpen] = useState(false)
  const selectedValues = new Set(field.state.value as string[])
  const isPlaceholder = selectedValues.size > 0

  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name} className={cx({ 'sr-only': labelHidden })}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
            disabled={disabled}
          >
            <div
              className={cx(
                'flex flex-wrap items-center gap-1',
                !isPlaceholder && 'text-muted-foreground text-sm font-normal'
              )}
            >
              {isPlaceholder ? (
                <>
                  {Array.from(selectedValues).map((value) => {
                    const option = options.find((opt) => opt.value.toString() === value)
                    return (
                      <Badge key={value} variant="secondary" className="rounded-sm px-1 font-normal">
                        {option?.label}
                      </Badge>
                    )
                  })}
                </>
              ) : (
                <>{placeholder}</>
              )}
            </div>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty className="text-muted-foreground">{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value.toString())
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value.toString())
                        } else {
                          selectedValues.add(option.value.toString())
                        }
                        const filterValues = Array.from(selectedValues)
                        field.handleChange(filterValues.length ? filterValues : undefined)
                      }}
                    >
                      <IconCheck className={cx('mr-2 size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {size(field.state.value) > 0 && (
                <div className="border-t p-0.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center rounded-sm text-xs"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      field.handleChange([])
                    }}
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  )
}
