import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Banner/>
      </Router>
    </div>
  );
}

export default App;
