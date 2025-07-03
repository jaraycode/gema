import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersonnelStoreProps } from '@/types';
import { faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Department {
    id: number;
    name: string;
    code: string;
}

interface EditPersonelFormProps {
    departments: Department[];
    personnel: PersonnelStoreProps;
}

export function Editform({ departments, personnel }: EditPersonelFormProps) {
    const { data, setData, errors, put, processing } = useForm<Required<PersonnelStoreProps>>(
        personnel ?? {
            name: '',
            last_name: '',
            password: '',
            department: '',
            email: '',
            dni: '',
            national_status: 'V',
            phone_number: '',
        },
    );
    const id = usePage().url.split('/').slice(-1)[0];
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('location.update', { id }));
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
                            <Label htmlFor="nombre">Nombres</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Nombre completo"
                                required
                                className="rounded-[8px] rounded-xl border border-zinc-200 bg-white py-7 text-base text-[#8b8b8b] text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="nombre">Apellidos</Label>
                            <Input
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                placeholder="Apellidos"
                                required
                                className="rounded-[8px] rounded-xl border border-zinc-200 bg-white py-7 text-base text-[#8b8b8b] text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                            />
                            <InputError message={errors.last_name} />
                        </div>

                        <div className="space-y-3">
                            <Label>Documento de Identidad</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={data.national_status}
                                    onValueChange={(value) => {
                                        setData('national_status', value);
                                    }}
                                    disabled
                                >
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
                                    id="dni"
                                    value={data.dni}
                                    onChange={(e) => setData('dni', e.target.value)}
                                    placeholder="Número de documento"
                                    maxLength={data.national_status === 'V' ? 8 : 10} // Ejemplo: diferentes longitudes máximas
                                    required
                                    className="mt-0 flex-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                                    disabled
                                />
                                <InputError message={errors.dni} />
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
                                className="rounded-[8px] rounded-xl border border-zinc-200 bg-white py-7 text-base text-[#8b8b8b] text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Ingresar contraseña"
                                required
                                className="mt-1 rounded-xl border border-gray-300 py-7 text-[#8b8b8b] shadow-sm focus:border-gray-300"
                            />
                            <InputError message={errors.password} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                                id="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="Teléfono"
                                maxLength={11}
                                required
                                className="rounded-[8px] rounded-xl border border-zinc-200 bg-white py-7 text-base text-[#8b8b8b] text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    <div className="space-y-3">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Select onValueChange={(value) => setData('department', value)} value={data.department}>
                            <SelectTrigger className="mt-1 w-full rounded-xl border border-gray-300 py-7 shadow-sm hover:text-black focus:border-gray-300 focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Seleccionar Departamento" className="text-[#8b8b8b]" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-sm">
                                {departments.map((depto) => (
                                    <SelectItem key={depto.id} value={String(depto.id)} className="text-[#8b8b8b] hover:bg-gray-100 hover:text-black">
                                        {depto.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.department} />
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4 border-b-1 pb-6">
                    <Link
                        href={route('personel.index')}
                        className="flex h-12 items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <Button type="submit" disabled={processing} className="h-12 w-10 rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90">
                        Crear Personal
                    </Button>
                </div>
            </form>
        </div>
    );
}
