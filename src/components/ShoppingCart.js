import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartItem from './ShoppingCartItem';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        { cart.length === 0
          ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          : cart.map((product, i) => (
            <ShoppingCartItem
              key={ `${product.id}${i}` }
              product={ product }
            />
          ))}
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Checkout
        </Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ShoppingCart;
