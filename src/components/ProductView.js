import React, { Component } from 'react';
import autoBind from 'react-autobind';
import styles from '../style/productview.scss'

export default class ProductView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {title, description, url} = this.props;
    return (
      <div className={styles.productView}>
        <h3>{title}</h3>
        <label>{description}</label>
      </div>
    );
  }
}
