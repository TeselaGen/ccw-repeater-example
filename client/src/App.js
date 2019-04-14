import React, { Component } from "react";
import "./App.css";
import { ToDos } from "./components/ToDos";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDos page={1} />
      </div>
    );
  }
}

export default App;
