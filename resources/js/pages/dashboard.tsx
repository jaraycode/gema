import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Dashboard({ name }: { name: string }) {
    // Punto de entrada del dashboard, a partir de aqui es qeu se mandan las props
    const { post } = useForm();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('logout'), {});
    };
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <h1>Usando custom layout {name}</h1>
            <form onSubmit={submit}>
                <button type="submit" className="hover:cursor-pointer">
                    Cerrar sesión
                </button>
            </form>
        </DashboardLayout>
    );
}
