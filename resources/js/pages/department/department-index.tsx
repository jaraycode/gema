import { DepartmentTable } from '@/components/department-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { DepartmentIndexProps } from '@/types/department/department';
import { Head, Link } from '@inertiajs/react';

export default function DepartmentPage({ data, ...props }: DepartmentIndexProps) {
    return (
        <PrivateLayout {...props}>
            <Head title="Departamento" />
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="mx-4 grid grid-cols-1 gap-4 md:mx-8">
                        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-lg border p-4 py-6 shadow-md">
                            <CardHeader className="mb-2 flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Departamentos</CardTitle>
                                <Link
                                    href={route('department.create')}
                                    className="flex w-60 items-center justify-center rounded-[20px] bg-[#1E9483] p-3 text-white transition duration-200 hover:shadow hover:shadow-[#1E9483]"
                                >
                                    Agregar Departamento
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <DepartmentTable data={data.data} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
}
