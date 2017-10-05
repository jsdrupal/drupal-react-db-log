import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LogEntriesTable extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      timestamp: PropTypes.string,
      message: PropTypes.string,
      user: PropTypes.string,
      wid: PropTypes.string,
    })).isRequired,
    order: PropTypes.string,
  }
  static defaultProps = {
    order: 'asc',
  }
  constructor({ entries, sortHandler, order }) {
    super();
    this.state = { entries, order };
    this.sortHandler = sortHandler;
  }
  state = {}
  componentWillReceiveProps({ entries }) {
    if (JSON.stringify(this.state.entries) !== JSON.stringify(entries)) {
      this.setState({ entries, order: (this.state.order === 'desc' && 'asc') || 'desc' });
    }
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              <a
                href={`?sort_by=type_${this.state.order}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('type', this.state.order);
                }}
                title="sort by Type"
              >
                Type
              </a>
            </th>
            <th>
              <a
                href={`?sort_by=timestamp_${this.state.order}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('timestamp', this.state.order);
                }}
                title="sort by Date"
              >
                Date
              </a>
            </th>
            <th>Message</th>
            <th>
              <a
                href={`?order=name_${this.state.order}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('name', this.state.order);
                }}
                title="sort by User"
              >
                User
              </a>
            </th>
            <th >Operations</th>
          </tr>
        </thead>
        <tbody>
          {this.state.entries.map(entry => (
            <tr>
              <td>{entry.type}</td>
              <td>{entry.timestamp}</td>
              <td><a href={`/admin/reports/dblog/event/${entry.wid}`}>{`${entry.message.substring(0, 54)}...`}</a></td>
              <td>{entry.user}</td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
