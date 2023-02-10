import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
      </Switch>
    );
  }
}

export default App;
