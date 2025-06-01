"use client";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow items-center px-20 pt-4 pb-40 w-full text-base leading-loose text-center bg-white rounded-none max-md:px-5 max-md:pb-24 max-md:mt-2.5 max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/33b41968e7754d2b98ae74310dc65b2e/eb0edaf22433bdbc996810229896d4015516b4a6?placeholderIfAbsent=true"
          alt="Company logo"
          className="object-contain overflow-hidden max-w-full aspect-square w-[120px]"
        />

        <header className="self-stretch text-5xl font-bold text-black max-md:max-w-full max-md:text-4xl">
          Bienvenido de Regreso
        </header>

        <p className="text-black leading-[36px)] mb-10">
          Por favor ingresa tus datos
        </p>

        <form className="w-full max-w-md">
          <div className="text-center">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-400 leading-[36px)] max-md:mt-10"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-5/6 mt-3 border-0 border-b-2 border-solid bg-transparent border-zinc-600 h-[40px] text-black focus:outline-none focus:border-zinc-800 mx-auto"
              aria-label="Email address"
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="text-center mt-8 mb-2">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-400 leading-[36px)]"
            >
              Contraseña
            </label>
            <div className="relative w-5/6 mt-3 mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border-0 border-b-2 border-solid bg-transparent border-zinc-600 h-[40px] text-black focus:outline-none focus:border-zinc-800 pr-10"
                aria-label="Password"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>

          <span
            className="text-gray-400 leading-[36px)] mt-4 cursor-pointer hover:underline"
          >
            ¿Olvidaste la contraseña?
          </span>

          <div className="mt-7">
            <button
              type="submit"
              className="leading-[36px)] mb-5 max-md:px-5 max-md:mt-10 mt-6 bg-[#1E9483] border-2 border-[#1E9483] rounded-[31px] cursor-pointer text-white p-2 px-10"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
