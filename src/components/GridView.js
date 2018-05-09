import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import * as listingActions from '../actions/listingsActions';
import _ from 'lodash';
import styles from '../style/grid.scss';
import loaderStyle from '../style/loader.scss';
import GridItem from './GridItem';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';

@cssModules(styles)
@connect(state => ({}), wrapActionCreators(listingActions))
export default class GridView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderLoading() {
    return (
      <div className={loaderStyle.loader}><span></span></div>
    );
  }

  render() {
    const { listingEntries, nextPageToLoad, searchQuery, isEnd } = this.props.listings;
    const lastPost = {nextPageToLoad, searchQuery, isEnd};
    if(listingEntries == null) {
      this.props.fetchListings();
    }

    if(listingEntries == null) {
      return this.renderLoading();
    }

    return (
      <div className={styles.gridContainer}>
        {
          listingEntries.map((listing) => {
            let listingEntry = {
              ...listing
            };
            let post = {listing, isEnd, key: listing.image_url};
            return (<GridItem {...post} key={listing.image_url}/>);
          })
        }
        <GridItem {...lastPost}/>
      </div>
    );
  }
}
