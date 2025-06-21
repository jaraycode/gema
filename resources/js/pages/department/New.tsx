 import { AppSidebar } from '@/components/app-sidebar';
import { Createform } from '@/components/personel/create/create-form';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavBarProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function New(props: any) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");

  const handleSubmit = () => {
    console.log("Departamento creado:", { codigo, nombre });
    setCodigo("");
    setNombre("");
  };

  const handleBack = () => {
    window.location.href = '/department'; 
  };

  const handleCancel = () => {
    setCodigo("");
    setNombre("");
  };

  return (
    <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" user={props.user} navMain={props.navMain} navSecondary={props.navSecondary} />

            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-10 lg:px-25">
                              <div className="rounded-xl bg-white py-7 px-14 pb-10 text-left shadow-md">
                                <div className="flex justify-between items-center">
                                    <Link href="/department" className="inline-block text-sm text-gray-500 hover:text-gray-700">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </Link>
                                </div>
                                <h1 className="mb-4 text-2xl font-bold text-center">Registrar Nuevo Departamento</h1>
                                <p className="mb-5 text-gray-600 text-center">Complete la información del Departamento</p>

                                <form onSubmit={handleSubmit} className="space-y-8 border-t-1 pt-7">
                                  <div className="space-y-8">
                                      {/* Primera fila: Nombre y Cédula */}
                                       <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                                          <div className="space-y-3">
                                              <Label htmlFor="codigo">Código</Label>
                                              <Input
                                                  id="codigo"
                                                  value={codigo}
                                                  onChange={(e) => setCodigo(e.target.value)}
                                                  placeholder="Código del Departamento"
                                                  className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                                              />
                                          </div>
                                          <div className="space-y-3">
                                              <Label htmlFor="nombre">Nombre</Label>
                                              <Input
                                                  id="nombre"
                                                  value={nombre}
                                                  onChange={(e) => setNombre(e.target.value)}
                                                  placeholder="Nombre del Departamento"
                                                  required
                                                  className="mt-1 rounded-xl border border-gray-300 focus:border-gray-300 text-[#8b8b8b] shadow-sm py-7"
                                              />
                                          </div>
                                      </div>
                                    </div>
                                    <div className="mt-15 flex justify-center gap-4 border-b-1 pb-6">
                                         <Link href="/department">
                                             <Button type="button" className="rounded-xl px-36 bg-gray-200 border-gray-500 hover:bg-gray-300/90 h-12 w-10">
                                                Cancelar
                                             </Button>
                                         </Link>
                                        <Button type="submit" className="rounded-xl bg-[#1e9483] px-36 text-white hover:bg-[#1e9483]/90 h-12 w-10">
                                            Crear Nuevo Departamento
                                        </Button>
                                    </div>
                                </form>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
  );
}