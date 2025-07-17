import { ErrorMessage } from "@/components/form/error-message";
import { SpinnerIcon } from "@/components/icons/spinner-icon";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cx } from "@/cva.config";
import { IconCheck } from "@tabler/icons-react";
import { AnyFieldApi } from "@tanstack/react-form";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type PropTypes = {
  field: AnyFieldApi;
  labelHidden?: boolean;
  label?: string;
  queryOptions: UseQueryOptions;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export function AsyncComboboxField({
  field,
  labelHidden,
  label,
  queryOptions,
  disabled,
  className,
  placeholder = "Select option",
}: PropTypes) {
  const [open, setOpen] = useState(false);
  const { data = [], isFetching } = useQuery(queryOptions);

  const selectedValue = data.find(
    (item: SelectOption) => item.value == field.state.value
  )?.label;
  return (
    <div className={cx("grid w-full gap-3", className)}>
      <Label htmlFor={field.name} className={cx({ "sr-only": labelHidden })}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cx(
              "line-clamp-1 flex w-full flex-nowrap justify-between text-ellipsis",
              {
                "text-muted-foreground font-normal": isEmpty(selectedValue),
              }
            )}
            disabled={disabled}
          >
            <span className="line-clamp-1 block text-ellipsis">
              {selectedValue ?? placeholder}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              {!isFetching && (
                <CommandEmpty className="text-muted-foreground">
                  No Options Found
                </CommandEmpty>
              )}
              {isFetching && (
                <CommandEmpty className="text-muted-foreground flex items-center justify-center gap-2">
                  <SpinnerIcon className="size-5" /> Searching locations...
                </CommandEmpty>
              )}
              <CommandGroup>
                {data.map((item: SelectOption) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      field.handleChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <IconCheck
                      className={cx(
                        "mr-2 h-4 w-4",
                        item.value === field.state.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ErrorMessage meta={field.state.meta} labelHidden={labelHidden} />
    </div>
  );
}
