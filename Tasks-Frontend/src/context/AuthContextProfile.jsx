// Importamos desde React createContext
import { createContext, useState } from 'react';
import { register } from './../../../src/controllers/auth.controller.js';

// Creamos el contexto
export const AuthContextProfile = createContext();

// Creamos el provider 
export const AuthProviderProfile = ({ children }) => {

    // Definimos el estado
    const [user, setUser] = useState(null);

    const registrar = async (values) => {
        try {
            const res = await register(values);
            console.log(res.data);
            setUser(res.data);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    }

    

    return (
        <AuthContextProfile.Provider value={{ user, registrar }}>
            {children}
        </AuthContextProfile.Provider>
    );
}