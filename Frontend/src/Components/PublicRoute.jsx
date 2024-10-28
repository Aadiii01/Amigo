import { Navigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {

  const { isAuthenticated, isLoading } = useSelector((state) => state.userData);
  const location = useLocation();

  // if(isLoading){
  //   return <div></div>
  // }

  if (isAuthenticated) {
    return <Navigate to={location.state?.from || "/home"} />
  }

  return children;
};

export default PublicRoute;
