import React, { useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

export default HeaderComponent = () => {
  const [btnName, setBtnName] = useState("Login");
  const isUserOnline = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="flex h-24 justify-between bg-amber-100 shadow-lg">
      <img className="w-24" src={LOGO_URL} alt="image"></img>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status: {isUserOnline ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>{" "}
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
