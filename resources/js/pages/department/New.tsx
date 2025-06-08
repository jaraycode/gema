
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBuilding, faQrcode } from "@fortawesome/free-solid-svg-icons"; // Importar el icono de edificio y el icono de QR
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
        <div className="flex items-center ml-90">
          <FontAwesomeIcon icon={faQrcode} className="text-xl mr-3 mt-4" style={{ color: '#2F4157' }} /> {/* Icono de QR */}
          <label className="block mb-2 mt-6 text-left">Código del Departamento</label>
        </div>
        <Input
          placeholder="Código del Departamento"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="border border-gray-300 mx-auto w-1/2 h-12  rounded-[8px]" 
        />
        <div>
          <div className="flex items-center ml-92"> 
            <FontAwesomeIcon icon={faBuilding} className="text-xl mr-3 mt-6" style={{ color: '#2F4157' }} />
            <label className="block mb-2 mt-10 text-left">Nombre del Departamento</label>
          </div>
          <Input
            placeholder="Nombre del Departamento"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border border-gray-300 mx-auto w-1/2 h-12 mt-4 rounded-[8px]" 
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
