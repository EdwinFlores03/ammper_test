// Página de inicio de sesión
"use client";
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function LoginPage(){
    const router = useRouter();

    return (
        <div className="flex flex-col items-center md:flex-row md:h-screen">
            <div className="flex items-center justify-center w-full md:w-1/2">
              <Image src="/images/login/card-credit.jpg" alt="Login Image" width={800} height={600} className='hidden md:block' priority={true} />
            </div>
            <div className="flex flex-col items-center justify-center w-full md:w-1/4">
              <div className="w-full max-w-md space-y-8 space-x-10">
                <div className='space-x-10'>
                  <h1 className="text-2xl font-bold pl-10">Bienvenido!</h1>
                  <p className="mt-2 text-gray-600">
                    Ingrese con una cuenta de Belvo.
                  </p>
                </div>
                <form className="mt-8 space-y-6" >
                  <div>
                    <label htmlFor="email" className="block font-bold text-gray-700">
                      Usurio
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Ingrese usuario"
                      className="w-full px-4 border-solid border-2 border-grey-600 py-3 mt-1 border-300 rounded-md focus:border-orange-500 focus:ring focus:ring-orange-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-bold text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Ingrese la contraseña"
                      className="w-full px-4 border-solid border-2 border-grey-600 py-3 mt-1 border-300 rounded-md focus:border-orange-500 focus:ring focus:ring-orange-200"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-orange focus:border-orange-700"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      );
}