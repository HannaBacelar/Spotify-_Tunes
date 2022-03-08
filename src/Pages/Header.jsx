import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  loading: true,
  user: '',
};
class Header extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  async componentDidMount() {
    const user = await getUser(); /* Recupera nome da pessoa que logou, enquanto não carrega a API aparece o nome carregando  */
    this.setState({
      loading: false,
      user: user.name,

    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">

        {
          loading ? <Loading /> : (
            <p data-testid="header-user-name">{user}</p>) // loading é 'carregando...' se nao for retorna o nome do usuario
        }
      </header>
    );
  }
}

export default Header;
