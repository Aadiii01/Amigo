import { Navigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isProfileSetup, isLoading } = useSelector((state) => state.userData);
  const location = useLocation();

  // useEffect(() => {
  //   window.history.replaceState(null, null, window.location.href);
  // }, []);

  // if(isLoading){
  //   return <div></div>
  // }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace/>;
  } 
  if (isAuthenticated && !isProfileSetup) {
    return <Navigate to="/setprofile" />;
  }
  return children;
};

export default ProtectedRoute;