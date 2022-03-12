import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

const INITIAL_STATE = {
  albumId: [], // estado de cada album //
  allMusics: [],
};

class Album extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  async componentDidMount() {
    const { match } = this.props; // desestrutura baseado no que está nos componentes do console
    const { id } = match.params;

    const musicas = await getMusics(id);
    const allMusics = musicas.filter((_musica, index) => index !== 0); // underline ignora primeira param, filter retorna
    this.setState({
      albumId: musicas[0], // a posição 0 é informoes referente ao album e a segunda são as musicas
      allMusics,
    });
  }

  render() {
    const { albumId, allMusics } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <MusicCard songs={ allMusics } />
        <div>
          <h2 data-testid="artist-name">
            { albumId.artistName }
          </h2>
          <div>
            <h3 data-testid="album-name">
              { albumId.collectionName }
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
export default Album;
