import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Departments {
    id: number;
    name: string;
    code: string;
}

interface CreatePersonelFormProps {
    departamentos: Departments[];
    onSubmit: (formData: any) => void;
    onCancel: () => void;
    processing?: boolean;
}

export function Createform({ departamentos, onSubmit, onCancel, processing = false }: CreatePersonelFormProps) {
    const [tipoDocumento, setTipoDocumento] = useState('V'); // Valor por defecto: V (Venezolano)
    const { data, setData } = useForm({
        nombre: '',
        telefono: '',
        email: '',
        departamento: '',
        cedula: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Combinamos el tipo de documento con el número de cédula
        const cedulaCompleta = `${tipoDocumento}-${data.cedula}`;
        onSubmit({
            ...data,
            cedula: cedulaCompleta,
        });
    };

    return (
        <div className="mx-auto rounded-xl bg-white px-14 py-7 pb-10 text-center shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <Link href="/personel" className="inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>
            <h1 className="mb-4 text-2xl font-bold">Registrar Nuevo Personal</h1>
            <p className="mb-5 text-gray-600">Complete la información del Personal</p>

            <form onSubmit={handleSubmit} className="space-y-8 border-t-1 pt-7">
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
                            <Label>Documento de Identidad</Label>
                            <div className="flex gap-2">
                                <Select value={tipoDocumento} onValueChange={setTipoDocumento}>
                                    <SelectTrigger className="w-20 rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl bg-white shadow-sm">
                                        <SelectItem value="V" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                            V
                                        </SelectItem>
                                        <SelectItem value="E" className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                            E
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="cedula"
                                    value={data.cedula}
                                    onChange={(e) => setData('cedula', e.target.value)}
                                    placeholder="Número de documento"
                                    maxLength={tipoDocumento === 'V' ? 8 : 10} // Ejemplo: diferentes longitudes máximas
                                    required
                                    className="mt-0 flex-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Ingresar correo electrónico"
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                                id="telefono"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                placeholder="Teléfono"
                                maxLength={11}
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    <div className="space-y-3">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select onValueChange={(value) => setData('departamento', value)} value={data.departamento}>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccionar Departamento" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {departamentos.map((depto) => (
                                    <SelectItem key={depto.id} value={String(depto.id)} className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                        {depto.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4 border-b-1 pb-6">
                    <Button type="button" onClick={onCancel} className="h-12 w-10 rounded-xl border-gray-500 bg-gray-200 px-36 hover:bg-gray-300/90">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing} className="h-12 w-10 rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90">
                        Crear Nuevo Personal
                    </Button>
                </div>
            </form>
        </div>
    );
}
