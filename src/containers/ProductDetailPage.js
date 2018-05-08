import React, { Component } from 'react';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as listingActions from '../actions/listingsActions';
import { connect } from 'react-redux';
import ProductView from '../components/ProductView';

@connect(state => ({
  productDetail: state.listings.selectedListing
}), wrapActionCreators(listingActions))
export default class ProductDetailPage extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
  }

  render() {
    const {title, description, url} = this.props.productDetail;
    return (
      <ProductView {...this.props.productDetail}/>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return state;
}
