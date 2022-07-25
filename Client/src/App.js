import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vote from "./pages/Vote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" >
      <Router>
        <Header/>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/Vote"} element={<Vote/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
