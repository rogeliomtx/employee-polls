import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={`/login?redirect=${location.pathname}`} replace />
    )
  }
  return children;
}

const mapStateToProps = ({ authedUser }) => ({
  isAuthenticated: authedUser !== null,
});

export default connect(mapStateToProps)(ProtectedRoute);