import react from 'react';

class ShoppingCartItem extends react.Component {
  state = {
    quantity: 1,
  };

  componentDidMount() {
    const { product } = this.props;
    this.setState({ quantity: product.quantity });
  }

  handleIncrease = () => {
    const { quantity } = this.state;
    const { product } = this.props;
    this.setState({ quantity: quantity + 1 });
    product.quantity = quantity + 1;
    this.setLocalStorage();
  };

  setLocalStorage = () => {
    const { product } = this.props;
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    const newCart = cart.filter((item) => item.id !== product.id);
    window.localStorage.setItem('cart', JSON.stringify([...newCart, product]));
  };

  removeProduct = () => {
    const { product } = this.props;
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    const newCart = cart.filter((item) => item.id !== product.id);
    window.localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ quantity: 0 });
  };

  handleDecrease = () => {
    const { quantity } = this.state;
    const { product } = this.props;
    if (quantity !== 1) {
      product.quantity = quantity - 1;
      this.setState({ quantity: quantity - 1 });
    }
    this.setLocalStorage();
  };

  render() {
    const { product } = this.props;
    const { quantity } = this.state;
    if (quantity === 0) return null;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
        <h3 data-testid="shopping-cart-product-quantity">{quantity}</h3>
        <button
          data-testid="product-increase-quantity"
          onClick={ () => this.handleIncrease() }
        >
          +
        </button>
        <button
          data-testid="product-decrease-quantity"
          onClick={ () => this.handleDecrease() }
        >
          -
        </button>
        <button
          data-testid="remove-product"
          onClick={ () => this.removeProduct() }
        >
          Removera

        </button>
      </div>
    );
  }
}

export default ShoppingCartItem;
