import React, { useContext } from "react";
import PropTypes from "prop-types";

import { LoginContext } from "./context.js";

const If = props => {
  return props.condition ? props.children : null;
};

console.log("auth loaded");

const Auth = props => {
  const context = useContext(LoginContext);

  let okToRender =
    context.loggedIn &&
    (props.capability
      ? context.user.capabilities &&
        context.user.capabilities.includes(props.capability)
      : true);

  return <If condition={okToRender}>{props.children}</If>;
};

Auth.propTypes = {
  capability: PropTypes.string.isRequired
};

export default Auth;
