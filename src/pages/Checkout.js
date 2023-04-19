import { Component } from 'react';

class Checkout extends Component {
  constructor() {
    super();
    this.state = ({
      cartList: [],
      address: '',
      phone: '',
      name: '',
      email: '',
      payOption: '',
      cep: '',
      cpf: '',
      isValid: false,
    });
  }

  componentDidMount() {
    this.cartListFetch();
  }

  handleAddress = ({ target }) => {
    this.setState({
      address: target.value,
    });
  };

  handleCep = ({ target }) => {
    this.setState({
      cep: target.value,
    });
  };

  handleCpf = ({ target }) => {
    this.setState({
      cpf: target.value,
    });
  };

  handleEmail = ({ target }) => {
    this.setState({
      email: target.value,
    });
  };

  handleName = ({ target }) => {
    this.setState({
      name: target.value,
    });
  };

  handlePhone = ({ target }) => {
    this.setState({
      phone: target.value,
    });
  };

  payOpt = ({ target }) => {
    this.setState({
      payOption: target.value,
    });
  };

  checkoutHandler = () => {
    const { name, cpf, email, phone, address, cep, payOption } = this.state;
    if (name.length > 0 && cpf.length > 0 && email.length > 0
      && phone.length > 0 && address.length > 0 && cep.length > 0
      && payOption.length > 0) {
      this.setState({
        isValid: false,
      });
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      this.setState({
        isValid: true,
      });
    }
  };

  cartListFetch() {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cartList,
    });
  }

  render() {
    const { cartList, isValid } = this.state;
    return (
      <div>
        { cartList.length > 0 ? cartList.map((product) => (
          <div key={ product.id }>
            <p>{ product.title }</p>
          </div>
        )) : <p>Seu carrinho está vazio</p> }
        <form>
          <fieldset>
            <legend>Dados Pessoais</legend>
            <label htmlFor="name">
              Nome:
              { ' ' }
              <input
                data-testid="checkout-fullname"
                type="text"
                id="name"
                onChange={ this.handleName }
                // required
              />
            </label>
            <label htmlFor="email">
              E-mail:
              { ' ' }
              <input
                data-testid="checkout-email"
                type="email"
                id="email"
                onChange={ this.handleEmail }
                // required
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              { ' ' }
              <input
                data-testid="checkout-cpf"
                type="text"
                id="cpf"
                onChange={ this.handleCpf }
                // required
              />
            </label>
            <label htmlFor="phone">
              Telefone:
              { ' ' }
              <input
                data-testid="checkout-phone"
                type="text"
                id="phone"
                onChange={ this.handlePhone }
                // required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Endereço</legend>
            <label htmlFor="cep">
              CEP:
              { ' ' }
              <input
                data-testid="checkout-cep"
                type="text"
                id="cep"
                onChange={ this.handleCep }
                // required
              />
            </label>
            <label htmlFor="address">
              Endereço:
              { ' ' }
              <input
                data-testid="checkout-address"
                type="address"
                id="address"
                onChange={ this.handleAddress }
                // required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Pagamento</legend>
            <label>
              Boleto:
              <input
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                onChange={ this.payOpt }
                value="ticket-payment"
                // required
              />
            </label>
            <label>
              Visa:
              <input
                data-testid="visa-payment"
                type="radio"
                name="payment"
                onChange={ this.payOpt }
                value="visa"
                // required
              />
            </label>
            <label>
              MasterCard:
              <input
                data-testid="master-payment"
                name="payment"
                onChange={ this.payOpt }
                type="radio"
                value="master"
                // required
              />
            </label>
            <label>
              Elo:
              <input
                data-testid="elo-payment"
                name="payment"
                onChange={ this.payOpt }
                type="radio"
                value="elo"
                // required
              />
            </label>
          </fieldset>
        </form>
        <button
          data-testid="checkout-btn"
          onClick={ () => this.checkoutHandler() }
        >
          Checkout
        </button>
        <div>
          { isValid && <h3 data-testid="error-msg">Campos inválidos</h3> }
        </div>
      </div>
    );
  }
}

export default Checkout;
