import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart';

class Home extends React.Component {
  render() {
    return (
      <div>
        <label
          htmlFor=""
        >
          <input
            type="text"
            name="search"
          />
        </label>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Shopping Cart
        </Link>
      </div>
    );
  }
}

export default Home;
