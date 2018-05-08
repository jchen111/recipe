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

  componentDidMount() {
    this.props.fetchListings();
  }

  renderLoading() {
    return (
      <div className={loaderStyle.loader}><span></span></div>
    );
  }

  renderEmpty() {
    return (
      <div className={styles.empty}><h2>Oops...we don&apos;t have any recipes for it yet.</h2></div>
    );
  }

  render() {
    const { listingEntries, numberOfPageToLoad, searchQuery } = this.props.listings;
    if(searchQuery != null && listingEntries == null) {
      this.props.fetchListings();
    }

    if(listingEntries == null) {
      return this.renderLoading();
    }

    if(listingEntries.length == 0) {
      return this.renderEmpty();
    }

    return (
      <div className={styles.gridContainer}>
        {
          listingEntries.map((listing) => {
            let listingEntry = {
              ...listing,
              key: listing.recipe_id
            };
            return (<GridItem {...listingEntry}/>);
          })
        }
        <GridItem nextPageToLoad={numberOfPageToLoad} searchQuery={searchQuery}/>
      </div>
    );
  }
}
