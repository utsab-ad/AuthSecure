import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { RouteChatbot, RouteIndex } from "./helpers/RouteNames";
import Index from "./Pages/Index";
import Chatbot from "./Pages/chatbot/Chatbot";

function App() {

  return (
     <BrowserRouter>
     
      <Routes>

      <Route path={RouteIndex} element={<Index/>}></Route>
      <Route path={RouteChatbot} element={<Chatbot/>}></Route>

      </Routes>
     </BrowserRouter>
  )
}

export default App
