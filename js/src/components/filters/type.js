import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableFiltering extends Component {
  static propTypes = {
    typeFilterHandler: PropTypes.func.isRequired,
  }
  constructor({ typeFilterHandler, filters }) {
    super();
    this.typeFilterHandler = typeFilterHandler;
    this.filters = filters;
  }
  filterChangeHandler = (e) => {
    if (this.filters.has(e.target.value)) {
      this.filters.delete(e.target.value);
    }
    else {
      this.filters.add(e.target.value);
    }
    this.typeFilterHandler(this.filters);
  }
  render() {
    return [
      <label htmlFor="edit-type">Type</label>,
      <select multiple="multiple" size="7" onClick={this.filterChangeHandler} value={Array.from(this.filters)}>
        <option value="access+denied">access denied</option>
        <option value="cron">cron</option>
        <option value="form">form</option>
        <option value="page+not+found">page not found</option>
        <option value="php">php</option>
        <option value="system">system</option>
        <option value="user">user</option>
      </select>,
    ];
  }
}
