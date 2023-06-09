import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './components/ShoppingCart';
import Product from './components/Product';
import Checkout from './pages/Checkout';

class App extends React.Component {
  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        {/* <Route exact path="/product" component={ Product } /> */}
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/product/:id" render={ (props) => <Product { ...props } /> } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default App;
