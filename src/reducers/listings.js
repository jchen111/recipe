import { handleActions } from 'redux-actions';
import * as types from '../actions/actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

const initialState = Immutable({
  listingEntries: undefined,
  searchQuery: undefined,
  nextPageToLoad: 1,
  isEnd: false,
  savedListingEntries: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LISTINGS_FETCHED:
      if(state.listingEntries != null) {
        return state.merge({
          listingEntries: [...state.listingEntries, ...action.newstate.listingEntries],
          nextPageToLoad: state.nextPageToLoad + 1,
          searchQuery: action.newstate.searchQuery,
          isEnd: action.newstate.isEnd
        });
      }
      return state.merge({
        listingEntries: [...action.newstate.listingEntries],
        nextPageToLoad: state.nextPageToLoad + 1,
        searchQuery: action.newstate.searchQuery,
        isEnd: action.newstate.isEnd
      });
      break;
    case types.SEARCH_QUERY_SUBMITTED:
      return state.merge({
        listingEntries: undefined,
        nextPageToLoad: 1,
        searchQuery: action.newstate != null ? action.newstate.searchQuery : null,
        isEnd: false
      });
      break;
    case types.SAVE_LISTING:
      return state.merge({
        listingEntries: action.newstate.listingEntries,
        savedListingEntries: action.newstate.savedListingEntries,
      });
      break;
    default:
      return state;
  }
}
