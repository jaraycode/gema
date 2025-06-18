import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface TechnicalLocationFormData {
    level1: number | string;
    level2: number | string;
    level3: number | string;
    level4: number | string;
    level5: number | string;
    level6: number | string;
    level7: number | string;
}

interface LocationExample {
    key: number;
    value: string;
}

export default function TechnicalLocationForm() {
    const { data, setData, post, processing } = useForm<Required<TechnicalLocationFormData>>({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        level6: '',
        level7: '',
    });
    const [open, setOpen] = useState(false);
    const [locationOptions] = useState<LocationExample[]>([
        { key: 1, value: 'ubicacion' },
        { key: 2, value: 'holaj' },
        { key: 3, value: 'adios' },
        { key: 4, value: 'amor' },
    ]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('technical-location.store'), {});
    };

    return (
        <section>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start bg-white p-5 pt-0">
                <div className="relative w-full">
                    {/* Header */}
                    <div className="flex h-[100px] flex-col items-center justify-center rounded-2xl border-b border-b-gray-200 bg-white">
                        <div className="text-2xl leading-8 font-bold text-neutral-900">Registrar Nueva Ubicación</div>
                        <div className="text-sm leading-5 text-slate-500">Complete la información de la ubicación</div>
                    </div>
                    <form onSubmit={submit}>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                                    {data.level1 ? locationOptions.find((location) => location.key === data.level1)?.value : 'Select framework...'}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] bg-white p-0">
                                <Command>
                                    <CommandInput placeholder="Buscar ubicacion..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>Ubicacion no encontrada.</CommandEmpty>
                                        <CommandGroup>
                                            {locationOptions.map((location) => (
                                                <CommandItem
                                                    key={location.key}
                                                    value={`${location.key}_${location.value}`}
                                                    onSelect={(currentValue) => {
                                                        const value = Number(currentValue.split('_')[0]);
                                                        setData('level1', data.level1 === value ? '' : value);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <span>{location.value}</span>
                                                    <Check className={cn('ml-auto', data.level1 === location.key ? 'opacity-100' : 'opacity-0')} />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {/* Botones */}
                        <div className="mt-6 flex h-16 items-center justify-center border-t border-t-gray-200">
                            <div className="mt-12 flex w-full max-w-2xl flex-col gap-4 md:flex-row">
                                <Link
                                    href={route('technical-location.index')}
                                    className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 text-base text-slate-500 transition-colors hover:bg-gray-200"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-xl bg-teal-600 text-base text-white transition-colors hover:bg-teal-700"
                                    disabled={processing}
                                >
                                    Crear Ubicación
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
