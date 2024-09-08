import { Navigate, Outlet } from "react-router-dom";

import { useAuthProfile } from "./context/AuthContextProfile.jsx";

function ProtectedRoute() {
    
    const { isAuthenticated } = useAuthProfile();

    //Si el usuario no está autenticado, se redirigirá a la página de login
    if(!isAuthenticated){

        //Redirige a la página de login
        <Navigate to="/login" replace />

    }
    
    return (
        
        //Outlet es un componente de React Router que se utiliza para renderizar las rutas anidadas
        //Es decir, las rutas que están dentro de otras rutas
        //En este caso, se renderizarán las rutas que están dentro de la ruta protegida
        //Es decir, las rutas que están dentro de la ruta de perfil
        //Por ejemplo, las rutas de tareas, añadir tarea, actualizar tarea, etc.
        <Outlet />
    )

}
export default ProtectedRoute;