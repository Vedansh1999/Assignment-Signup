import React, { Component } from "react";
import Signup from "../components/Signup";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";

class App extends Component {
  state = {
    count: "loading...",
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
