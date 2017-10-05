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
    sort: PropTypes.string,
  }
  static defaultProps = {
    sort: 'desc',
  }
  constructor({ entries, sortHandler, sort }) {
    super();
    this.state = { entries, sort };
    this.sortHandler = sortHandler;
  }
  state = {}
  componentWillReceiveProps({ entries, sort }) {
    // @TODO - handle this better
    if (JSON.stringify(this.state.entries) !== JSON.stringify(entries)) {
      this.setState({ entries, sort: sort === 'desc' ? 'asc' : 'desc' });
    }
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              <a
                href={`?order=type&sort=${this.state.sort}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('type', this.state.sort);
                }}
                title="sort by Type"
              >
                Type
              </a>
            </th>
            <th>
              <a
                href={`?order=timestamp&sort=${this.state.sort}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('timestamp', this.state.sort);
                }}
                title="sort by Date"
              >
                Date
              </a>
            </th>
            <th>Message</th>
            <th>
              <a
                href={`?order=name&sort=${this.state.sort}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.sortHandler('name', this.state.sort);
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
