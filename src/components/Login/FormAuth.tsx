import React, { useEffect, useState } from "react";

const FormAuth = ({formValues, onSubmitForm}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect( ()=>{
        if(formValues){
            setUsername(formValues.username);
            setPassword(formValues.password);
        }
    }, [formValues])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {username, password};
        onSubmitForm(formData);
    };

 return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete='false'>
        <div>
            <label htmlFor="email" className="block font-bold text-gray-700">
            Usuario
            </label>
            <input
            id="username"
            type="text"
            placeholder="Ingrese usuario"
            className="w-full px-4 border-solid border-2 border-grey-600 py-3 mt-1 border-300 rounded-md focus:border-orange-500 focus:ring focus:ring-orange-200"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
 );
}

export default FormAuth;