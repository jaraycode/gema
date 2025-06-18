import Combobox from '@/components/ui/combobox';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import InputError from '../input-error';

interface TechnicalLocationFormData {
    level1: number | string;
    level2: number | string;
    level3: number | string;
    level4: number | string;
    level5: number | string;
    level6: number | string;
    level7: number | string;
}

interface LocationExample {
    key: number;
    value: string;
}

export default function TechnicalLocationForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TechnicalLocationFormData>>({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        level6: '',
        level7: '',
    });
    const [locationOptions] = useState<LocationExample[]>([
        { key: 1, value: 'ubicacion' },
        { key: 2, value: 'holaj' },
        { key: 3, value: 'adios' },
        { key: 4, value: 'amor' },
    ]);

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
                    <div className="flex h-[100px] flex-col items-center justify-center rounded-2xl border-b border-b-gray-200 bg-white">
                        <div className="text-2xl leading-8 font-bold text-neutral-900">Registrar Nueva Ubicación</div>
                        <div className="text-sm leading-5 text-slate-500">Complete la información de la ubicación</div>
                    </div>
                    <form onSubmit={submit}>
                        <Combobox data={data.level1} setData={setData} locationList={locationOptions} label={'level1'} />
                        <InputError message={errors.level1} />
                        <Combobox data={data.level2} setData={setData} locationList={locationOptions} label={'level2'} />
                        <InputError message={errors.level2} />
                        <Combobox data={data.level3} setData={setData} locationList={locationOptions} label={'level3'} />
                        <InputError message={errors.level3} />
                        <Combobox data={data.level4} setData={setData} locationList={locationOptions} label={'level4'} />
                        <InputError message={errors.level4} />
                        <Combobox data={data.level5} setData={setData} locationList={locationOptions} label={'level5'} />
                        <InputError message={errors.level5} />
                        <Combobox data={data.level6} setData={setData} locationList={locationOptions} label={'level6'} />
                        <InputError message={errors.level6} />
                        <Combobox data={data.level7} setData={setData} locationList={locationOptions} label={'level7'} />
                        <InputError message={errors.level7} />
                        <input type="hidden" value={data.level1} id="level1" />
                        <input type="hidden" value={data.level2} id="level2" />
                        <input type="hidden" value={data.level3} id="level3" />
                        <input type="hidden" value={data.level4} id="level4" />
                        <input type="hidden" value={data.level5} id="level5" />
                        <input type="hidden" value={data.level6} id="level6" />
                        <input type="hidden" value={data.level7} id="level7" />

                        {/* Botones */}
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
