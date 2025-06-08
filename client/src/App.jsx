import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { RouteAdminSignin, RouteChatbot, RouteDocs, RouteIndex } from "./helpers/RouteNames";
import Index from "./Pages/Index";
import Chatbot from "./Pages/chatbot/Chatbot";
import Layout from "./Pages/Layout/Layout";
import Docs from "./Pages/documentation/Docs";
import AdminSignin from "./Pages/AdminSignin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
        <Route path={RouteChatbot} element={<Chatbot />}></Route>
        <Route path={RouteDocs} element={<Docs/>}></Route>
        <Route path={RouteAdminSignin} element={<AdminSignin/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
