import { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { getCategories } from '../services/api';
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
    const videoId = 'lrULWBW7gQo';
    const opts = {
      height: '390',
      width: '640',
    };
    // const { results } = queryResults;
    return (
      <div>

        <div
          className="top"
        >
          <h4
            className="recommend-action"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </h4>
          <div className="searchBar">
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
              Pesquisar
              {' '}

            </button>
          </div>
          <div>
            <Link
              to="/shopping-cart"
              data-testid="shopping-cart-button"
            >
              Carrinho de Compras
            </Link>
          </div>
        </div>
        <div className="container">
          <div
            className="categoriesList"
          >
            <h4 className="categories-declare">Categorias:</h4>
            <button
              id="cleanerBtn"
              onClick={ () => {
                this.setState({
                  selectedCategoryId: null,
                  queryResults: [],
                });
              } }
            >
              Limpar Categoria
            </button>
            <ul>
              {
                categories.map((category, i) => (
                  <div
                    key={ category.id }
                    className="categories-block"
                  >
                    <li
                      className="categories"
                    >
                      <label
                        htmlFor={ `categorie${i}` }
                      >
                        <input
                          style={ { display: 'inline-block' } }
                          data-testid="category"
                          id={ `categorie${i}` }
                          type="radio"
                          name="categorieList"
                          value={ category.id }
                          checked={ category.id === selectedCategoryId }
                          onChange={ this.radioChange }
                        />
                        <span className="categorieName">
                          {' '}
                          { category.name }
                          {' '}
                        </span>
                      </label>
                    </li>
                  </div>
                ))
              }
            </ul>
          </div>
          <div className="product-list">
            <ul>
              { queryResults
                .length > 0 ? queryResults
                  .map((product) => (
                    <div key={ product.id } className="product" data-testid="product">
                      <img alt={ product.title } src={ product.thumbnail } />
                      <p className="product-title">{ product.title }</p>
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
                  ))
                : (
                  <div className="video-container">
                    <YouTube videoId={ videoId } opts={ opts } />
                  </div>)}
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
