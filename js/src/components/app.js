import React, { Component } from 'react';
import qs from 'qs';
import request from 'superagent';

import Loading from './helpers/loading';
import { Select, Table } from './elements';

const dblogEndpointUrl = `${window.location.origin}${drupalSettings.path.baseUrl}/admin/reports/dblog/rest`;

export default class App extends Component {
  state = {
    data: [],
    loaded: false,
    buttonDisabled: false,
    page: 0,
    order: 'desc',
    sortBy: 'wid',
    filterParams: {
      _format: 'json',
      sort_by: 'wid',
      type: [],
      severity: [],
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
        .get(`${dblogEndpointUrl}?${queryString}`)
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
      order: (order === 'desc' && 'asc') || 'desc',
      sortBy: sort,
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
    this.setState((prevState) => ({
      page: prevState.page + 1
    }), () => {
      this.fetchLogEntries(this.state.page);
    });
  }
  previousPageHandler = (e) => {
    e.preventDefault();
    if (this.state.page === 0) {
      return;
    }
    this.setState((prevState) => ({
      page: prevState.page - 1
    }), () => {
      this.fetchLogEntries(this.state.page);
    });
  }
  render() {
    return (
      <div className="admin-dblog">
        {this.state.loaded ? [
          <p key="message">The Database Logging module logs system events in the Drupal database. Monitor your site or debug site problems on this page.</p>,
          <div key="filters" className="form--inline clearfix">
            <div className="js-form-item form-item js-form-type-select form-type-select js-form-item-type form-item-type">
              <Select
                key="select-type"
                onChange={this.typeFilterHandler}
                selected={this.state.filterParams.type}
                label="Type"
                data={[
                  { value: 'access+denied', item: 'access denied' },
                  { value: 'cron', item: 'cron' },
                  { value: 'form', item: 'form' },
                  { value: 'page+not+found', item: 'page not found' },
                  { value: 'php', item: 'php' },
                  { value: 'system', item: 'system' },
                  { value: 'user', item: 'user' },
                ]}
              />
            </div>
            <div className="js-form-item form-item js-form-type-select form-type-select js-form-item-severity form-item-severity">
              <Select
                key="select-severity"
                onChange={this.severityFilterHandler}
                selected={this.state.filterParams.severity}
                label="Severity"
                data={[
                  { value: '0', item: 'Emergency' },
                  { value: '1', item: 'Alert' },
                  { value: '2', item: 'Critical' },
                  { value: '3', item: 'Error' },
                  { value: '4', item: 'Warning' },
                  { value: '5', item: 'Notice' },
                  { value: '6', item: 'Info' },
                  { value: '7', item: 'Debug' },
                ]}
              />
            </div>
          </div>,
          <Table
            key="logTable"
            order={this.state.order}
            sortBy={this.state.sortBy}
            header={[
              { txt: '' },
              { txt: 'Type', callback: this.sortHandler, sort: 'type' },
              { txt: 'Date', callback: this.sortHandler, sort: 'timestamp' },
              { txt: 'Message' },
              { txt: 'User', callback: this.sortHandler, sort: 'name' },
              { txt: 'Operations' },
            ]}
            entries={this.state.data}
          />] : <Loading />}
        <p>
          <button
            disabled={this.state.buttonDisabled || this.state.page === 0}
            onClick={this.previousPageHandler}
          >
            Previous
          </button>
          <button
            disabled={this.state.buttonDisabled}
            onClick={this.nextPageHandler}
          >
            Next
          </button>
        </p>
      </div>
    );
  }
}
