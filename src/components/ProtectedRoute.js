import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

const mapStateToProps = ({ authedUser }) => ({
  isAuthenticated: authedUser !== null,
});

export default connect(mapStateToProps)(ProtectedRoute);