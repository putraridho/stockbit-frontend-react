import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Homepage, Moviepage } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/movie/:id">
            <Moviepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
