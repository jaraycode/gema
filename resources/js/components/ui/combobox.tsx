import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { LocationModel } from "@/types";

interface ComboboxProps {
    locationList: LocationModel[];
    equipmentList?: LocationModel[];
    data: string | number;
    label: string;
    disable?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData: any;
    setComboEnabled?: React.Dispatch<React.SetStateAction<ComboVerification>>;
}
interface ComboVerification {
    level5: boolean;
    level6: boolean;
    level7: boolean;
}

export default function Combobox({data, setData, locationList, label, disable, equipmentList, setComboEnabled}: ComboboxProps) {
    const [open, setOpen] = useState(false);
    // const labels = ['level5', 'level6', 'level7'];

    const handleSelect = (currentValue: string) => {
                                        const value = Number(currentValue.split('_')[0]);
                                        setData(label, data === value ? '' : value);
                                        if (equipmentList) {
                                            setCombo((equipmentList.find((valueList) => valueList.id === value)) ? false : true);
                                        }
                                        setOpen(false);
                                    };

    const setCombo = (response: boolean) => {
        if (response) {
            if (label === 'level4') {
                if (setComboEnabled) setComboEnabled({level5: false, level6: true, level7: true});
            }
            if (label === 'level5') {
                if (setComboEnabled) setComboEnabled({level5: false, level6: false, level7: true});
            }
            if (label === 'level6') {
                if (setComboEnabled) setComboEnabled({level5: false, level6: false, level7: false});
            }
        }
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disable ? disable : false}>
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
                                    onSelect={handleSelect}
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