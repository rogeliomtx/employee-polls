import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p className="lead">Page not found</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound;