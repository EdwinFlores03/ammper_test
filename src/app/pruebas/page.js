
import React, from 'react';
import { getInstitutions, registerLink } from '../../utils/belvo';

const institutions = await getInstitutions();

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