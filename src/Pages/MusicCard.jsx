import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs } = this.props;
    return (
      <div>
        {
          songs.map((song) => ( // map retorna cada som (junto com seu nome)
            <div key={ song.trackName }>
              <p>
                { song.trackName }
              </p>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          ))
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default MusicCard;
