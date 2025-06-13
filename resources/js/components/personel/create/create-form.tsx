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
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-2xl font-bold">Registrar Nuevo Personal</h1>
            <p className="mb-8 text-gray-600">Complete la información del Personal</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="nombre">Nombre del Personal</Label>
                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            placeholder="Nombre del Personal"
                        />
                    </div>

                    <div>
                        <Label htmlFor="cedula">Cédula*</Label>
                        <Input
                            id="cedula"
                            value={data.cedula}
                            onChange={(e) => setData('cedula', e.target.value)}
                            placeholder="Número de Cédula"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="telefono">Teléfono*</Label>
                        <Input
                            id="telefono"
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                            placeholder="Teléfono"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Ingresar tu correo Electrónico"
                        />
                    </div>

                    <div>
                        <Label htmlFor="departamento">Departamento*</Label>
                        <Select onValueChange={(value) => setData('departamento', value)} value={data.departamento} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Departamento" />
                            </SelectTrigger>
                            <SelectContent>
                                {departamentos.map((depto) => (
                                    <SelectItem key={depto} value={depto}>
                                        {depto}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="cargo">Cargo*</Label>
                        <Select onValueChange={(value) => setData('cargo', value)} value={data.cargo} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar el cargo" />
                            </SelectTrigger>
                            <SelectContent>
                                {cargos.map((cargo) => (
                                    <SelectItem key={cargo} value={cargo}>
                                        {cargo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Crear Nuevo Personal
                    </Button>
                </div>
            </form>
        </div>
    );
}
