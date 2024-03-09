import { createContext } from "react";

const AuthContext = createContext({
  userAuthenticated: false,
  setUserAuthenticated: () => {},
});

export default AuthContext;
