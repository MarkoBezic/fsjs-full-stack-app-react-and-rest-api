import { useEffect } from "react";
import { Redirect } from "react-router";

//Redirect back to the root directory
const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
  });

  return <Redirect to="/" />;
};

export default UserSignOut;
