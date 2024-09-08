import { Navigate, Outlet } from "react-router-dom";
import { useAuthProfile } from "./context/AuthContextProfile";

function ProtectedRoute() {
    
    const { isAuthenticated} = useAuthProfile();

    if(!isAuthenticated){

       Navigate('/login');

    }
    
    return (
        <Outlet />
    )

}
export default ProtectedRoute;