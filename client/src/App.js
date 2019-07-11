import React, { Component } from "react";
import {Button} from "@blueprintjs/core"
import {Loading} from "teselagen-react-components";
import "./App.css";
import { ToDos } from "./components/ToDos";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ToDo App</h1>
        <Button text="iowf"/>
        <Loading bounce />
        <ToDos page={1} pageSize={7} />
      </div>
    );
  }
}

export default App;
