import { type ReactNode } from 'react';
import DashboardSidebarLayout from './app/dashboard-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: AppLayoutProps) {
    // Declaras el layout a usar y el resto de contenido principal de la aplicacion (graficas y demas tablas)
    return (
        <DashboardSidebarLayout>
            <h1>Generando</h1>
            {children}
        </DashboardSidebarLayout>
    );
}
