import { createContext } from "react";
const UserContext = createContext({
    loggedInUser: "Default User",
});

export default UserContext;
//here we have created a context with default value as "Default User". 
// This context will be used to provide and consume user information across the 
// component tree without having to pass props down manually at every level.