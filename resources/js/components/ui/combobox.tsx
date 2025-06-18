import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from '@/components/ui/button';

interface LocationExample {
    key: number;
    value: string;
}

interface ComboboxProps {
    locationList: LocationExample[];
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
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {data ? locationList.find((location) => location.key === data)?.value : 'Seleccionar ubicacion...'}
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
                                    key={location.key}
                                    value={`${location.key}_${location.value}`}
                                    onSelect={(currentValue) => {
                                        const value = Number(currentValue.split('_')[0]);
                                        setData(label, data === value ? '' : value);
                                        setOpen(false);
                                    }}
                                >
                                    <span>{location.value}</span>
                                    <Check className={cn('ml-auto', data === location.key ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}