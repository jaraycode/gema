     import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EquipmentFormData, EquipmentFormProps, EquipmentModel, TechnicalLocationModel } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Card } from '@/components/ui/card'; // Importar Card

type EquipmentFormProp = Pick<EquipmentFormProps, 'equipment_type' | 'locations' | 'technical_locations'>;

export interface EquipmentEditProps extends EquipmentFormProp {
    props: EquipmentModel;
}

export default function EquipmentEditForm({ equipment_type, locations, technical_locations, props }: EquipmentEditProps) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<EquipmentFormData>>({
        ...props,
        technical_location: String(props.technical_location),
    });

    const statusOptions = [
        { code: 0, name: 'inactivo' },
        { code: 1, name: 'activo' },
        { code: 2, name: 'mantenimiento' },
    ];

    const [locationOptions] = useState<TechnicalLocationModel[]>(technical_locations);

    const handleInputChange = (field: keyof EquipmentFormData, value: string | number) => {
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('equipment.update', { id: props.code }), {
            onFinish: () => reset('technical_location', 'type'),
        });
    };

    return (
        <Card className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 shadow-md"> {/* Cambiar 'card' por 'Card' */}
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <Link href={route('equipment.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>

            <h1 className="mb-4 text-center text-2xl font-bold">Actualizar Equipo</h1>
            <p className="mb-6 text-center text-gray-600">Complete la información del equipo</p>

            <form onSubmit={submit} className="space-y-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    {/* Campos individuales */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Marca del equipo <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Ej: Aire acondicionado"
                            value={data.brand}
                            onChange={(e) => handleInputChange('brand', e.target.value)}
                            className="rounded-xl py-7 text-[#8b8b8b] shadow-sm rounded-[8px] border border-zinc-200 bg-white text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.brand} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Modelo del equipo <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Ej: Aire acondicionado"
                            value={data.model}
                            onChange={(e) => handleInputChange('model', e.target.value)}
                            className="rounded-xl py-7 text-[#8b8b8b] shadow-sm rounded-[8px] border border-zinc-200 bg-white text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.model} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Serial <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            placeholder="Número de Serial"
                            value={data.serial}
                            onChange={(e) => handleInputChange('serial', e.target.value)}
                            disabled
                            className="rounded-xl py-7 text-[#8b8b8b] shadow-sm rounded-[8px] border border-zinc-200 bg-white text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.serial} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Tipo de Equipo <span className="text-red-500">*</span>
                        </label>
                        <Select value={data.type} onValueChange={(value) => handleInputChange('type', value)} required disabled>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un tipo de equipo" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {equipment_type.map((value, key) => (
                                    <SelectItem key={key} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">Descripción</label>
                        <textarea
                            placeholder="Descripción"
                            value={data.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full resize-none rounded-[8px] border border-zinc-200 bg-white px-4 py-3 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <InputError message={errors.description} />
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-900">Estado</label>
                    <div className="flex items-center gap-4">
                        {statusOptions.map((statusOption, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value={statusOption.code}
                                    checked={data.status === statusOption.code}
                                    onChange={(e) => handleInputChange('status', Number(e.target.value))}
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-base text-neutral-900 capitalize">{statusOption.name}</span>
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.status} />
                </div>

                <div className="mt-5 mb-4">
                    <Select
                        value={data.technical_location}
                        onValueChange={(value) => handleInputChange('technical_location', value)}
                        required
                        disabled
                    >
                        <SelectTrigger className="mt-5 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                            <SelectValue placeholder="Seleccione una ubicación técnica" className="text-[#8b8b8b]" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white shadow-sm">
                            {locationOptions.map((value, key) => (
                                <SelectItem value={String(value.id)} key={key}>
                                    {value.code}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.technical_location} />
                </div>

                {/* Botones */}
                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        href={route('equipment.index')}
                        className="flex h-12 items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="h-12 rounded-xl bg-[#1e9483] px-36 text-base text-white transition hover:bg-[#1e9483]/90"
                        disabled={processing}
                    >
                        Actualizar equipo
                    </button>
                </div>
            </form>
        </Card> 
    );
}