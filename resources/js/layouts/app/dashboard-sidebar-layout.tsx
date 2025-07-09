import { type PropsWithChildren } from 'react';

export default function DashboardSidebarLayout({ children }: PropsWithChildren) {
    // Aquí ingresas sidebar
    return (
        <>
            <h1>Layout</h1>
            {children}
        </>
    );
}
