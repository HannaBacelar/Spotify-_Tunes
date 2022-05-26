import React from 'react';
import { Redirect } from 'react-router';
import '../css/login.css';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  name: '',
  botao: true,
  loading: false,
  carregado: false,
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  // Verifica se tem 3 letras e habilita botão
   verificaBotao = (event) => {
     const number3 = 3;

     this.setState(() => ({
       name: event.target.value,
       botao: event.target.value.length < number3,

     }));
   }

   //  Aparece msg carregando enquanto a  Api não vemm
  funcCarregando = (event) => {
    event.preventDefault();

    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name }); // chamando Api, apos ser carregada o 'carregando' sai.
      this.setState({
        loading: false,
        carregado: true,
      });
    });
  }

  render() {
    const { botao, loading, carregado } = this.state; //  desestruturando

    return (
      <div className="bodyLogin" data-testid="page-login">
        <header className="header-login">
          <img
            className="logo-login"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black-768x230.png"
            alt="logo"
          />
          {
            loading ? <Loading /> : ( // loading é <loading(arquivo) === true, se nao for retorna o form
              <form className="form-login">
                <label htmlFor="name-input">

                  <input
                    data-testid="login-name-input"
                    type="text"
                    name="name"
                    id="name-input"
                    placeholder="Digite seu nome"
                    onChange={ this.verificaBotao }
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  name="botao"
                  id="botao"
                  disabled={ botao } //  desabilita botão antes da condição das 3 letras
                  onClick={ this.funcCarregando }
                >
                  Entrar
                </button>
              </form>
            )
          }
          {carregado && <Redirect to="/search" />}
          { /* carregando for true redireciona para o componente Search */ }
        </header>
        <div className="containter-header">
          <h2 id="titulo">
            Curta músicas sem anúncios
            ouça no modo offline e muito mais.
          </h2>
          <h2 id="titulo2">
            ouça no modo offline e muito mais.
          </h2>
          <img
            id="tela-notbook"
            src="https://www.inside-digital.de/img/spotify-diese-geniale-iphone-funktion-kommt-auf-android-handys-0664.jpg"
            alt="tela de celular e notbook"
          />

        </div>
      </div>
    );
  }
}
export default Login;
