import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import {
  RouteHome,
  RouteIndex,
  RouteLogin,
  RouteSignup,
} from "./helper/RouteNames.js";
import Index from "./Pages/Index";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import Page_404 from "./Pages/Page_404";
import AuthRouteProtection from "./Components/AuthRouteProtection";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
          <Route path="*" element={<Page_404 />}></Route>

          <Route element={<AuthRouteProtection />}>
            <Route path={RouteHome} element={<HomePage />}></Route>
          </Route>
        </Route>
        <Route path={RouteSignup} element={<Signup />}></Route>
        <Route path={RouteLogin} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
