import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleLogout as handleLogoutAction } from "../actions/authedUser";
import Avatar from "./Avatar";

const Navbar = ({ currentUser, dispatch }) => {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    const isLogout = dispatch(handleLogoutAction());
    if (isLogout) {
      navigate("/login");
    } else {
      alert("Error logging out");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-testid="menu">
      <div className="container">
        <Link className="navbar-brand link-light" to="/">Employee Polls</Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active link-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-light" to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-light" to="/add">Add question</Link>
            </li>
          </ul>
            {
              currentUser === null ? (
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link link-light" to="/login">Login</Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span className="nav-link link-light">
                      <Avatar user={currentUser} />
                      {currentUser.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link link-light logout" onClick={handleLogOut}>
                      Logout
                    </span>
                  </li>
                </ul>
              )
            }
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ authedUser, users }) => {
  const currentUser = users[authedUser];
  if (currentUser === undefined) return { currentUser: null };
  return { currentUser }
};

export default connect(mapStateToProps)(Navbar);