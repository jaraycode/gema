import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EquipmentFormProps } from '@/types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/react';
import * as React from 'react';

interface EquipmentFormData {
    name: string;
    serial: string;
    type: string;
    description: string;
    module: string;
    status: string;
}

type EquipmentFromProp = Pick<EquipmentFormProps, 'equipment_type' | 'locations' | 'technical_locations'>;

const EquipmentForm: React.FC<EquipmentFromProp> = ({ equipment_type, locations, technical_locations }) => {
    const [formData, setFormData] = React.useState<EquipmentFormData>({
        name: '',
        serial: '',
        type: '',
        description: '',
        module: '',
        status: '',
    });

    const [locationOptions] = React.useState(['ubicacion1', 'ubicacion2', 'ubicacion3', 'otra']);
    const [query, setQuery] = React.useState('');

    const filteredLocations = query === '' ? locationOptions : locationOptions.filter((loc) => loc.toLowerCase().includes(query.toLowerCase()));

    const handleInputChange = (field: keyof EquipmentFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <Link href={route('equipment.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>

            <h1 className="mb-4 text-center text-2xl font-bold"> Registrar Nuevo Equipo</h1>
            <p className="mb-6 text-center text-gray-600">Complete la información del equipo</p>

            <form onSubmit={handleSubmit} className="space-y-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    {/* Campos individuales */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Nombre del equipo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Aire acondicionado"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full resize-none rounded-[8px] border border-zinc-200 bg-white px-4 py-3 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Serial <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Número de Serial"
                            value={formData.serial}
                            onChange={(e) => handleInputChange('serial', e.target.value)}
                            className="w-full resize-none rounded-[8px] border border-zinc-200 bg-white px-4 py-3 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Tipo de Equipo <span className="text-red-500">*</span>
                        </label>
                        <Select required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un tipo de equipo" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {equipment_type.map((value, key) => (
                                    <SelectItem key={key} value={value.code}>
                                        {`${value.code} - ${value.name}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">Descripción</label>
                        <textarea
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full resize-none rounded-[8px] border border-zinc-200 bg-white px-4 py-3 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-900">Estado</label>
                    <div className="flex items-center gap-4">
                        {['activo', 'inactivo', 'mantenimiento'].map((statusOption) => (
                            <label key={statusOption} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value={statusOption}
                                    checked={formData.status === statusOption}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                />
                                <span className="text-base text-neutral-900 capitalize">{statusOption}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-5 mb-4">
                    <p className="mb-5 text-center text-gray-600">Coloca la ubicación técnica</p>
                    <div className="grid grid-cols-4 gap-4">
                        <Select required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.module.map((value, key) => (
                                    <SelectItem value={String(value.id)} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.floor.map((value, key) => (
                                    <SelectItem value={String(value.id)} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.area.map((value, key) => (
                                    <SelectItem value={String(value.id)} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select required>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {locations.equipment.map((value, key) => (
                                    <SelectItem value={String(value.id)} key={key}>
                                        {value.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Select required>
                        <SelectTrigger className="mt-4 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Seleccione un edificio" className="text-[#8b8b8b]" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white shadow-sm">
                            {technical_locations.map((value, key) => (
                                <SelectItem value={String(value.id)} key={key}>
                                    {value.code}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Botones */}
                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        href={route('technical-location.index')}
                        className="flex h-12 items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <button type="submit" className="h-12 rounded-xl bg-[#1e9483] px-36 text-base text-white transition hover:bg-[#1e9483]/90">
                        Crear ubicación técnica
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EquipmentForm;
