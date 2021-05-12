import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

import { TextField } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./styles.css";

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    console.log(email, password);
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (err) {
      console.log(err);
      onError(err);
    }
  }

  return (
    <div className="Login">
      <div className="LoginHeader">
        <Link to="/" className="Icon">
          <ArrowBackIcon fontSize="large"/>
        </Link>

        <Link to="/" className="Logo">
          Cupido Online
        </Link>
      </div>
      <div className="LoginBody">
        <div className="LoginWrapper">
          <h2>Login</h2>
          <form className="LoginCard" onSubmit={handleSubmit}>
            <TextField id="standard-basic" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            <TextField id="standard-basic" placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Esqueci a Senha</button>
            <input className="LoginCardSubmit" type="submit" value="Entrar" disabled={!validateForm()} />
          </form>
          <Link to="/register">Crie uma conta</Link>
        </div>
      </div>
    </div>
  );
}
