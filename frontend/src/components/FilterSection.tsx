// src/components/FilterSection.tsx
"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useId } from "react";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterSectionProps {
  section: {
    id: string;
    name: string;
    options: FilterOption[];
  };
  isMobile?: boolean; // Propiedad opcional para manejar IDs únicos en móviles
}

export default function FilterSection({ section, isMobile }: FilterSectionProps) {
  const uniqueId = useId(); // Usamos useId para generar IDs únicos

  return (
    <Disclosure as="div" className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span className="font-medium text-gray-900">{section.name}</span>
          <span className="ml-6 flex items-center">
            <PlusIcon
              aria-hidden="true"
              className="size-5 group-data-[open]:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="size-5 group-data-[open]:block hidden"
            />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel className="pt-6">
        <div className="space-y-4">
          {section.options.map((option, optionIdx) => {
            const id = isMobile
              ? `filter-mobile-${section.id}-${optionIdx}-${uniqueId}`
              : `filter-${section.id}-${optionIdx}-${uniqueId}`;

            return (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  id={id}
                  defaultChecked={option.checked}
                  value={option.value}
                />
                <Label htmlFor={id} className="ml-3 text-sm text-gray-600">
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
