import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileRoute = ({ children }) => {
  const { isAuthenticated, isProfileSetup } = useSelector((state) => state.userData);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  } 
  if (isProfileSetup) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProfileRoute;