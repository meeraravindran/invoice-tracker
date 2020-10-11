import React from "react";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated, signout} from "../auth/api"
const currentTab = (history, path) => {
  if(history.location.pathname ===  path){
      return {color : "#FFFFFF"}
  } 
}
const Navbar = ({history}) => (
  <div>
    {isAuthenticated() && (
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history,"/")} className="nav-link" to="/">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link style={currentTab(history,"/")} className="nav-link" to="/">
          Statistics
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link text-primary"
          onClick={()=>{
            signout(()=>{history.push("/");});
          }}>Signout</span>
      </li>
    </ul>
    )
  }
  </div>
);

export default withRouter(Navbar);
