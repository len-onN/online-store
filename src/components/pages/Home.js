import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const dataCategories = await getCategories();
    this.setState({ categories: dataCategories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { categories } = this.state;
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
        {categories.map((cat) => (
          <label
            data-testid="category"
            htmlFor="category"
            key={ cat.id }
          >
            <button
              type="radio"
              name="category"
              value={ cat.id }
              onChange={ this.handleChange }
            >
              <p>{cat.name}</p>
            </button>
          </label>
        ))}
      </div>
    );
  }
}

export default Home;
