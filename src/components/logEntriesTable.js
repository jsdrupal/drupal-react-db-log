import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const TableHeader = ({ sortHandler, order }) => (
  <thead>
    <tr>
      <th>
        <a
          href={`?sort_by=type_${order}`}
          onClick={(e) => {
            e.preventDefault();
            sortHandler('type', order);
          }}
          title="sort by Type"
        >
          Type
        </a>
      </th>
      <th>
        <a
          href={`?sort_by=timestamp_${order}`}
          onClick={(e) => {
            e.preventDefault();
            sortHandler('timestamp', order);
          }}
          title="sort by Date"
        >
          Date
        </a>
      </th>
      <th>Message</th>
      <th>
        <a
          href={`?order=name_${order}`}
          onClick={(e) => {
            e.preventDefault();
            sortHandler('name', order);
          }}
          title="sort by User"
        >
          User
        </a>
      </th>
      <th >Operations</th>
    </tr>
  </thead>
);

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
        <TableHeader
          sortHandler={this.sortHandler}
          order={this.state.order}
        />
        <tbody>
          {this.state.entries.map(entry => (
            <tr>
              <td>{entry.type}</td>
              <td>{moment.unix(entry.timestamp).format('MM/DD/YYYY - HH:mm')}</td>
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
