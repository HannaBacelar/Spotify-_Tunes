import React from 'react';
import Header from './Header';

const INITIAL_STATE = {
  name: '',
  procurar: true,
};

class Search extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  verificaBotao = (event) => {
    const number2 = 2;

    this.setState(() => ({
      // name: event.target.value,
      procurar: event.target.value.length < number2,

    }));
  }

  render() {
    const { procurar } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <label htmlFor="cantor-input">
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              id="cantor-input"
              onChange={ this.verificaBotao }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            name="procurar"
            id="procurar"
            disabled={ procurar }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
