import { PrivateLayout } from '@/layouts/PrivateLayout';
import { SectionCards } from '@/components/section-cards';
import { MaintenanceTable } from '@/components/MaintenanceTable';
import { NavBar } from '@/types';

export default function DashboardPage(props: NavBar) {
  return (
    <PrivateLayout {...props}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-8">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Mantenimiento Pendiente</h2>
              <MaintenanceTable data={[
                                    { id: '1', date: '2023-10-01', name: 'Equipo D' },
                                    { id: '2', date: '2023-10-05', name: 'Equipo E' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                ]} />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Próximos Mantenimientos</h2>
              <MaintenanceTable data={[
                                    { id: '1', date: '2023-10-01', name: 'Equipo D' },
                                    { id: '2', date: '2023-10-05', name: 'Equipo E' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                    { id: '3', date: '2023-12-10', name: 'Equipo F' },
                                    { id: '4', date: '2023-12-05', name: 'Equipo E' },
                                    { id: '5', date: '2023-11-10', name: 'Equipo F' },
                                ]} />
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}