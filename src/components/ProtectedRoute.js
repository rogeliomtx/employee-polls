import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  const { authedUser } = useSelector((state) => state);
  const isAuthenticated = authedUser !== null;

  if (!isAuthenticated) {
    return (
      <Navigate to={`/login?redirect=${location.pathname}`} replace />
    )
  }
  return children;
}

const mapStateToProps = ({ authedUser }) => ({
 
});

export default ProtectedRoute;