// Página de inicio de sesión
"use client";
import Image from 'next/image';
import React from 'react';
import FormAuth from '../components/Login/FormAuth';
import { useRouter } from 'next/navigation';
import { checkAccount, registerLink } from '../utils/belvo';

export default function LoginPage(){
    const router = useRouter();

    const onSubmitLogin = async (formData) =>{
      // console.log("datos capturados"+ JSON.stringify(formData) );
      const {username, password} = formData;
      try {
          const response = await registerLink(username, password);
          // console.log(response);
          //guardando en storage local
          const dataUser = {
            link_id: response.id,
            user_data:JSON.stringify(response),
            belvo_token:'123ab',
            isLoggedIn:true
          };
          localStorage.setItem('userData', JSON.stringify(dataUser));

          // Redirigir
          router.push('/home');
      } catch (error) {
          console.error('Error de inicio de sesión:', error);
      }
    }

 /*    const checkAccountExistense = async () => {
      const data = checkAccount(username, password)
      .then(isSandbox => {
          // console.log('¿La cuenta es de sandbox?', isSandbox);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
*/

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
                <FormAuth formValues={null} onSubmitForm={onSubmitLogin} />
              </div>
            </div>
        </div>
      );
}