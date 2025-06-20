import { DepartmentTable } from '@/components/DepartmentTable';
import { PrivateLayout } from '@/layouts/PrivateLayout';

export default function DepartmentPage(props: any) {
  return (
    <PrivateLayout {...props}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 gap-4 mx-4 md:mx-8">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Departamentos</h2>
                <a
                    href="/department/new"
                    className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                >
                    Agregar Departamento
                </a>
              </div>
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