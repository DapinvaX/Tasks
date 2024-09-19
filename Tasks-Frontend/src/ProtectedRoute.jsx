import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthProfile } from './context/AuthContextProfile';
import { useEffect } from 'react';

function ProtectedRoute() {
    
    //Se crea una constante que almacena el hook useAuthProfile
    //Este hook contiene la función isAuthenticated que permite saber si el usuario está autenticado
    const { isAuthenticated } = useAuthProfile();

    //Se crea una constante que almacena la función navigate
    const navigate = useNavigate();

    useEffect(() => {
        // Comprobamos si el usuario ha iniciado sesión y si no lo redirigimos a la página de login
        if ( isAuthenticated === false ) {

            navigate('/login');
            
        }
    }, [isAuthenticated, navigate]);

    return <Outlet />;
}

export default ProtectedRoute;