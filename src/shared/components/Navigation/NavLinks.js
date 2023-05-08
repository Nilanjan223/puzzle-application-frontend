import React,{useContext} from "react";
import { NavLink,useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
// import Button from "../FormElements/Button";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth=useContext(AuthContext);
  const history=useNavigate();
  
  const clickHandler= () =>{
    auth.logout();
    history('/');

  }

  return (
    <ul className="nav-links">
  
        {auth.isLoggedIn && !auth.isAdmin && <li><NavLink to={`/user/${auth.userId}`}>MY PAGE</NavLink></li>}

        {auth.isLoggedIn && auth.isAdmin && <li><NavLink to="/admin">STATISTICS</NavLink></li>}
        {/* <NavLink to={`/${auth.userId}/places/`}>MY PLACE</NavLink> */}


      {!auth.isLoggedIn && !auth.isAdmin && <li>
        <NavLink to="/">AUTHENTICATE</NavLink> 
      </li>}
      {auth.isLoggedIn &&<li>
        <button inverse="true" onClick={clickHandler}>LOGOUT</button>
      </li>}
    </ul>
  );
};

export default NavLinks;
