import React, { Component } from 'react';
import axios from 'axios';

import Loading from './helpers/loading';
import LogEntriesTable from './logEntriesTable';

const dblog = 'http://d8react.drupal.vm/admin/reports/dblog/rest';

export default class App extends Component {
  state = {
    data: {},
    loaded: false,
    buttonDisabled: false,
    page: 0,
    filterParams: {
      sort_by: 'wid',
    },
  }
  componentDidMount() {
    this.fetchLogEntries(this.state.page);
  }
  fetchLogEntries = (page) => {
    const additionalQueryOptions = Object.keys(this.state.filterParams)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.state.filterParams[k])}`)
      .join('&');
    this.setState({ buttonDisabled: true }, () => {
      axios.get(`${dblog}?page=${page || this.state.page}${additionalQueryOptions ? '&' + additionalQueryOptions : ''}`)
        .then(({ data }) => this.setState({ data, page, loaded: true, buttonDisabled: false }));
    });
  }
  sortHandler = (sort, order) => {
    this.setState({
      filterParams: Object.assign(this.state.filterParams, { sort_by: `${sort}_${order}` }),
    }, () => this.fetchLogEntries(this.state.page));
  }
  render() {
    return (
      <div>
        {this.state.loaded ? <LogEntriesTable
          entries={this.state.data}
          sortHandler={this.sortHandler}
        /> : <Loading />}
        <p>
          <button
            disabled={this.state.buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              if (this.state.page === 0) {
                return;
              }
              this.fetchLogEntries(this.state.page - 1);
            }}
          >
            Previous
          </button>
          <button
            disabled={this.state.buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              this.fetchLogEntries(this.state.page + 1);
            }}
          >
            Next
          </button>
        </p>
      </div>
    );
  }
}
