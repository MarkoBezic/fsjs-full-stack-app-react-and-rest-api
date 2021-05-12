import React from "react";
import { Redirect } from "react-router";

const NotFound = () => {
  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Redirect to="/notfound" />
    </div>
  );
};

export default NotFound;
