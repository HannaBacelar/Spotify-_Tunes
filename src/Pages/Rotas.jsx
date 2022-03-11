import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Album from './Album';
import Favorites from './Favorites';
import ProfileEdit from './ProfileEdit';
import Profile from './Profile';
import NotFound from './NotFound';
import Search from './Search';

class Rotas extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
export default Rotas;
