import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';

interface CreatePersonelFormProps {
    departamentos: string[];
    cargos: string[];
    onSubmit: (formData: any) => void;
    onCancel: () => void;
    processing?: boolean;
}

export function Createform({ departamentos, cargos, onSubmit, onCancel, processing = false }: CreatePersonelFormProps) {
    const { data, setData } = useForm({
        nombre: '',
        cedula: '',
        telefono: '',
        email: '',
        departamento: '',
        cargo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <div className="mx-auto rounded-xl bg-white py-7 px-14 pb-10 text-center shadow-md">
            <h1 className="mb-4 text-2xl font-bold">Registrar Nuevo Personal</h1>
            <p className="mb-5 text-gray-600">Complete la información del Personal</p>

            <form onSubmit={handleSubmit} className="space-y-8 border-t-1 pt-7">
                <div className="space-y-8">
                    {/* Primera fila: Nombre y Cédula */}
                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                placeholder="Nombre del Personal"
                                className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="cedula">Cédula</Label>
                            <Input
                                id="cedula"
                                value={data.cedula}
                                onChange={(e) => setData('cedula', e.target.value)}
                                placeholder="Número de Cédula"
                                required
                                className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                            />
                        </div>
                    </div>
                    {/* Segunda fila: Correo y Teléfono */}
                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Ingresar tu correo Electrónico"
                                className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                                id="telefono"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                placeholder="Teléfono"
                                required
                                className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                            />
                        </div>
                    </div>
                    {/* Tercera fila: Departamento y Cargo */}
                    <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <Label htmlFor="departamento">Departamento</Label>
                            <Select onValueChange={(value) => setData('departamento', value)} value={data.departamento} required>
                                <SelectTrigger className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 shadow-sm hover:text-black w-full py-7">
                                    <SelectValue placeholder="Seleccionar Departamento" className="text-[#8b8b8b]"  />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white shadow-sm">
                                    {departamentos.map((depto) => (
                                        <SelectItem key={depto} value={depto} className="hover:bg-gray-100 text-[#8b8b8b] hover:text-black">
                                            {depto}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="cargo">Cargo</Label>
                            <Select onValueChange={(value) => setData('cargo', value)} value={data.cargo} required>
                                <SelectTrigger className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-offset-0 shadow-sm hover:text-black w-full py-7">
                                    <SelectValue placeholder="Seleccionar el cargo" className="text-[#8b8b8b]" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl bg-white">
                                    {cargos.map((cargo) => (
                                        <SelectItem key={cargo} value={cargo} className="hover:bg-gray-100 text-[#8b8b8b] hover:text-black">
                                            {cargo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4 border-b-1 pb-6">
                    <Button type="button" onClick={onCancel} className="rounded-xl px-36 bg-gray-200 border-gray-500 hover:bg-gray-300/90 h-12 w-10">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing} className="rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90 h-12 w-10">
                        Crear Nuevo Personal
                    </Button>
                </div>
            </form>
        </div>
    );
}
