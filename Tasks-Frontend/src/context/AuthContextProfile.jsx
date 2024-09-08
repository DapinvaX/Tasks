// Importamos desde React createContext
import { createContext, useState, useContext, useEffect } from 'react';

//Importamos las funciones de registerReq y loginReq desde la API de autenticación
import {registerReq, loginReq, verifyTokenReq} from './../API/auth.js';

//Importamos PropTypes para definir el tipo de las propiedades
import PropTypes from 'prop-types';

//Importamos la librería de Cookies
import Cookies from 'js-cookie';


// Creamos el contexto
export const AuthContextProfile = createContext();

// Creamos el hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
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
    const [errors, setErrors] = useState([]);

    //Definimos las funciones para registrar y loguear
    const registrar = async ( user ) => {
        try {
            const res = await registerReq(user);
            console.log(res.data);
            setUser(res.data);
           
        } catch (errors) {
            
            if(Array.isArray(errors.response.data)){
                    
                console.error('Error al registrar:', errors.response);
                return setErrors(errors.response.data.message);
            
            }
            
        }
    }

    //Definimos la función para loguear
    //Esta función se encarga de realizar la petición de logueo al servidor
    //Recibe como parámetro un objeto con los datos del usuario
    const loguear = async ( user ) => {
        //Al ser una petición asíncrona, utilizamos el bloque try-catch para manejar los errores
        try{

            //Realizamos la petición de logueo al servidor
            const res =  await loginReq(user);
            //Si la petición es exitosa, mostramos el mensaje en consola
            setIsAuthenticated(true);
            setUser(res.data);
           //Verificamos si tiene el token
            if(res.data.token){
                //Guardamos el token en una cookie
                Cookies.set('token', res.data.token);
            }else{
                res.status(401).json({message: 'No hay token'});
                console.error('No hay token');
            }

            //Si la petición es exitosa, mostramos el mensaje en consola
            console.log(res.data);

        
        }
        catch (errors) {

            setIsAuthenticated(false);
            //Si hay errores en la respuesta, mostramos el mensaje de error en consola
            if(Array.isArray(errors.response.data)){
                    
                    console.error('Error al loguearse:', errors.response);
                    return setErrors(errors.response.data.message);

                
            }
        }
        
    }

    //Definimos el useEffect para manejar los errores
    useEffect(() => {
        
        if(errors.length > 0){
            
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);

        }

    }, [errors]);
    
    //Definimos el useEffect para verificar si el token es válido
    useEffect(() => {
        const cookies = Cookies.get();
    
        if(cookies.token){
           
            console.log(cookies.token);
            try{
                const res = verifyTokenReq(cookies.token);
                console.log(res.data);
                if(res.data){
                   const autenticado = setIsAuthenticated(true); 
                    console.log("Usuario autenticado: "+ autenticado);
                }
            }catch(errors){
                
                console.error(errors);
                setIsAuthenticated(false);
                setUser(null);
            }
    
        }
    }, []);

    return (
        //Retornamos el provider con el contexto y las funciones
        //Esto permite que los componentes hijos puedan acceder a las funciones y al estado 
        //y se encargará de actualizar el estado
        <AuthContextProfile.Provider value={{ 
            user, 
            registrar, 
            loguear,
            isAuthenticated,
            verifyTokenReq,
            errors,
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
