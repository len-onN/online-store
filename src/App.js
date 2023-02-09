import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import * as api from './services/api';
import Home from './components/pages/Home';

class App extends React.Component {
  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
