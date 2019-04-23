import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ListTasksController from './containers/ListTasksController';
import TaskDetails from './components/TaskDetails';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/details" component={TaskDetails} />
        <Route path="/" exact component={ListTasksController} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
