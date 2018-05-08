import React from 'react';
import {
    HashRouter,
    Route
} from 'react-router-dom';
import ListingPage from '../containers/ListingPage';
import ProductDetailPage from '../containers/ProductDetailPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <HashRouter>
    <div>
      <Route exact path="/" component={ListingPage} />
      <Route path="/product-detail/:title" component={ProductDetailPage} />
    </div>
  </HashRouter>
);
