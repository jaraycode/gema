import Combobox from '@/components/ui/combobox';
import { TechnicalLocationFormData, TechnicalLocationObject } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '../input-error';

export default function TechnicalLocationForm({ props }: { props: TechnicalLocationObject }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TechnicalLocationFormData>>({
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
        post(route('technical-location.store'), {
            onFinish: () => reset('level1'),
        });
    };

    return (
        <section>
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start bg-white p-5 pt-0">
                <div className="relative w-full">
                    {/* Header */}
                    <div className="flex h-[100px] flex-col items-center justify-center rounded-2xl border-b border-b-gray-200 bg-white mb-5">
                        <div className="text-2xl leading-8 font-bold text-neutral-900">Registrar nueva ubicación técnica</div>
                        <div className="text-sm leading-5 text-slate-500">Complete la información de la ubicación técnica</div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">           
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    módulo <span className="text-red-500">*</span>
                                </label>
                                <Combobox data={data.level1} setData={setData} locationList={props.module} label={'level1'} />
                                <InputError message={errors.level1} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Piso <span className="text-red-500">*</span>
                                </label>
                                <Combobox data={data.level2} setData={setData} locationList={props.floor} label={'level2'} />
                                <InputError message={errors.level2} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Área <span className="text-red-500">*</span>
                                </label>
                                <Combobox data={data.level3} setData={setData} locationList={props.area} label={'level3'} />
                                <InputError message={errors.level3} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Salón/Oficina <span className="text-red-500">*</span>
                                </label>
                                <Combobox data={data.level4} setData={setData} locationList={[...props.area, ...props.equipment]} label={'level4'} />
                                <InputError message={errors.level4} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Nombre del Equipo <span className="text-red-500">*</span>
                                </label>
                                <Combobox data={data.level5} setData={setData} locationList={[...props.area, ...props.equipment]} label={'level5'} />
                                <InputError message={errors.level5} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Nombre del Equipo 
                                </label>
                                <Combobox data={data.level6} setData={setData} locationList={[...props.area, ...props.equipment]} label={'level6'} />
                                <InputError message={errors.level6} />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-neutral-900 mb-2">
                                    Nombre del Equipo 
                                </label>
                                <Combobox data={data.level7} setData={setData} locationList={[...props.area, ...props.equipment]} label={'level7'} />
                                <InputError message={errors.level7} />
                            </div>
                        </div>

                        <input type="hidden" value={data.level1} id="level1" />
                        <input type="hidden" value={data.level2} id="level2" />
                        <input type="hidden" value={data.level3} id="level3" />
                        <input type="hidden" value={data.level4} id="level4" />
                        <input type="hidden" value={data.level5} id="level5" />
                        <input type="hidden" value={data.level6} id="level6" />
                        <input type="hidden" value={data.level7} id="level7" />

                        <div className="mt-6 flex h-16 items-center justify-center border-t border-t-gray-200">
                            <div className="mt-12 flex w-full max-w-2xl flex-col gap-4 md:flex-row">
                                <Link
                                    href={route('technical-location.index')}
                                    className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-100 text-base text-slate-500 transition-colors hover:bg-gray-200"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="h-12 w-full rounded-xl bg-teal-600 text-base text-white transition-colors hover:bg-teal-700"
                                    disabled={processing}
                                >
                                    Crear Ubicación
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
