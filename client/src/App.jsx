import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import {
  RouteBlogDetail,
  RouteBlogs,
  RouteCreateBlog,
  RouteEditBlog,
  RouteHome,
  RouteIndex,
  RouteLogin,
  RouteLoginVerify,
  RouteSignup,
} from "./helper/RouteNames.js";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import Page_404 from "./Pages/Page_404";
import AuthRouteProtection from "./Components/AuthRouteProtection";
import Sidebar from "./Pages/Sidebar";
import CreateBlog from "./Blog/CreateBlog";
import Blogs from "./Blog/Blogs";
import BlogDetail from "./Blog/BlogDetail";
import UpdateBlog from "./Blog/UpdateBlog";
import LoginVerify from "./Pages/LoginVerify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Sidebar />}>
          <Route index element={<Index />}></Route>
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteHome} element={<HomePage />}></Route>
            <Route path={RouteCreateBlog} element={<CreateBlog />}></Route>
            <Route path={RouteEditBlog()} element={<UpdateBlog />}></Route>
          </Route>
            <Route path={RouteBlogs} element={<Blogs />}></Route>
        <Route path={RouteBlogDetail()} element={<BlogDetail />}></Route>
        </Route>
        <Route path={RouteLogin} element={<Login />}></Route>
        <Route path={RouteLoginVerify} element={<LoginVerify />}></Route>
        <Route path="*" element={<Page_404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
