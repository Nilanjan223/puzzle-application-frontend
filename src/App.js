// import logo from './logo.svg';
import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
// import { Switch } from "react-router";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Login from "./login/Login";
import User from "./user/User";
import Admin from "./admin/Admin";
import { AuthContext } from "./context/auth-context";

import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  // const auth = useContext(AuthContext);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const alogin = useCallback(() => {
    setIsAdmin(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);
  }, []);


  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          isAdmin: isAdmin,
          login: login,
          logout: logout,
          alogin: alogin,
          userId: userId,
        }}
      >
        <Router>
          <MainNavigation />
          <Routes>
              {/* {console.log(auth.isLoggedIn)}     */}
            <Route path="/" exact element={<Login />}></Route>
            <Route path="/admin" exact element={<Admin />}></Route>
            <Route path="/user/:userId" exact element={<User />}></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
