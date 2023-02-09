import React from 'react';
import './App.css';
import * as api from './services/api';

class App extends React.Component {
  handleChange = async () => {
    const categories = await api.getCategories();
    console.log(categories);
  };

  render() {
    return (
      <div className="App">
        <button
          onClick={ this.handleChange }
        >
          Teste
        </button>
      </div>
    );
  }
}

export default App;
