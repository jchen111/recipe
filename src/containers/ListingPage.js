import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridView from '../components/GridView';
import SearchForm from '../components/SearchForm';
import * as listingActions from '../actions/listingsActions';
import wrapActionCreators from '../utils/wrapActionCreators';
import topBarStyle from '../style/topbar.scss';
import autoBind from 'react-autobind';
import { createHashHistory } from 'history';

const history = createHashHistory();

@connect(state => ({
  listings: state.listings
}), wrapActionCreators(listingActions))
export default class ListingPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  submit(values) {
    this.props.refetchListingsOnQuerySubmit(values.textSearchQuery);
  }

  toFavoritesPage() {
    history.push('/favorites');
  }

  render() {
    const count = this.props.listings.savedListingEntries.length;
    return (
      <div>
        <div className={topBarStyle.container}>
          <SearchForm onSubmit={this.submit}/>
          <button className={topBarStyle.favorites} onClick={this.toFavoritesPage}>Added {count} favorites</button>
        </div>
        <GridView listings={this.props.listings}/>
      </div>
    );
  }
}
