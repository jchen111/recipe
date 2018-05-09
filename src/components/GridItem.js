import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import styles from '../style/grid.scss'
import * as listingActions from '../actions/listingsActions';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';

@cssModules(styles)
@connect(state => ({}), wrapActionCreators(listingActions))
export default class GridItem extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  getGridItemType(size) {
    const tallGridItemTypeThreshold = 80;
    if(size > tallGridItemTypeThreshold) {
      return styles.tallGridItem;
    }
    return styles.gridItem;
  }

  loadMore() {
    this.props.fetchListings();
  }

  saveListing() {
    this.props.saveListing(this.props.listing);
  }

  render() {
    const { listing, nextPageToLoad, searchQuery, isEnd } = this.props;
    const saveStatusLabel = listing != null && listing.saved ? 'Saved' : 'Save it!';
    if(isEnd && listing == null) {
      return (
        <div className={ styles.gridItem }>
          <div className={styles.info}>
            <label className={styles.more}>Sorry, no more results for {searchQuery}</label>
          </div>
        </div>
      );
    } else if(listing != null && listing.image_url != null) {
      return (
        <div
          className={ this.getGridItemType(listing.title.length) }>
          <a href={listing.source_url}><img src={listing.image_url}/></a>
          <div className={styles.info}>
            <label>{listing.title}</label>
            <button className={styles.saveButton} onClick={this.saveListing}>{saveStatusLabel}</button>
          </div>
        </div>
      );
   } else {
     return (
       <div className={ styles.gridItem }>
         <div className={styles.info}>
           <label className={styles.more} onClick={this.loadMore}>See more recipes for {searchQuery}...</label>
         </div>
       </div>
     );
   }
  }
}
