import React from "react";
import { useRoutes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import CreateQuote from "./components/CreateQuote";
export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
];
