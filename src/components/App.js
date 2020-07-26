import React from 'react';
import {Switch, Route} from "react-router-dom";
import Main from "./Main/Main";
import NotFound from "./404/NotFound";
import "./app.css"


function App() {
  return (
    <div className={"container"}>
      <Switch>
        <Route exact path = '/' component = {Main}/>
        <Route path = "*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
