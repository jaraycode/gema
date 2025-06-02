import DashboardLayout from '@/layouts/dashboard-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ name }: { name: string }) {
    // Punto de entrada del dashboard, a partir de aqui es qeu se mandan las props
    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            <h1>Usando custom layout {name}</h1>
        </DashboardLayout>
    );
}
