import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import { handleLogin as handleLoginAction } from "../actions/authedUser";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // ?redirect url
  const intendedUrl = new URLSearchParams(location.search).get('redirect') || '/';

  // authedUser
  const { authedUser } = useSelector((state) => state);
  const isAuthenticated = authedUser !== null;

  // redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(intendedUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, intendedUrl]);

  // form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please enter username and password");
      return;
    }

    dispatch(handleLoginAction(username, password)).then((user) => {
      if (user) {
        setUsername("");
        setPassword("");
        navigate(intendedUrl, { replace: true });
      } else {
        alert("username or password is incorrect");
      }
    });
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="card auth mt-5 m-auto" role="contentinfo">
      <div className="card-header bg-primary text-light">
        <h2>Employee Polls</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              onChange={handleUsernameChange}
              type="text"
              className="form-control"
              placeholder="Enter your username"
              autoComplete="on"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              onChange={handlePasswordChange}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              />
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login;