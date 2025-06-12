import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { RouteAdminSignin, RouteChatbot, RouteDocs, RouteIndex, RouteNews } from "./helpers/RouteNames";
import Index from "./Pages/Index";
import Chatbot from "./Pages/chatbot/Chatbot";
import Layout from "./Pages/Layout/Layout";
import Docs from "./Pages/documentation/Docs";
import AdminSignin from "./Pages/AdminSignin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import News from "./Pages/News/News";
import Page_404 from "./Pages/Page_404.jsx";

function App() {
   const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="687104853269-7meet9t6dou3kqh5ksq70gtfir0ugc7m.apps.googleusercontent.com">
        <AdminSignin />
      </GoogleOAuthProvider>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
        <Route path={RouteChatbot} element={<Chatbot />}></Route>
        <Route path={RouteDocs} element={<Docs/>}></Route>
        <Route path={RouteAdminSignin} element={<GoogleAuthWrapper/>}></Route>
        <Route path={RouteNews} element={<News/>}></Route>
        </Route>
        <Route path="*" element={<Page_404/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
