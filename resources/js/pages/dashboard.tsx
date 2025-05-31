import DashboardLayout from '@/layouts/dashboard-layout';

export default function Dashboard({ name }: { name: string }) {
    // Punto de entrada del dashboard, a partir de aqui es qeu se mandan las props
    return (
        <DashboardLayout>
            <h1>Usando custom layout {name}</h1>
        </DashboardLayout>
    );
}
