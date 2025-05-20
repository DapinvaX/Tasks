// Archivo obsoleto. Puede ser eliminado. El contexto de perfil se gestiona en AuthContext.jsx.

// Importamos desde React createContext
import { createContext, useState, useContext, useEffect } from 'react';

//Importamos las funciones de registerReq y loginReq desde la API de autenticación
import {registerReq, loginReq, logoutReq, verifyTokenReq} from './../API/auth.js';

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
        throw new Error('useAuthProfile debe estar dentro del proveedor AuthProvider');
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
            
            //Realizamos la petición de registro al servidor
            const res = await registerReq(user);
            console.log(res.data);

            //Si la respuesta es correcta, se almacena el usuario en el estado y se establece que el usuario está autenticado

            //res.data contiene el usuario registrado
            setUser(res.data);


            setIsAuthenticated(true);

        } catch (errors) {
            
            if(Array.isArray(errors.response.data)){
                    
                console.error('Error al registrar:', errors.response.data);
                return setErrors(errors.response.data);
            
            }
            
        }
    }

    //Definimos la función para loguear
    //Esta función se encarga de realizar la petición de logueo al servidor
    //Recibe como parámetro un objeto con los datos del usuario
    const loguear = async ( user ) => {
        
        //Al ser una petición asíncrona, utilizamos el bloque try-catch para manejar los errores
        try{

            const res =  await loginReq(user);
            
            console.log("Respuesta: "+res);
          
            //Si la respuesta es correcta, se almacena el usuario en el estado y se establece que el usuario está autenticado
            setUser(user);
            setIsAuthenticated(true);

            //Se almacena el token en el localStorage
            localStorage.setItem('token', res.data.token);

            //Se almacena el usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(user));

            //Se almacena el token en las cookies
            Cookies.set('token', res.data.token);
            
            console.log(setUser);
            console.log(setIsAuthenticated);


        }
        catch (errors) {
            
            //Si en el array de errores hay un mensaje, lo mostramos en consola
            if(Array.isArray(errors.response.data)){
                
                console.error('Error al loguear:', errors.response.data);
                return setErrors(errors.response.data);
            
            }
            
        }

        
        
    }

    //Definimos la función para cerrar sesión
    const logout = async () => {
        
        try {
            //Realizamos la petición de logout la api
            const res = await logoutReq();
            console.log(res.data);

            //Limpiamos el localStorage
            //Eliminamos el item que se llama token con el token del usuario
            localStorage.removeItem('token');
            
            //Eliminamos el item que se llama user con el usuario logueado
            localStorage.removeItem('user');
            
            //Limpiamos las cookies
            Cookies.remove('token');
            Cookies.remove('user');

            //Cambiamos el estado de autenticación a false
            setIsAuthenticated(false);

            //Cambiamos el estado del usuario a null
            setUser(null);

        } catch (errors) {
            //Si hay un error, lo mostramos en consola
            console.error(errors);
            
            //Cambiamos el estado de autenticación a false por si acaso
            setIsAuthenticated(false);

            //Y también cambiamos el estado del usuario a null
            setUser(null);

            
        }

    };

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
    }, [isAuthenticated]);



    return (
        //Retornamos el provider con el contexto y las funciones
        //Esto permite que los componentes hijos puedan acceder a las funciones y al estado 
        //y se encargará de actualizar el estado
        <AuthContextProfile.Provider value={{ 
            user, 
            registrar, 
            loguear,
            logout,
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