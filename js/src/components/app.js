import React, { Component } from 'react';
import qs from 'qs';

import Loading from './helpers/loading';
import { Severity, Type } from './filters';
import Table from './table';

const request = require('superagent');

const dblog = `${window.location.origin}${drupalSettings.path.baseUrl}/admin/reports/dblog/rest`;

export default class App extends Component {
  state = {
    data: {},
    loaded: false,
    buttonDisabled: false,
    page: 0,
    filterParams: {
      _format: 'json',
      sort_by: 'wid',
    },
  }
  componentDidMount() {
    this.fetchLogEntries(this.state.page);
  }
  fetchLogEntries = (page) => {
    const queryString = qs.stringify(
      { ...this.state.filterParams, page: this.state.page },
      { arrayFormat: 'brackets', encode: false },
    );
    this.setState({ buttonDisabled: true }, () => {
      request
        .get(`${dblog}?${queryString}`)
        .end((err, { body }) => this.setState({
          data: body,
          page,
          loaded: true,
          buttonDisabled: false,
        }));
    });
  }
  sortHandler = (sort, order) => {
    this.setState({
      filterParams: Object.assign(this.state.filterParams, { sort_by: `${sort}_${order}` }),
    }, () => this.fetchLogEntries(this.state.page));
  }
  typeFilterHandler = (typeFilters) => {
    this.setState({
      filterParams: Object.assign(this.state.filterParams, { type: Array.from(typeFilters) }),
    }, () => {
      this.fetchLogEntries(this.state.page);
    });
  }
  severityFilterHandler = (severity) => {
    this.setState({
      filterParams: Object.assign(this.state.filterParams, { severity: Array.from(severity) }),
    }, () => {
      this.fetchLogEntries(this.state.page);
    });
  }
  nextPageHandler = (e) => {
    e.preventDefault();
    this.fetchLogEntries(this.state.page + 1);
  }
  previousPageHandler = (e) => {
    e.preventDefault();
    if (this.state.page === 0) {
      return;
    }
    this.fetchLogEntries(this.state.page - 1);
  }
  render() {
    return (
      <div className="admin-dblog">
        {this.state.loaded ? [
          <p>The Database Logging module logs system events in the Drupal database. Monitor your site or debug site problems on this page.</p>,
          <div className="form--inline clearfix">
            <div className="js-form-item form-item js-form-type-select form-type-select js-form-item-type form-item-type">
              <Type
                typeFilterHandler={this.typeFilterHandler}
                filters={new Set(this.state.filterParams.type)}
              />
            </div>
            <div className="js-form-item form-item js-form-type-select form-type-select js-form-item-severity form-item-severity">
              <Severity
                severityFilterHandler={this.severityFilterHandler}
                severity={new Set(this.state.filterParams.severity)}
              />
            </div>
          </div>,
          <Table
            entries={this.state.data}
            sortHandler={this.sortHandler}
          />] : <Loading />}
        <p>
          <button
            disabled={this.state.buttonDisabled || this.state.page === 0}
            data-destinationPage={this.state.page - 1}
            onClick={this.previousPageHandler}
          >
            Previous
          </button>
          <button
            disabled={this.state.buttonDisabled}
            data-destinationPage={this.state.page + 1}
            onClick={this.nextPageHandler}
          >
            Next
          </button>
        </p>
      </div>
    );
  }
}
