import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}
export default Album;