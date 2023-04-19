import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';
// import Product from '../Product';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      categories: [],
      value: '',
      queryResults: [],
      isQueryDone: false,
    });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const gotCategories = await getCategories();
    console.log(gotCategories);
    this.setState({
      categories: gotCategories,
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      value,
    });
  };

  handleButton = async () => {
    const { value, queryResults } = this.state;
    const queryAns = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`);
    const queryAnsOk = await queryAns.json();
    const finalAns = queryAnsOk;
    this.setState(
      {
        queryResults: finalAns.results,
        isQueryDone: true },
      () => console.log(queryResults),
    );
  };

  radioChange = async ({ target }) => {
    const { value } = target;
    const categoryListB = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${value}`);
    const categoryList = await categoryListB.json();
    this.setState({
      selectedCategoryId: value,
      queryResults: categoryList.results,
    });
  };

  addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.some((item) => item.id === product.id)) {
      product.quantity = 1;
      window.localStorage.setItem('cart', JSON.stringify([...cart, product]));
    }
  };

  render() {
    const { categories, queryResults, isQueryDone,
      selectedCategoryId } = this.state;
    // const { results } = queryResults;
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h1>
        <label
          htmlFor="search"
        >
          <input
            data-testid="query-input"
            type="text"
            id="search"
            name="search"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="query-button"
          type="submit"
          onClick={ this.handleButton }
        >
          {' '}
          clica
          {' '}

        </button>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
        <div className="container">
          <ul>
            {
              categories.map((category) => (
                <li className="categories" key={ category.id }>
                  <input
                    data-testid="category"
                    type="radio"
                    name="categorieList"
                    value={ category.id }
                    checked={ category.id === selectedCategoryId }
                    onChange={ this.radioChange }
                  />
                  <h4>{ category.name }</h4>
                </li>
              ))
            }
          </ul>
          <div className="product-list">
            <ul>
              { queryResults
                .length > 0 && queryResults
                .map((product) => (
                  <div key={ product.id } data-testid="product">
                    <h3>{ product.title }</h3>
                    <img alt={ product.title } src={ product.thumbnail } />
                    <h4>
                      R$:
                      { product.price }
                    </h4>
                    <button
                      data-testid="product-add-to-cart"
                      onClick={ () => this.addToCart(product) }
                    >
                      Adicionar ao Carrinho
                    </button>
                    <Link
                      data-testid="product-detail-link"
                      to={ `./product/${product.id}` }
                    >
                      Detalhes do produto
                    </Link>
                  </div>
                ))}
            </ul>
          </div>
          {
            queryResults.length === 0 && isQueryDone
            && <p>Nenhum produto foi encontrado</p>
          }
        </div>
      </div>
    );
  }
}

export default Home;
