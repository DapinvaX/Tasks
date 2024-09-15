import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthProfile } from './context/AuthContextProfile';

function ProtectedRoute() {
    
    const { isAuthenticated } = useAuthProfile();
    
    const navigate = useNavigate();
    
    //Comprobamos si el usuario ha iniciado sesión y si no lo redirigimos a la página de login
    if (!localStorage.getItem('token') || !isAuthenticated) {
        
        navigate('/login');

    }
  
    return (
        <Outlet />
    )

}
export default ProtectedRoute;