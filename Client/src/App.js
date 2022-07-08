import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import AboutUs from "./components/AboutUs";
import Memers from "./components/Memer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{position:'relative', margin:'0 auto', width:'100%', minWidth:"300px",overflow:'hidden'}}>
      <Router>
        <Header/>
        <Banner/>
        <AboutUs/>
        <Memers/>
      </Router>
    </div>
  );
}

export default App;
