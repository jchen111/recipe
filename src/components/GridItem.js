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

  render() {
    const { f2f_url, image_url, publisher, publisher_url, recipe_id, social_rank, source_url, title, nextPageToLoad, searchQuery } = this.props;
    if(nextPageToLoad != null) {
      return (
        <div className={ styles.gridItem }>
          <div className={styles.info}>
            <label className={styles.more} onClick={this.loadMore}>See more recipes for {searchQuery}...</label>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={ this.getGridItemType(title.length) }>
          <a href={source_url}><img src={image_url} onLoad={this.onImageLoad}/></a>
          <div className={styles.info}>
            <label>{title}</label>
          </div>
        </div>
      );
   }
  }
}
