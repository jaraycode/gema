import { DepartmentTable } from '@/components/DepartmentTable';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentPage(props: any) {
  return (
    <PrivateLayout {...props}>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 gap-4 mx-4 md:mx-8">
            <Card className="bg-white shadow-md rounded-lg p-4">
              <CardHeader className="flex justify-between items-center mb-2">
                <CardTitle className="text-lg font-semibold">Departamentos</CardTitle>
                <a
                    href="/department/new"
                    className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                >
                    Agregar Departamento
                </a>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}