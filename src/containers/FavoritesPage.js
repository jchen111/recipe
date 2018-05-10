import React, { Component } from 'react';
import wrapActionCreators from '../utils/wrapActionCreators';
import * as listingActions from '../actions/listingsActions';
import GridItem from '../components/GridItem';
import styles from '../style/grid.scss';
import { connect } from 'react-redux';

@connect(state => ({
  savedListingEntries: state.listings.savedListingEntries
}), wrapActionCreators(listingActions))
export default class FavoritesPage extends Component {

  componentDidMount() {
    console.log("this.props", this.props);
  }

  render() {
    const savedListingEntries = this.props.savedListingEntries;
    return (
      <div className={styles.gridContainer}>
        {
          savedListingEntries.map((listing) => {
            let listingEntry = {
              ...listing
            };
            let post = {listing, key: listing.image_url};
            return (<GridItem {...post} key={listing.image_url}/>);
          })
        }
      </div>
    );
  }
}
