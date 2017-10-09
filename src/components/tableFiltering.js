import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class TableFiltering extends Component {
  constructor({ typeFilterHandler }) {
    super();
    this.typeFilterHandler = typeFilterHandler;
  }
  state = {
    typeFilters: [],
  }
  filterChangeHandler = (e) => {
    this.setState({
      typeFilters: [e.target.value]
        .filter(val => this.state.typeFilters.indexOf(val) === -1)
        .concat(this.state.typeFilters.filter(val => [e.target.value].indexOf(val) === -1)),
    }, () => {
      this.typeFilterHandler(this.state.typeFilters);
    });
  }
  render() {
    return (
      <select multiple="multiple" size="7" onChange={this.filterChangeHandler} value={this.state.typeFilters}>
        <option value="access+denied">access denied</option>
        <option value="cron">cron</option>
        <option value="form">form</option>
        <option value="page+not+found">page not found</option>
        <option value="php">php</option>
        <option value="system">system</option>
        <option value="user">user</option>
      </select>
    );
  }
}
