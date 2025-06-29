import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Department {
    id: number;
    name: string;
    code: string;
}

interface EditPersonelFormProps {
    departamentos: Department[];
    personel: {
        id: number;
        first_name: string;
        second_name: string | null;
        last_name: string;
        email: string;
        phone_number: string;
        departments: {
            id: number;
            name: string;
            code: string;
            pivot: {
                personel_id: number;
                department_id: number;
                begin_date: string;
                end_date: string | null;
            };
        }[];
    };
    onSubmit: (formData: any) => void;
    processing?: boolean;
}

export function Editform({ departamentos, personel, onSubmit, processing }: EditPersonelFormProps) {
    const currentDepartment = personel.departments.length > 0 ? personel.departments[0] : null;

    const { data, setData } = useForm({
        nombre: `${personel.first_name} ${personel.second_name || ''}`.trim(),
        telefono: personel.phone_number,
        email: personel.email,
        departamento: currentDepartment?.id.toString() || '',
    });

    useEffect(() => {
        if (currentDepartment && !departamentos.some((depto) => depto.id === currentDepartment.id)) {
            console.warn(`El departamento con ID ${currentDepartment.id} no existe en la lista proporcionada`);
            setData('departamento', '');
        }
    }, [departamentos, currentDepartment]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...data,
            departamento: data.departamento ? Number(data.departamento) : null,
        });
    };

    return (
        <div className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 text-center shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <Link
                    href={route('personel.show', { id: personel.id })}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                </Link>
            </div>

            <h1 className="mb-4 text-2xl font-bold">Editar Información del Personal</h1>
            <p className="mb-5 text-gray-600">Actualice los datos del personal</p>

            <form onSubmit={handleSubmit} className="space-y-8 border-t pt-7">
                <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="nombre">Nombre completo</Label>
                            <Input
                                id="nombre"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                placeholder="Nombre completo"
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Correo electrónico"
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#3d3d3d] shadow-sm focus:border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="departamento">Departamento</Label>
                            <Select onValueChange={(value) => setData('departamento', value)} value={data.departamento}>
                                <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                    <SelectValue placeholder={currentDepartment ? currentDepartment.name : 'Seleccionar Departamento'} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white shadow-sm">
                                    {departamentos.map((depto) => (
                                        <SelectItem
                                            key={depto.id}
                                            value={depto.id.toString()}
                                            className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black"
                                        >
                                            {depto.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                                id="telefono"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                placeholder="Número de teléfono"
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4 border-t pt-6">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-xl bg-[#1e9483] px-8 py-6 text-base text-white shadow-sm hover:bg-[#1e9483]/90"
                    >
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
