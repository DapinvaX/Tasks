import { useAuthProfile } from "./context/AuthContextProfile.jsx";

import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

    const { isAuthenticated } = useAuthProfile();
    console.log(isAuthenticated);
  
    if (!isAuthenticated) {
        
        return <Navigate to="/login" />;
        
    }
    
    return (
        <Outlet />
    )

}
export default ProtectedRoute;