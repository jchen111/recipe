import { createAction } from 'redux-actions';
import food2ForkService from '../services/food2fork';
import edamamService from '../services/edamam';
import * as listingsSelectors from '../reducers/listings';
import * as actionTypes from './actionTypes';
import { Router, Redirect, Route, Link, browserHistory, IndexRoute, useRouterHistory, RouterContext, hashHistory } from 'react-router';
import { createHashHistory } from 'history';

const history = createHashHistory()

export function fetchListings() {
  return async(dispatch, getState) => {
    try {
      const state = getState();
      let searchQuery = state.form.SearchForm.values != null ? state.form.SearchForm.values.textSearchQuery: null;
      let food2forkListingEntries = [];
      let edamamListingEntries = [];
      if(searchQuery != null) {
        food2forkListingEntries = await food2ForkService.getRecipesByQuery(searchQuery, 'r', state.listings.numberOfPageToLoad);
        edamamListingEntries = await edamamService.getRecipesByQuery(searchQuery, null, state.listings.numberOfPageToLoad);
      } else {
        food2forkListingEntries = await food2ForkService.getRecipesByQuery(searchQuery, 'r', state.listings.numberOfPageToLoad);
      }
      dispatch({ type: actionTypes.LISTINGS_FETCHED, newstate: { listingEntries: [...food2forkListingEntries, ...edamamListingEntries], searchQuery }});
    } catch (error) {
      console.error(error);
    }
  };
}

export function refetchListingsOnQuerySubmit(textSearchQuery) {
  return async(dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.SEARCH_QUERY_SUBMITTED, newstate: {searchQuery: textSearchQuery} });
    } catch(error) {
      console.error(error);
    }
  }
}
