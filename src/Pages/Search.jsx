import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

const number2 = 2;

const INITIAL_STATE = {
  loading: false,
  albums: [], // recebe um array da api
  artistaName: '', // esta dentro do obejto da api
  form: true, // form aparece de primeira
  ApiOk: false, // api ira ficar true após a requisição ser feita
  pesquisa: '', // capta os valores que são depositados no input  em seguida dados os valores carrega a API após clicar no botão
};

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  lidaBotao = (event) => {
    this.setState(() => ({
      pesquisa: event.target.value,
    }));
  }

    // Antes da Api ser invocada chamando os albuns
    lidaClickBotao = async () => {
      const { pesquisa } = this.state; // PESQUISA É OQ TENHO NO INPUT COMO VALOR
      this.setState({
        loading: true,
        form: false,
      });
      const procuraAlbunsApi = await searchAlbumsAPI(pesquisa);
      let artistaDigitado = pesquisa;
      if (procuraAlbunsApi.length === 0) {
        artistaDigitado = ''; // se nao digitar nada no input retorna string vazia(para n quebrar codigo)
      }
      // DEPOIS DA Api ser renderizada '
      this.setState({
        form: true,
        albums: procuraAlbunsApi, // o novo estado de albuns será o nome do album/coisa digitado no input
        loading: false,
        ApiOk: true, //  vai estar acontecendo a requisição
        artistaName: artistaDigitado, // é o valor do input depositado
        pesquisa: '',
      });
    };

  lidacomForm = () => {
    const { pesquisa } = this.state;
    return (
      //  <Search />
      <form>
        <label htmlFor="cantor-input">
          <input
            data-testid="search-artist-input"
            type="text"
            name="name"
            value={ pesquisa }
            id="cantor-input"
            placehulder="Nome do Artista"
            onChange={ this.lidaBotao }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          name="botao"
          id="botao"
          disabled={ pesquisa.length < number2 }
          onClick={ this.lidaClickBotao }
        >
          Buscar
        </button>
      </form>
    );
  }

  lidaComApi = () => {
    const { artistaName, ApiOk } = this.state;
    if (ApiOk) { // se api for === true -----   &&
      if (artistaName !== '') { // verifica se oq ta na barra de pesquisa é diferente de string vazia
        return (
          <p>{`Resultado de álbuns de: ${artistaName}`}</p>
        );
      }
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
  }

  lidaComAlbuns = () => {
    const { albums } = this.state;
    return (
      <ul>
        {albums.map((album) => (
          <li key={ album.collectionId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
              />
            </Link>
            <h3>
              {album.collectionName}
            </h3>
            <h5>
              {album.artistName}
            </h5>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { form, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* se o estado de form for true aparece o form, caso não ele some retornando nada(null) / */}
        {form ? this.lidacomForm() : null}
        {loading ? <Loading /> : this.lidacomForm}
        {this.lidaComApi()}
        {this.lidaComAlbuns()}
      </div>

    );
  }
}
