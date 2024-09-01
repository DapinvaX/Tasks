// Importamos desde React createContext
import { createContext, useState, useContext } from 'react';

//Importamos las funciones de registerReq y loginReq desde la API de autenticación
import {registerReq, loginReq} from './../API/auth.js';

//Importamos PropTypes para definir el tipo de las propiedades
import PropTypes from 'prop-types';


// Creamos el contexto
export const AuthContextProfile = createContext();

// Creamos el hook para usar el contexto
export const useAuthProfile = () => {

    // Usamos el hook useContext para usar el contexto y se lo asignamos a la constante context
    // Esto nos permitirá acceder a las funciones y al estado del contexto
    const context = useContext(AuthContextProfile);

    // Si no hay contexto, lanzamos un error
    if(!context){
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider');
    }

    // Si hay contexto, lo retornamos
    return context

}

// Creamos el provider 
export const AuthProviderProfile = ({ children }) => {

    // Definimos el estado si hay un usuario
    const [user, setUser] = useState(null);

    //Definimos el estado si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Definimos el estado si hay un error
    const [error, setError] = useState(null);

    //Definimos las funciones para registrar y loguear
    const registrar = async (values) => {
        try {
            const res = await registerReq(values);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al registrar:', error.response);
            setError(error.response.data);
            
        }
    }

    //Definimos la función para loguear
    //Esta función se encarga de realizar la petición de logueo al servidor
    //Recibe como parámetro un objeto con los datos del usuario
    const loguear = async (user) => {
        //Al ser una petición asíncrona, utilizamos el bloque try-catch para manejar los errores
        try{

           const res =  await loginReq(user);

            //Si la petición es exitosa, mostramos el mensaje en consola
            console.log(res.data);
        
    }catch(error){

            //En caso de error, mostramos el mensaje en consola
            console.error('Error al loguear:', error.response);
            setError(error.response.data);
            
        }
        
    }

    return (
        //Retornamos el provider con el contexto y las funciones
        //Esto permite que los componentes hijos puedan acceder a las funciones y al estado 
        //y se encargará de actualizar el estado
        <AuthContextProfile.Provider value={{ 
            user, 
            registrar, 
            loguear,
            isAuthenticated,
            error,
            }}>

                {children}
        
        </AuthContextProfile.Provider>
    );

}

 //Definimos el provider
 //Este provider se encarga de manejar el estado de autenticación del usuario
 AuthProviderProfile.propTypes = {
    children: PropTypes.node.isRequired
};