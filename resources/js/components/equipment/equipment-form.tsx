import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card'; // Importando Card
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EquipmentFormData, EquipmentFormProps, TechnicalLocationModel } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type EquipmentFormProp = Pick<EquipmentFormProps, 'equipment_type' | 'locations' | 'technical_locations'>;

export default function EquipmentForm({ equipment_type, locations, technical_locations }: EquipmentFormProp) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<EquipmentFormData>>({
        model: '',
        brand: '',
        serial: '',
        type: '',
        description: '',
        technical_location: '',
        status: 1,
    });

    const statusOptions = [
        { code: 1, name: 'activo' },
        { code: 2, name: 'mantenimiento' },
        { code: 0, name: 'inactivo' },
    ];

    const [locationOptions, setLocationOptions] = useState<TechnicalLocationModel[]>(technical_locations);
    const [queryEquipment, setQueryEquipment] = useState('');
    const [queryOffice, setQueryOffice] = useState('');
    const [queryFloor, setQueryFloor] = useState('');
    const [queryBuilding, setQueryBuilding] = useState('');

    const handleFilter = (valueQuery: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setValue(valueQuery);
        const model = locationOptions.filter((value) => value.code.includes(valueQuery));
        setLocationOptions(model);
    };

    const clearFilter = (setsQuerys: Array<React.Dispatch<React.SetStateAction<string>>>) => {
        setsQuerys.forEach((setValue) => setValue(''));
        setLocationOptions(technical_locations);
    };

    const handleInputChange = (field: keyof EquipmentFormData, value: string | number) => {
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('equipment.store'), {
            onFinish: () => reset('technical_location', 'type'),
        });
    };

    return (
        <Card className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 shadow-md">
            {' '}
            {/* Usando Card */}
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <Link href={route('equipment.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>
            <h1 className="mb-4 text-center text-2xl font-bold"> Registrar Nuevo Equipo</h1>
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
                            placeholder="Ej: Samsung"
                            value={data.brand}
                            onChange={(e) => handleInputChange('brand', e.target.value)}
                            className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
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
                            className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
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
                            className="rounded-[8px] border border-zinc-200 bg-white py-7 text-base text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                        />
                        <InputError message={errors.serial} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Tipo de Equipo <span className="text-red-500">*</span>
                        </label>
                        <Select value={data.type} onValueChange={(value) => handleInputChange('type', value)} required>
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
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Descripción <span className="text-red-500">*</span>
                        </label>
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
                    <label className="mb-2 block text-sm font-medium text-neutral-900">
                        Estado <span className="text-red-500">*</span>
                    </label>
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
                    <p className="mb-5 text-center text-neutral-700">Coloca la ubicación técnica</p>
                    <div className="mb-15 grid grid-cols-5 gap-4">
                        <Select value={queryBuilding} onValueChange={(value) => handleFilter(value, setQueryBuilding)}>
                            <SelectTrigger className="mt-1 w-[200px] rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.module.map((value, key) => (
                                    <SelectItem value={value.code} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={queryFloor} onValueChange={(value) => handleFilter(value, setQueryFloor)}>
                            <SelectTrigger className="mt-1 w-[200px] rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un piso" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.floor.map((value, key) => (
                                    <SelectItem value={value.code} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={queryOffice} onValueChange={(value) => handleFilter(value, setQueryOffice)}>
                            <SelectTrigger className="mt-1 w-[200px] rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un área" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.area.map((value, key) => (
                                    <SelectItem value={value.code} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={queryEquipment} onValueChange={(value) => handleFilter(value, setQueryEquipment)}>
                            <SelectTrigger className="mt-1 w-[200px] rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Seleccione un equipo" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.equipment.map((value, key) => (
                                    <SelectItem value={value.code} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <button
                            type="button"
                            onClick={() => clearFilter([setQueryBuilding, setQueryEquipment, setQueryFloor, setQueryOffice])}
                            className="mt-1 h-14 rounded-xl bg-[#1e9483] px-10 text-base text-white transition hover:bg-[#1e9483]/90"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                    <Select value={data.technical_location} onValueChange={(value) => handleInputChange('technical_location', value)} required>
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
                        Crear equipo
                    </button>
                </div>
            </form>
        </Card>
    );
}
