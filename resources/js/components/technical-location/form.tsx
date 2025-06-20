'use client';
import Combobox from '@/components/ui/combobox';
import { TechnicalLocationFormData, TechnicalLocationObject } from '@/types';
import { faChevronLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

export default function TechnicalLocationForm({ props }: { props: TechnicalLocationObject }) {
    const { data, setData, post, processing, errors } = useForm<Required<TechnicalLocationFormData>>({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        level6: '',
        level7: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('technical-location.store'));
    };

    return (
        <div className="mx-auto rounded-xl bg-white py-7 px-14 pb-10 shadow-md">
            

            {/* Header */}
            <div className="mb-4 flex justify-between items-start">

                <Link href={route('location.index')} className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>

                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="ghost">
                            <FontAwesomeIcon icon={faQuestion} className="text-lg" />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-white">
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">Ubicación técnica</h4>
                            <p className="text-sm">
                                La ubicación técnica es la combinación de las distintas ubicaciones siguiendo la sintaxis
                                Módulo-Piso-Área-Equipo. Por Ejemplo: M2-PB-SUM-ACC.
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <h1 className="mb-4 text-center text-2xl font-bold">Registrar nueva ubicación técnica</h1>
            <p className="mb-6 text-center text-gray-600">Complete la información de la ubicación técnica</p>

            <form onSubmit={submit} className="space-y-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-9 gap-y-8 md:grid-cols-2">
                    {/* Campos individuales */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Módulo <span className="text-red-500">*</span>
                        </label>
                        <Combobox data={data.level1} setData={setData} locationList={props.module} label={'level1'} />
                        <InputError message={errors.level1} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Piso <span className="text-red-500">*</span>
                        </label>
                        <Combobox data={data.level2} setData={setData} locationList={props.floor} label={'level2'} />
                        <InputError message={errors.level2} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Área <span className="text-red-500">*</span>
                        </label>
                        <Combobox data={data.level3} setData={setData} locationList={props.area} label={'level3'} />
                        <InputError message={errors.level3} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">
                            Salón/Oficina/Equipo <span className="text-red-500">*</span>
                        </label>
                        <Combobox
                            data={data.level4}
                            setData={setData}
                            locationList={[...props.area, ...props.equipment]}
                            label={'level4'}
                        />
                        <InputError message={errors.level4} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">Salón/Oficina/Equipo</label>
                        <Combobox
                            data={data.level5}
                            setData={setData}
                            locationList={[...props.area, ...props.equipment]}
                            label={'level5'}
                        />
                        <InputError message={errors.level5} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">Salón/Oficina/Equipo</label>
                        <Combobox
                            data={data.level6}
                            setData={setData}
                            locationList={[...props.area, ...props.equipment]}
                            label={'level6'}
                        />
                        <InputError message={errors.level6} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-neutral-900">Salón/Oficina/Equipo</label>
                        <Combobox
                            data={data.level7}
                            setData={setData}
                            locationList={[...props.area, ...props.equipment]}
                            label={'level7'}
                        />
                        <InputError message={errors.level7} />
                    </div>
                </div>

                {/* Botones */}
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href={route('technical-location.index')}
                        className="h-12 flex items-center justify-center rounded-xl bg-gray-200 px-36 text-base text-gray-700 transition hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="h-12 rounded-xl bg-[#1e9483] px-36 text-base text-white transition hover:bg-[#1e9483]/90"
                        disabled={processing}
                    >
                        Crear Ubicación
                    </button>
                </div>
            </form>
        </div>
    );
}
