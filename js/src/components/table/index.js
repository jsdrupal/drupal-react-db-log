import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './tableHeader';

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
            <tr className={`${entry.type} ${entry.severity}`}>
              <td className="icon" />
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
