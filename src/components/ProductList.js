import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

class ProductList extends Component {
  addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some((item) => item.id === product.id)) {
      product.quantity = 1;
      window.localStorage.setItem('cart', JSON.stringify([...cart, product]));
    }
  };

  render() {
    const { queryResults } = this.props;
    const limitTitle = 65;
    return (
      queryResults
        .map((product) => (
          <div key={ product.id } className="product" data-testid="product">
            <img alt={ product.title } src={ product.thumbnail } />
            <p className="product-title">
              { product.title.slice().length > limitTitle ? `${product
                .title.slice(0, limitTitle)}...` : product.title }

            </p>
            <h4>
              { `R$: ${product.price}` }
            </h4>
            <button
              className="add-product-btn"
              data-testid="product-add-to-cart"
              onClick={ () => this.addToCart(product) }
            >
              <FontAwesomeIcon
                icon={ faCartArrowDown }
                size="2xl"
              />
            </button>
            <Link
              className="product-detail-link"
              data-testid="product-detail-link"
              to={ `./product/${product.id}` }
            >
              Detalhes do produto
            </Link>
          </div>
        ))
    );
  }
}

ProductList.propTypes = {
  queryResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ProductList;
