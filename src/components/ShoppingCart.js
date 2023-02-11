import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
  componentDidMount() {
    const { location: { state } } = this.props;
    console.log(state);
    this.carListRescue();
  }

  carListRescue = () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    console.log(cartList);
  };

  render() {
    const { location: { state } } = this.props;
    return (
      <div>
        { state.length === 0
          ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          : state.map((product, i) => (
            <div key={ `${product.id}${i}` }>
              <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
              <h3 data-testid="shopping-cart-product-quantity">1</h3>
            </div>
          ))}
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
