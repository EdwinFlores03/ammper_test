// Página de inicio de sesión
import { useState } from 'react';
import { useRouter } from 'next/router';
/* import { loginToBelvo } from '../services/belvo'; // Función para autenticarse con Belvo */

const Login = () => {
const router = useRouter();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  /*   e.preventDefault();
    try {
        const token = await loginToBelvo(username, password);
        // Almacenar el token de acceso en el almacenamiento local
        localStorage.setItem('belvoToken', token);
        // Redirigir a la página protegida
        router.push('/dashboard');
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
    } */
};

export default function loginPage(){

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}> */}
            <div className="mb-4">
              {<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      );
}