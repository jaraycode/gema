import { DepartmentTable } from '@/components/DepartmentTable';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { NavBar } from '@/types';

export default function DepartmentPage(props: NavBar) {
  return (
    <PrivateLayout {...props}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 gap-4 mx-4 md:mx-8">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Departamentos</h2>
              <DepartmentTable data={[
                                    { id: 'SGMREF', name: 'Grupo de Maentenimiento Refrigeración' },
                                    { id: 'SGMINF', name: 'Grupo de Maentenimiento Infraestructura' },
                                    { id: 'SGMELE', name: 'Grupo de Maentenimiento Electrico' },
                                    { id: 'SGMMÉC', name: 'Grupo de Maentenimiento Mecanico' },
                                    { id: 'SGMLOG', name: 'Grupo de Maentenimiento Logistica' },
                                    { id: 'SGMREF', name: 'Grupo de Maentenimiento Refrigeración' },
                                    { id: 'SGMINF', name: 'Grupo de Maentenimiento Infraestructura' },
                                    { id: 'SGMELE', name: 'Grupo de Maentenimiento Electrico' },
                                    { id: 'SGMMÉC', name: 'Grupo de Maentenimiento Mecanico' },
                                    { id: 'SGMLOG', name: 'Grupo de Maentenimiento Logistica' },
                                    { id: 'SGMREF', name: 'Grupo de Maentenimiento Refrigeración' },
                                    { id: 'SGMINF', name: 'Grupo de Maentenimiento Infraestructura' },
                                    { id: 'SGMELE', name: 'Grupo de Maentenimiento Electrico' },
                                    { id: 'SGMMÉC', name: 'Grupo de Maentenimiento Mecanico' },
                                    { id: 'SGMLOG', name: 'Grupo de Maentenimiento Logistica' },
                                ]} />
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}