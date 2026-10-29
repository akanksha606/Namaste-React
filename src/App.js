import {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import HeaderComponent from "./components/Header";
import BodyComponent from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
// import Grocery from "./components/Grocery";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// Episode 7 routing in our food app

const Grocery = lazy(() => import("./components/Grocery")); // Lazy loading Grocery component
const AppComponent = () => {
  const [userName, setUserName] = useState("");
  // State to hold the logged in user name

  useEffect(() => {
    const data = { name: "Akanksha Gupta" }; // Simulating fetching user data from an API
    setUserName(data.name); // Update the state with the fetched user data
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="main-container">
        <HeaderComponent />

        <Outlet />
      </div>
    </UserContext.Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    children: [
      {
        path: "/",
        element: <BodyComponent />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element:<Suspense fallback={<h1>Loading Grocery...</h1>}><Grocery /></Suspense>,
      },
      {
        path: "/restaurants/:resId", // :resId is dynamic id's
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
