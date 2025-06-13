"use client";
import * as React from "react";
import { Combobox } from "@headlessui/react";

interface CreacionDeEquipoProps {
  onCancel?: () => void;
  onSubmit?: (data: EquipmentFormData) => void;
}

interface EquipmentFormData {
  name: string;
  serial: string;
  type: string;
  description: string;
  module: string;
  status: string;
}

const EquipmentForm: React.FC<CreacionDeEquipoProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = React.useState<EquipmentFormData>({
    name: '',
    serial: '',
    type: '',
    description: '',
    module: '',
    status: ''
  });

  const [locationOptions] = React.useState(["ubicacion1", "ubicacion2", "ubicacion3", "otra"]);
  const [query, setQuery] = React.useState("");

  const filteredLocations =
    query === ""
      ? locationOptions
      : locationOptions.filter((loc) =>
          loc.toLowerCase().includes(query.toLowerCase())
        );

  const handleInputChange = (field: keyof EquipmentFormData, value: string) => {
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
                Registrar Nuevo Equipo
              </div>
              <div className="text-sm leading-5 text-slate-500">
                Complete la información del equipo
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
              {/* Left Column */}
              <div className="flex flex-col gap-10">
                {/* Nombre */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Nombre del Equipo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Aire acondicionado"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="px-4 py-3 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Serial */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Serial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Número de Serial"
                    value={formData.serial}
                    onChange={(e) => handleInputChange('serial', e.target.value)}
                    className="px-4 py-3 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Tipo de equipo */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Tipo de Equipo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="px-4 py-3 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Seleccione un tipo de equipo</option>
                    {["aire-acondicionado", "computadora", "proyector", "impresora"].map(option => (
                      <option key={option} value={option}>{option.replace(/-/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-10">
                {/* Ubicación con Combobox */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Ubicación <span className="text-red-500">*</span>
                  </label>
                  {/* @ts-ignore */}
                  <Combobox value={formData.module} onChange={(value) => handleInputChange('module', value)}>
                    <div className="relative">
                      <Combobox.Input
                        className="px-4 py-3 w-full text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onChange={(event) => {
                          setQuery(event.target.value);
                          handleInputChange('module', event.target.value);
                        }}
                        displayValue={(val: string) => val}
                        placeholder="Escriba o seleccione una ubicación"
                      />
                      {filteredLocations.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm overflow-auto border border-gray-200">
                          {filteredLocations.map((location) => (
                            <Combobox.Option
                              key={location}
                              value={location}
                              className={({ active }) =>
                                `cursor-pointer select-none px-4 py-2 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {location}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="px-4 py-3 text-base bg-white rounded-[8px] border border-zinc-200 text-neutral-900 w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Estado */}
                <div className="flex flex-col gap-2.5">
                  <label className="flex gap-2 items-center text-sm font-medium text-neutral-900">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["activo", "inactivo", "mantenimiento"].map((statusOption) => (
                      <label key={statusOption} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="status"
                          value={statusOption}
                          checked={formData.status === statusOption}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-base text-neutral-900 capitalize">
                          {statusOption}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-center items-center border-t border-t-gray-200 h-16 mt-6">
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                <button
                  onClick={handleCancel}
                  className="h-12 text-base bg-gray-100 rounded-xl text-slate-500 w-full hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="h-12 text-base text-white bg-teal-600 rounded-xl w-full hover:bg-teal-700 transition-colors"
                >
                  Crear Equipo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
