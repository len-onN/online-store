import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor() {
    super();
    this.state = ({
      product: [],
      email: '',
      comment: '',
      ratingValue: '',
      rating: ['1', '2', '3', '4', '5'],
      ratingDone: [],
      ratingModel: { email: '', rating: '', text: '' },
      isOk: false,
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
      ratingDone: JSON.parse(localStorage.getItem(`${params.id}`)) || [],
    });
  };

  addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some((item) => item.id === product.id)) {
      product.quantity = 1;
      window.localStorage.setItem('cart', JSON.stringify([...cart, product]));
    }
  };

  handleEmailChange = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
    });
    // console.log(value);
  };

  handleCommentChange = ({ target }) => {
    const { value } = target;
    this.setState({
      comment: value,
    });
  };

  handleRatingChange = ({ target }) => {
    this.setState({
      ratingValue: target.value,
    });
  };

  submitReview = (id) => {
    const { ratingModel } = this.state;
    const { ratingDone, email, comment, ratingValue } = this.state;
    if (email.length === 0 || ratingValue.length === 0) {
      this.setState({ isOk: true });
      // console.log('uhu');
    } else {
      ratingModel.email = email;
      ratingModel.rating = ratingValue;
      ratingModel.text = comment;
      ratingDone.push(ratingModel);
      this.setState({ email: '', comment: '', ratingValue: '', isOk: false });
      localStorage.setItem(`${id}`, JSON.stringify(ratingDone));
    }
    // console.log(JSON.parse(localStorage.getItem(`${id}`)));
  };

  render() {
    const { product, email, comment, rating, isOk, ratingDone } = this.state;
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
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
        <div>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ this.handleEmailChange }
              id="email"
            />
          </label>
          <label htmlFor="comment">
            Comentário:
            <textarea
              type="text"
              data-testid="product-detail-evaluation"
              onChange={ this.handleCommentChange }
              value={ comment }
              id="comment"
            />
          </label>
          { rating.map((value) => (
            <input
              key={ value }
              name="rating"
              data-testid={ `${value}-rating` }
              type="radio"
              value={ value }
              onChange={ this.handleRatingChange }
            />
          )) }
          <button
            data-testid="submit-review-btn"
            onClick={ () => this.submitReview(product.id) }
          >
            Enviar Avaliação
          </button>
          { isOk && <p data-testid="error-msg"> Campos inválidos </p> }
        </div>
        <div>
          { ratingDone.map((rater, i) => (
            <div key={ `${rater.email}${i}` }>
              <p data-testid="review-card-email">{rater.email}</p>
              <p data-testid="review-card-evaluation">{rater.text}</p>
              <p data-testid="review-card-rating">{rater.rating}</p>
            </div>
          )) }
        </div>
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
};
export default Product;
