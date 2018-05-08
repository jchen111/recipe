import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridView from '../components/GridView';
import SearchForm from '../components/SearchForm';
import { Values } from "redux-form-website-template";
import * as listingActions from '../actions/listingsActions';
import * as listingsSelectors from '../reducers/listings';
import wrapActionCreators from '../utils/wrapActionCreators';
import loaderStyle from '../style/loader.scss';
import autoBind from 'react-autobind';

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

  render() {
    return (
      <div>
        <SearchForm onSubmit={this.submit}/>
        <GridView listings={this.props.listings}/>
      </div>
    );
  }
}
