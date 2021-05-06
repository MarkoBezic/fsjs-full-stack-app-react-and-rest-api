import "./App.css";
import React from "react";
import Header from "./components/Header";
import Courses from "./components/Courses";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";
import Authenticated from "./components/Authenticated";

import withContext from "./Context";
import PrivateRoute from "./components/PrivateRoute";

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const AuthWithContext = withContext(Authenticated);

function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route path="/error" component={UnhandledError} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/notfound" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
