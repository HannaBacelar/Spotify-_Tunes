import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  loding: false,
  checked: [],
};

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  async componentDidMount() {
    this.listaFavorita();
  }

 favoritaMusicas = async (event) => {
   const { songs } = this.props;
   const musica = songs.find((som) => som.trackId === +event.target.value); // procura pela musica especifica que tenha o Id === o da msc favoritada e passa o evento ao checkbox
   this.setState((estadoAnterior) => ({
     loading: true,
     checked: [...estadoAnterior.checked, musica.trackId], // ADICONA O ID DA MUSICA // pega o valor do checked e adiciona um valor(id) novo
   }));
   await addSong(musica);
   this.setState({
     loading: false,
   });
 }

 listaFavorita = async () => {
   const lista = await getFavoriteSongs();
   const pegaId = lista.map((id) => id.trackId);
   this.setState({
     checked: pegaId,
   });
 }

 render() {
   const { songs } = this.props;
   const { loading, checked } = this.state;
   return (
     <div>
       { loading
         ? <Loading />
         : songs.map((song) => ( // map retorna cada som (junto com seu nome)
           <div key={ song.trackName }>
             <p>
               { song.trackName }
             </p>
             <audio data-testid="audio-component" src={ song.previewUrl } controls>
               <track kind="captions" />
               O seu navegador não suporta o elemento
               <code>audio</code>
             </audio>
             <label htmlFor="favotitas">
               Favotita
               <input
                 data-testid={ `checkbox-music-${song.trackId}` }
                 type="checkbox"
                 name="favotita"
                 id="favorita"
                 value={ song.trackId }
                 onClick={ this.favoritaMusicas }
                 checked={ checked.some((id) => id === song.trackId) } // verifica se a msc tem um id
               />
             </label>
           </div>
         ))}
     </div>
   );
 }
}
MusicCard.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default MusicCard;
