import { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state({
      product: [],
    });
  }

  render() {
    // const { product } = this.props;
    return (
      <div>
        <p>{/* product.title */}</p>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};
export default Product;
