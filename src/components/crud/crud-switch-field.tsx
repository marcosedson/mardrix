"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function CrudSwitchField<TFieldValues extends FieldValues>(props: {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
}) {
  const { control, name, label, description } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-3">
            <div>
              <FormLabel>{label}</FormLabel>
              {description ? (
                <div className="text-xs text-muted-foreground">{description}</div>
              ) : null}
            </div>
            <FormControl>
              <Switch checked={!!field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

