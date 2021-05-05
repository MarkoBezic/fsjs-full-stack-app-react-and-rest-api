import { Redirect } from "react-router";

const UserSignOut = ({ context }) => {
  context.actions.signOut();

  return <Redirect to="/" />;
};

export default UserSignOut;
