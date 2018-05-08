import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from '../style/searchBar.scss';
import autoBind from 'react-autobind';
import * as listingActions from '../actions/listingsActions';
import { connect } from 'react-redux';
import wrapActionCreators from '../utils/wrapActionCreators';
import { Field, reduxForm } from 'redux-form';
import MdSearch from 'react-icons/lib/md/search';

@cssModules(styles)
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div>
            <Field
              name="textSearchQuery"
              component="input"
              type="search"
              placeholder="Search for recipes..."
            />
            <button type="submit" className={styles.searchButton}>Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchForm', // a unique identifier for this form
})(SearchForm);
