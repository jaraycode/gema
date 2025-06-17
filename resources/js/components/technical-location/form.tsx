"use client";
import * as React from "react";
import { Combobox } from "@headlessui/react";

interface CreacionDeUbicacionProps {
  onCancel?: () => void;
  onSubmit?: (data: LocationFormData) => void;
}

interface LocationFormData {
  nombre: string;
  piso: string;
  salon: string;
  modulo: string;
  area: string;
}

const TechnicalLocationForm: React.FC<CreacionDeUbicacionProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = React.useState<LocationFormData>({
    nombre: '',
    piso: '',
    salon: '',
    modulo: '',
    area: ''
  });

  const [locationOptions] = React.useState(["ubicacion1", "ubicacion2", "ubicacion3", "otra"]);
  const [pisoOptions] = React.useState(["1", "2", "3", "4", "5"]);
  const [salonOptions] = React.useState(["A101", "B202", "C303", "D404"]);
  const [areaOptions] = React.useState(["Área de informática", "Área de administración", "Área de ventas"]);
  
  const [queryModulo, setQueryModulo] = React.useState("");
  const [queryPiso, setQueryPiso] = React.useState("");
  const [querySalon, setQuerySalon] = React.useState("");
  const [queryArea, setQueryArea] = React.useState("");

  const filteredModulo =
    queryModulo === ""
      ? locationOptions
      : locationOptions.filter((loc) =>
          loc.toLowerCase().includes(queryModulo.toLowerCase())
        );

  const filteredPiso =
    queryPiso === ""
      ? pisoOptions
      : pisoOptions.filter((loc) =>
          loc.toLowerCase().includes(queryPiso.toLowerCase())
        );

  const filteredSalon =
    querySalon === ""
      ? salonOptions
      : salonOptions.filter((loc) =>
          loc.toLowerCase().includes(querySalon.toLowerCase())
        );

  const filteredArea =
    queryArea === ""
      ? areaOptions
      : areaOptions.filter((loc) =>
          loc.toLowerCase().includes(queryArea.toLowerCase())
        );

  const handleInputChange = (field: keyof LocationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col items-start bg-white p-5 pt-0 w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-center items-start px-5 pb-2 w-full">
          <div className="relative w-full">
            {/* Header */}
            <div className="bg-white rounded-2xl border-b border-b-gray-200 h-[100px] flex flex-col items-center justify-center">
              <div className="text-2xl font-bold leading-8 text-neutral-900">
                Registrar Nueva Ubicación
              </div>
              <div className="text-sm leading-5 text-slate-500">
                Complete la información de la ubicación
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
              {/* Left Column */}
              <div className="flex flex-col gap-10">
                {/* Nombre */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Nombre de la ubicación"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="px-4 py-3 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Piso con Combobox */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Piso <span className="text-red-500">*</span>
                  </label>
                  <Combobox value={formData.piso} onChange={(value) => handleInputChange('piso', value)}>
                    <div className="relative">
                      <Combobox.Input
                        className="px-4 py-3 w-full text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(event) => {
                          setQueryPiso(event.target.value);
                          handleInputChange('piso', event.target.value);
                        }}
                        displayValue={(val: string) => val}
                        placeholder="Escriba o seleccione un piso"
                      />
                      {filteredPiso.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm overflow-auto border border-gray-200">
                          {filteredPiso.map((piso) => (
                            <Combobox.Option
                              key={piso}
                              value={piso}
                              className={({ active }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {piso}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>

                {/* Salón con Combobox */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Salón <span className="text-red-500">*</span>
                  </label>
                  <Combobox value={formData.salon} onChange={(value) => handleInputChange('salon', value)}>
                    <div className="relative">
                      <Combobox.Input
                        className="px-4 py-3 w-full text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(event) => {
                          setQuerySalon(event.target.value);
                          handleInputChange('salon', event.target.value);
                        }}
                        displayValue={(val: string) => val}
                        placeholder="Escriba o seleccione un salón"
                      />
                      {filteredSalon.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm overflow-auto border border-gray-200">
                          {filteredSalon.map((salon) => (
                            <Combobox.Option
                              key={salon}
                              value={salon}
                              className={({ active }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {salon}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-10">
                {/* Módulo con Combobox */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Módulo <span className="text-red-500">*</span>
                  </label>
                  <Combobox value={formData.modulo} onChange={(value) => handleInputChange('modulo', value)}>
                    <div className="relative">
                      <Combobox.Input
                        className="px-4 py-3 w-full text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(event) => {
                          setQueryModulo(event.target.value);
                          handleInputChange('modulo', event.target.value);
                        }}
                        displayValue={(val: string) => val}
                        placeholder="Escriba o seleccione un módulo"
                      />
                      {filteredModulo.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm overflow-auto border border-gray-200">
                          {filteredModulo.map((modulo) => (
                            <Combobox.Option
                              key={modulo}
                              value={modulo}
                              className={({ active }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {modulo}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>

                {/* Área con Combobox */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Área <span className="text-red-500">*</span>
                  </label>
                  <Combobox value={formData.area} onChange={(value) => handleInputChange('area', value)}>
                    <div className="relative">
                      <Combobox.Input
                        className="px-4 py-3 w-full text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(event) => {
                          setQueryArea(event.target.value);
                          handleInputChange('area', event.target.value);
                        }}
                        displayValue={(val: string) => val}
                        placeholder="Escriba o seleccione un área"
                      />
                      {filteredArea.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm overflow-auto border border-gray-200">
                          {filteredArea.map((area) => (
                            <Combobox.Option
                              key={area}
                              value={area}
                              className={({ active }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {area}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-center items-center border-t border-t-gray-200 h-16 mt-6">
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mt-12">
                <button
                  onClick={() => window.location.href = route('technical-location.index')}
                  className="h-12 text-base bg-gray-100 rounded-xl text-slate-500 w-full hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="h-12 text-base text-white bg-teal-600 rounded-xl w-full hover:bg-teal-700 transition-colors"
                >
                  Crear Ubicación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalLocationForm;
