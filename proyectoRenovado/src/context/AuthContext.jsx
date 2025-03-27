import { createContext, useContext, useState, useEffect } from 'react';

//Importamos PropTypes para definir el tipo de las propiedades
import PropTypes from 'prop-types';

//Importamos la librería de Cookies
import Cookies from 'js-cookie';


import { 
  registerReq,
  loginReq,
  logoutReq,
  verifyTokenReq
 } from '../api/auth';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  

  // Limpiar errores cada 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginReq(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = async () => {
    try{
      const res = await logoutReq(); // Hacemos la petición al servidor para cerrar la sesión
      console.log(res); // Imprimimos la respuesta del servidor
      Cookies.remove("token");
      setUser(null); // Eliminamos el usuario del estado
      setIsAuthenticated(false); // Cambiamos el estado de autenticado a false
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await verifyTokenReq(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
       
      } catch (error) {
        setIsAuthenticated(false);
        setErrors(["No estás autorizado para ver esta página"]); 
      }
    };
    checkLogin();
  }, []);

  // Retornar el Provider con todos los valores que queremos compartir
  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated,
        errors,
        signup,
        signin,
        logout,
        setErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//Definimos el provider
 //Este provider se encarga de manejar el estado de autenticación del usuario
 AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};