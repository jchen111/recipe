import React from 'react';
import {
    HashRouter,
    Route
} from 'react-router-dom';
import ListingPage from '../containers/ListingPage';
import FavoritesPage from '../containers/FavoritesPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <HashRouter>
    <div>
      <Route exact path="/" component={ListingPage} />
      <Route path="/favorites" component={FavoritesPage} />
    </div>
  </HashRouter>
);
