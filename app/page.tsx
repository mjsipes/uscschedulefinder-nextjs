"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { frameworks, Framework } from "./frameworks";

// // Define the type for a framework object
// interface Framework {
//   value: string;
//   label: string;
// }

// const frameworks: Framework[] = [
//   { value: "next.js", label: "Next.js" },
//   { value: "sveltekit", label: "SvelteKit" },
//   { value: "nuxt.js", label: "Nuxt.js" },
//   { value: "remix", label: "Remix" },
//   { value: "astro", label: "Astro" },
// ];

// Define the props type for ComboboxDemo
interface ComboboxDemoProps {
  onSelect: (value: string) => void;
}

export function ComboboxDemo({ onSelect }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    onSelect(newValue); // Trigger the callback to add to the table
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select a framework"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Define the props type for TableDemo
interface TableDemoProps {
  selectedFrameworks: Framework[];
}

export function TableDemo({ selectedFrameworks }: TableDemoProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Framework</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedFrameworks.map((framework) => (
          <TableRow key={framework.value}>
            <TableCell>{framework.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<
    Framework[]
  >([]);

  const handleFrameworkSelect = (selectedValue: string) => {
    if (
      selectedValue &&
      !selectedFrameworks.some((f) => f.value === selectedValue)
    ) {
      const framework = frameworks.find((f) => f.value === selectedValue);
      if (framework) {
        setSelectedFrameworks((prevFrameworks) => [
          ...prevFrameworks,
          framework,
        ]);
      }
    }
  };

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Schedule Helper by Adam Lewzuck and Michael Sipes!
      </h2>
      <ComboboxDemo onSelect={handleFrameworkSelect} />
      <TableDemo selectedFrameworks={selectedFrameworks} />
    </div>
  );
}
