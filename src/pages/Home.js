import { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTrash,
  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { getCategories } from '../services/api';
import ProductList from '../components/ProductList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      categories: [],
      value: '',
      queryResults: [],
      isQueryDone: false,
      barsOn: false,
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
    const { value } = this.state;
    const queryAns = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`);
    const queryAnsOk = await queryAns.json();
    const finalAns = queryAnsOk;
    this.setState(
      {
        queryResults: finalAns.results,
        isQueryDone: true,
      },
      () => { this.setState({ barsOn: true }); },
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

  render() {
    const { categories, queryResults, isQueryDone,
      selectedCategoryId, barsOn } = this.state;
    const videoId = 'lrULWBW7gQo';
    const opts = {
      height: '390',
      width: '640',
    };
    return (
      <div>

        <div
          className="top"
        >
          <div
            className="searchBar"
          >
            <span
              className="recommend-action"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria:
              { ' ' }

            </span>
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

            <FontAwesomeIcon
              data-testid="query-button"
              type="submit"
              className="searchButton"
              onClick={ this.handleButton }
              icon={ faSearch }
            />
          </div>
          <div
            className="fixedCart"
          >
            <Link
              to="/shopping-cart"
              data-testid="shopping-cart-button"
            >
              Carrinho
              <FontAwesomeIcon className="chartIcon" icon={ faCartShopping } />
            </Link>
          </div>
        </div>
        <div className="container">
          <div
            className="categoriesList"
          >
            <div className="header-categories">
              <FontAwesomeIcon
                id="categorie-bar"
                type="button"
                style={ barsOn ? { color: 'blue' } : { color: 'black' } }
                onClick={ () => this.setState(
                  () => {},
                  this.setState({ barsOn: !barsOn }),
                ) }
                icon={ faBars }
              />
              <h4 className="categories-declare">Categorias</h4>
              <FontAwesomeIcon
                id="cleanerBtn"
                className={ barsOn ? 'ctg-On' : 'ctg-Off' }
                onClick={ () => {
                  this.setState({
                    selectedCategoryId: null,
                    queryResults: [],
                    isQueryDone: false,
                    barsOn: false,
                  });
                } }
                icon={ faTrash }
              />
            </div>
            <ul>
              {
                categories.map((category, i) => (
                  <div
                    key={ category.id }
                    className={ barsOn ? 'categories-block ctg-On'
                      : 'categories-block ctg-Off' }
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
                .length > 0 && <ProductList queryResults={ queryResults } />}
              { !isQueryDone && (
                <div className="video-container">
                  <YouTube videoId={ videoId } opts={ opts } />
                </div>
              )}
              {
                queryResults.length === 0 && isQueryDone
            && <p>Nenhum produto foi encontrado</p>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
