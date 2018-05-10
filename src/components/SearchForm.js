import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from '../style/searchBar.scss';
import autoBind from 'react-autobind';
import * as listingActions from '../actions/listingsActions';
import wrapActionCreators from '../utils/wrapActionCreators';
import { Field, reduxForm } from 'redux-form';

@cssModules(styles)
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
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
    );
  }
}

export default reduxForm({
  form: 'SearchForm', // a unique identifier for this form
})(SearchForm);
