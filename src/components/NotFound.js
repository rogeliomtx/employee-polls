import { useNavigate } from "react-router";

const NotFound = ({ message=null }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      {message ? <p className="lead">{message}</p> : <p className="lead">Page not found</p>}
      <button className="btn btn-primary" onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  )
}

export default NotFound;