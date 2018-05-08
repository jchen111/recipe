import { handleActions } from 'redux-actions';
import * as types from '../actions/actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  listingEntries: undefined,
  searchQuery: undefined,
  numberOfPageToLoad: 1
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LISTINGS_FETCHED:
      if(state.listingEntries != null) {
        return state.merge({
          listingEntries: [...state.listingEntries, ...action.newstate.listingEntries],
          numberOfPageToLoad: state.numberOfPageToLoad + 1,
          searchQuery: action.newstate.searchQuery
        });
      }
      return state.merge({
        listingEntries: [...action.newstate.listingEntries],
        numberOfPageToLoad: state.numberOfPageToLoad + 1,
        searchQuery: action.newstate.searchQuery
      });
    case types.SEARCH_QUERY_SUBMITTED:
      return state.merge({
        listingEntries: undefined,
        numberOfPageToLoad: 1,
        searchQuery: action.newstate != null ? action.newstate.searchQuery : null
      });
    default:
      return state;
  }
}
