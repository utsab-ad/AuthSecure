import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import {
  RouteBlogDetail,
  RouteBlogs,
  RouteCreateBlog,
  RouteEditBlog,
  RouteHireme,
  RouteHiremeRequests,
  RouteHiremeVerify,
  RouteHome,
  RouteIndex,
  RouteLandingPageForm,
  RouteLogin,
  RouteLoginVerify,
  RoutePortfolioPageForm,
  RouteTrackApplication,
} from "./helper/RouteNames.js";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Page_404 from "./Pages/Page_404";
import AuthRouteProtection from "./helpingComponents/AuthRouteProtection";
import CreateBlog from "./Blog/CreateBlog";
import Blogs from "./Blog/Blogs";
import BlogDetail from "./Blog/BlogDetail";
import UpdateBlog from "./Blog/UpdateBlog";
import LoginVerify from "./Pages/LoginVerify";
import LandingPageForm from "./Pages/Create/LandingPageForm";
import PortfolioPageForm from "./Pages/Create/PortfolioForm";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import HiremePage from "./Pages/Hireme/HiremePage";
import HiremeRequestVerify from "./Pages/Hireme/HiremeRequestVerify";
import HiremeRequests from "./Pages/Hireme/HiremeRequests";
import TrackApplication from "./Pages/Hireme/TrackApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Sidebar />}>
          <Route index element={<Index />}></Route>
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteCreateBlog} element={<CreateBlog />}></Route>
            <Route path={RouteEditBlog()} element={<UpdateBlog />}></Route>
          </Route>
          <Route path={RouteBlogs} element={<Blogs />}></Route>
          <Route path={RouteBlogDetail()} element={<BlogDetail />}></Route>
          <Route path={RouteHireme} element={<HiremePage />}></Route>
          <Route
            path={RouteTrackApplication}
            element={<TrackApplication />}
          ></Route>
          <Route
            path={RouteHiremeVerify}
            element={<HiremeRequestVerify />}
          ></Route>
          <Route
            path={RouteLandingPageForm}
            element={<LandingPageForm />}
          ></Route>
          <Route
            path={RoutePortfolioPageForm}
            element={<PortfolioPageForm />}
          ></Route>
        </Route>
        <Route path={RouteLogin} element={<Login />}></Route>
        <Route path={RouteLoginVerify} element={<LoginVerify />}></Route>
        <Route path="*" element={<Page_404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
