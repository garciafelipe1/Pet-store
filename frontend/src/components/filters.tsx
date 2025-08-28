// src/components/Filters.tsx
"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FilterSection from "@/components/FilterSection";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface FilterSectionData {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FiltersProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (isOpen: boolean) => void;
  filters: FilterSectionData[];
}

export default function Filters({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filters,
}: FiltersProps) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <form className="mt-4 border-t border-gray-200">
            {filters.map((section) => (
              <FilterSection key={section.id} section={section} isMobile />
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
