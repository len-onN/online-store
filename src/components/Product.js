import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor() {
    super();
    this.state = ({
      product: [],
      cartProduct: [],
    });
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params } } = this.props;
    const product = await fetch(`https://api.mercadolibre.com/items/${params.id}`);
    const treatedProduct = await product.json();
    this.setState({
      product: treatedProduct,
    });
  };

  addToCart = (product) => {
    const { location: { state: { state } } } = this.props;
    if (!state.some((crtPdct) => crtPdct.id === product.id)) {
      state.push(product);
      localStorage.setItem('cartList', JSON.stringify(state));
    }
    this.setState({
      cartProduct: state,
    });
  };

  render() {
    const { product, cartProduct } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{ product.title }</h2>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h4 data-testid="product-detail-price">{ product.price }</h4>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to={ { pathname: '/shopping-cart', state: cartProduct } }
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      state: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          id: PropTypes.string,
        }),
      ) }),
  }).isRequired,
};
export default Product;
