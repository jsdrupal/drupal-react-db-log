import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

import TableHeader from './tableHeader';

const Table = ({ entries, header, order }) => (
  <table>
    <TableHeader headerEntries={header} order={order} />
    <tbody>
      {entries.map(entry => (
        <tr className={`${entry.type} ${entry.severity}`} key={entry.wid}>
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

Table.propTypes = {
  entries: arrayOf(shape({
    type: string,
    timestamp: string,
    message: string,
    user: string,
    wid: string,
  })).isRequired,
  header: arrayOf(shape({
    txt: string.isRequired,
    callback: func,
  })).isRequired,
  order: string.isRequired,
};

export default Table;
