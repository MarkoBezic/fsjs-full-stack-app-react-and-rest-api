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
    password: "",
    course: "",
    allCourses: "",
    error: null,
    isLoaded: false,
  };

  render() {
    const {
      authenticatedUser,
      password,
      course,
      allCourses,
      error,
      isLoaded,
    } = this.state;

    const value = {
      allCourses,
      error,
      isLoaded,
      course,
      password,
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        courseToUpdate: this.setStateOfCourseToUpdate,
        getAllCourses: this.getAllCourses,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  getAllCourses = () => {
    this.data.getCourses().then(
      (result) => {
        this.setState({ isLoaded: true });
        this.setState({ allCourses: result });
      },
      (error) => {
        this.setState({ isLoaded: true });
        this.setState({ error: error });
      }
    );
  };

  setStateOfCourseToUpdate = (course) => {
    this.setState({ course });
  };

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState({
        authenticatedUser: user,
        password: password,
      });

      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = async () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
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
