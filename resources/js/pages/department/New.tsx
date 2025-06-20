
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons"; // Importar el icono de edificio y el icono de QR
import { PrivateLayout } from "@/layouts/PrivateLayout";
import { NavBar } from '@/types';
import { useState } from "react";

export default function New(props: NavBar) {
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
    <PrivateLayout {...props}>
        <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center">
          <Button className="mr-2" onClick={handleBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <h2 className="text-lg font-semibold">Crear Departamento</h2>
        </div>

        <div className="flex w-full flex-col gap-2.5 mt-6 max-w-xl mx-auto">
          <label htmlFor="codigo" className="flex items-center gap-2 text-sm font-medium text-neutral-900">
            Código <span className="text-red-500">*</span>
          </label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full rounded-[8px] border border-zinc-200 bg-white px-2 py-2 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Ingresa el código"
          />
       </div>
       <div className="flex w-full flex-col gap-2.5 mt-4 max-w-xl mx-auto">
          <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium text-neutral-900">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-[8px] border border-zinc-200 bg-white px-2 py-2 text-base text-neutral-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="flex justify-center gap-2 mt-20">
          <Button onClick={handleBack} className="bg-gray-300 text-black w-90 h-12 rounded-[12px] hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-350">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-[#1E9483] text-white w-90 h-12 rounded-[12px] transition duration-200 hover:bg-[#1E9483] hover:shadow hover:shadow-[#1E9483]">
            Crear Departamento
          </Button>
        </div>
      </div>
    </PrivateLayout>
  );
}
