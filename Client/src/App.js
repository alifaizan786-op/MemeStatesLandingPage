import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{position:'relative', margin:'0 auto', width:'100vw', height:'100vh', minWidth:"300px",overflow:'hidden'}}>
      <Router>
        <Header/>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/login"} element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
