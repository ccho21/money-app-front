'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export type Option<T = string> = {
  label: string;
  value: T;
};

interface OptionSelectorDrawerProps<T = string> {
  isOpen: boolean;
  title: string;
  options: Option<T>[];
  selected?: T;
  onSelect: (value: T) => void;
  onClose: () => void;
}

export function OptionSelectorDrawer<T extends string | number>({
  isOpen,
  title,
  options,
  selected,
  onSelect,
  onClose,
}: OptionSelectorDrawerProps<T>) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="p-0">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-4">
          {/* <RadioGroup
            value={selected}
            onValueChange={(val) => {
              onSelect(val as T);
              onClose();
            }}
          >
            {options.map((option) => (
              <div key={String(option.value)} className="py-3 border-b">
                <label className="flex items-center justify-between w-full cursor-pointer">
                  <span className="text-sm">{option.label}</span>
                  <RadioGroupItem value={option.value} />
                </label>
              </div>
            ))}
          </RadioGroup> */}

          <button
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
