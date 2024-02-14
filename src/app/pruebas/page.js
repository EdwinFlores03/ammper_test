
import React, from 'react';
import { getInstitutions, registerLink } from '../../utils/belvo';

const institutions = await getInstitutions();
const objetoJSON = {
    username: 'bnk100',
    password: 'full'
  };
const link = await registerLink();
console.log('aqui:', link);

export default function pruebas(){

    return (
        <>
        <ul>
            {institutions.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
        </>
      );
}