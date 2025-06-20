import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { LocationModel } from "@/types";

interface ComboboxProps {
    locationList: LocationModel[];
    data: string | number;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData: any;
}

export default function Combobox({data, setData, locationList, label}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full px-4 py-6 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 justify-between",
                        "focus:outline-none focus:ring-2 focus:ring-teal-500"
                    )}
                >
                    {data ? locationList.find((location) => location.id === data)?.name : 'Seleccionar ubicacion...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] bg-white p-0">
                <Command>
                    <CommandInput placeholder="Buscar ubicacion..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Ubicacion no encontrada.</CommandEmpty>
                        <CommandGroup>
                            {locationList.map((location) => (
                                <CommandItem
                                    key={location.id}
                                    value={`${location.id}_${location.name}`}
                                    onSelect={(currentValue) => {
                                        const value = Number(currentValue.split('_')[0]);
                                        setData(label, data === value ? '' : value);
                                        setOpen(false);
                                    }}
                                >
                                    <span>{location.name}</span>
                                    <Check className={cn('ml-auto', data === location.id ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}