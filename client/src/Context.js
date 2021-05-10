import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    password: Cookies.getJSON("password") || null,
    course: "",
  };

  render() {
    const { authenticatedUser, password } = this.state;

    const value = {
      password,
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState({
        authenticatedUser: user,
        password: password,
      });

      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("password", password, { expires: 1 });
    }
    return user;
  };

  signOut = async () => {
    this.setState({ authenticatedUser: null, password: null });
    Cookies.remove("authenticatedUser", "password");
  };
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
