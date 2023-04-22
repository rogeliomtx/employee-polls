import { Route, Routes } from "react-router-dom";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import CreateQuestion from './components/CreateQuestion';
import QuestionDetails from './components/QuestionDetails';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import ProtectedRoute from "./components/ProtectedRoute";

import { handleInitialData } from "./actions/shared";

function App({ dispatch, loading }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return (
    <Fragment>
      <LoadingBar />
      {
        loading ? <div>Loading...</div> : (
          <div>
            <Navbar />
            <div className="container">
              <Routes>                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } />
                <Route path="/add" element={
                  <ProtectedRoute>
                    <CreateQuestion />
                  </ProtectedRoute>
                } />
                <Route path="/questions/:questionId" element={
                  <ProtectedRoute>
                    <QuestionDetails />
                  </ProtectedRoute>
                } />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        )
      }
    </Fragment>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    loading: users === null,  // if users are loaded, loading is false
    authedUser,
  }
}
export default connect(mapStateToProps)(App);
