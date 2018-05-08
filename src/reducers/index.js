import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import listings from './listings';

const rootReducer = combineReducers({
  listings,
  routing,
  form,
});

export default rootReducer;
