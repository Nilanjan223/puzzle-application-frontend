import { createContext } from "react";

export const AuthContext = createContext({
  isAdmin:false,
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
  alogin:() =>{},
});
