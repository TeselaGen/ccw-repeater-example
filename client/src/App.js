import React, { Component } from "react";
import logo from "./logo.svg";
import ToDos from "./components/ToDos";
import "./App.css";
import AddTodo from "./components/AddTodo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDos />
      </div>
    );
  }
}

export default App;
