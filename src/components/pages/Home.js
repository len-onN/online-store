import React from 'react';
import { getCategories } from '../../services/api';
// import Product from '../Product';

class Home extends React.Component {
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

  render() {
    const { categories, queryResults, isQueryDone } = this.state;
    // const { results } = queryResults;
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h1>
        {
          categories.map((categorie) => (
            <li data-testid="category" key={ categorie.id }>{ categorie.name }</li>
          ))
        }
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
            </div>
          ))}
        {
          queryResults.length === 0 && isQueryDone && <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

export default Home;
