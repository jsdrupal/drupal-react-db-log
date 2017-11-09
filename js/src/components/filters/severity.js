import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Severity extends Component {
  static propTypes = {
    severityFilterHandler: PropTypes.func.isRequired,
  }
  constructor({ severityFilterHandler, severity }) {
    super();
    this.typeFilterHandler = severityFilterHandler;
    this.severity = severity;
  }
  filterChangeHandler = (e) => {
    if (this.severity.has(e.target.value)) {
      this.severity.delete(e.target.value);
    }
    else {
      this.severity.add(e.target.value);
    }
    this.typeFilterHandler(this.severity);
  }
  render() {
    return [
      <label htmlFor="edit-severity">Severity</label>,
      <select multiple="multiple" size="7" onClick={this.filterChangeHandler} value={Array.from(this.severity)}>
        <option value="0">Emergency</option>
        <option value="1">Alert</option>
        <option value="2">Critical</option>
        <option value="3">Error</option>
        <option value="4">Warning</option>
        <option value="5">Notice</option>
        <option value="6">Info</option>
        <option value="7">Debug</option>
      </select>,
    ];
  }
}
