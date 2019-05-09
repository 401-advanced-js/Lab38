import superagent from "superagent";
import React from "react";
import { LoginContext } from "./context.js";
import { useState, useContext } from "react";

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SU = e => {
    setUsername(e.target.value);
  };
  const SP = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e, loginMethodFromContext) => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  };

  const context = useContext(LoginContext);
  return (
    <>
      <If condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </If>
      <If condition={!context.loggedIn}>
        <div>
          <form onSubmit={e => handleSubmit(e, context.login)}>
            <input placeholder="username" name="username" onChange={SU} />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={SP}
            />
            <input type="submit" value="login" />
          </form>
        </div>
      </If>
    </>
  );
};

export default Login;
