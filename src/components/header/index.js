import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify"

import { useAppContext } from "../../libs/contextLib";

import { SwipeableDrawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./styles.css";
import logo from "../../assets/g841.png";

export default function Header() {
  const { userHasAuthenticated, isAuthenticated } = useAppContext();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if ( event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawer(open);
  };

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    console.log("Logged Out");
  }

  return (
    <div className="Header">
      <Link to="/" className="Logo">
        Cupido Online
      </Link>

      <div className="HeaderLinksWrapper">
        <div className="HeaderLinks" style={{ display: isAuthenticated ? "none" : "flex" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="HeaderLinksLogged" style={{ display: isAuthenticated ? "flex" : "none" }}>
          <Link to="/profile">Perfil</Link>
          <Link to="/messages">Mensagens</Link>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>

      <div className="HeaderDrawer">
        <button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </button>
        <SwipeableDrawer anchor="left" open={drawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          <img alt="Cupido Online" src={logo} />

          <div className="HeaderDrawerLinks" style={{ display: isAuthenticated ? "none" : "flex" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          
          <div className="HeaderDrawerLinksLogged" style={{ display: isAuthenticated ? "flex" : "none" }}>
            <Link to="/profile">Perfil</Link>
            <Link to="/messages">Mensagens</Link>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}
