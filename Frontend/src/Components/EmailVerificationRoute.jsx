import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EmailVerificationRoute = ({ children }) => {
  const location = useLocation();
  const isEmailLink = location.state?.isEmailLink; 
  
  if (!isEmailLink) {
    return <Navigate to="/" />; 
  }
  return children;
};

export default EmailVerificationRoute;