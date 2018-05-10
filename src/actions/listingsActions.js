import { createAction } from 'redux-actions';
import food2ForkService from '../services/food2fork';
import edamamService from '../services/edamam';
import * as actionTypes from './actionTypes';
import { Router, Redirect, Route, Link, browserHistory, IndexRoute, useRouterHistory, RouterContext, hashHistory } from 'react-router';

export function fetchListings() {
  return async(dispatch, getState) => {
    try {
      const state = getState();
      let searchQuery = state.form.SearchForm.values != null ? state.form.SearchForm.values.textSearchQuery: null;
      let entries = [];
      let food2forkListingEntries = [];
      let edamamListingEntries = [];
      let isEnd = false;
      if(searchQuery != null) {
        food2forkListingEntries = await food2ForkService.getRecipesByQuery(searchQuery, 'r', state.listings.nextPageToLoad);
        edamamListingEntries = await edamamService.getRecipesByQuery(searchQuery, null, state.listings.nextPageToLoad);
      } else {
        food2forkListingEntries = await food2ForkService.getRecipesByQuery(searchQuery, 'r', state.listings.nextPageToLoad);
      }
      entries = [...food2forkListingEntries, ...edamamListingEntries];
      if(entries.length == 0) {
        isEnd = true;
      }
      dispatch({ type: actionTypes.LISTINGS_FETCHED, newstate: { listingEntries: entries, searchQuery, isEnd }});
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

export function saveListing(listingEntry) {
  return async(dispatch, getState) => {
    try {
      const state = getState();
      if(state.listings.savedListingEntries.find(l => l.image_url == listingEntry.image_url) == null) {
        let index = state.listings.listingEntries.findIndex(x => x.image_url == listingEntry.image_url);
        let newEntry = {
          ...state.listings.listingEntries[index]
        };
        newEntry.saved = true;
        dispatch({ type: actionTypes.SAVE_LISTING, newstate: {listingEntries: [...state.listings.listingEntries.slice(0,index), newEntry, ...state.listings.listingEntries.slice(index + 1, state.listings.listingEntries.length)], savedListingEntries: [...state.listings.savedListingEntries, newEntry]} });
      }
    } catch(error) {
      console.error(error);
    }
  }
}

export function unSaveListing(listingEntry) {
  return async(dispatch, getState) => {
    try {
      const state = getState();
      let index = state.listings.listingEntries.findIndex(x => x.image_url == listingEntry.image_url);
      let newEntry = {
        ...state.listings.listingEntries[index]
      };
      newEntry.saved = false;
      let savedIndex = state.listings.savedListingEntries.findIndex(x => x.image_url == listingEntry.image_url);

      dispatch({ type: actionTypes.SAVE_LISTING, newstate: {listingEntries: [...state.listings.listingEntries.slice(0,index), newEntry, ...state.listings.listingEntries.slice(index + 1, state.listings.listingEntries.length)], savedListingEntries: [...state.listings.savedListingEntries.slice(0, savedIndex), ...state.listings.savedListingEntries.slice(savedIndex + 1, state.listings.savedListingEntries.length)]} });
    } catch(error) {
      console.error(error);
    }
  }
}
