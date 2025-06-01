'use client';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="h-screen w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex h-screen w-full grow flex-col items-center justify-center rounded-none bg-white px-20 py-20 text-center text-base leading-loose max-md:mt-2.5 max-md:max-w-full max-md:px-5 max-md:pb-24">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/eb0edaf22433bdbc996810229896d4015516b4a6?placeholderIfAbsent=true"
                    alt="Company logo"
                    className="aspect-square w-[120px] max-w-full overflow-hidden object-contain"
                />

                <header className="self-stretch text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">Bienvenido de Regreso</header>

                <p className="mb-10 leading-[36px)] text-black">Por favor ingresa tus datos</p>

                <form className="w-full max-w-md">
                    <div className="text-center">
                        <label htmlFor="email" className="block text-xl leading-[36px)] font-medium text-gray-400 max-md:mt-10">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mx-auto mt-3 h-[40px] w-5/6 border-0 border-b-2 border-solid border-zinc-600 bg-transparent text-black focus:border-zinc-800 focus:outline-none"
                            aria-label="Email address"
                            placeholder="Ingresa tu email"
                        />
                    </div>

                    <div className="mt-8 mb-2 text-center">
                        <label htmlFor="password" className="block text-xl leading-[36px)] font-medium text-gray-400">
                            Contraseña
                        </label>
                        <div className="relative mx-auto mt-3 w-5/6">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="h-[40px] w-full border-0 border-b-2 border-solid border-zinc-600 bg-transparent pr-10 text-black focus:border-zinc-800 focus:outline-none"
                                aria-label="Password"
                                placeholder="Ingresa tu contraseña"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>

                    <span className="mt-4 cursor-pointer leading-[36px)] text-gray-400 hover:underline">¿Olvidaste la contraseña?</span>

                    <div className="mt-7">
                        <button
                            type="submit"
                            className="mt-6 mb-5 cursor-pointer rounded-[31px] border-2 border-[#1E9483] bg-[#1E9483] p-2 px-10 leading-[36px)] text-white max-md:mt-10 max-md:px-5"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
