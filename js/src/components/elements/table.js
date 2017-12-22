import React from 'react';
import { arrayOf, string, shape, func, array } from 'prop-types';

import TableHeader from './tableHeader';

const Table = ({ entries, header, order }) => (
  <table>
    <TableHeader headerEntries={header} order={order} />
    <tbody>
      {entries.map(entry => (
        <tr className={`${entry.rowClasses.join(' ')}`} key={entry.rowKey}>
          {entry.rowData.map((tableRowItem) => {
            if (tableRowItem === '') {
              return (<td />);
            }
            if (tableRowItem instanceof Object) {
              return (<td>
                <a href={tableRowItem.href}>{tableRowItem.text}</a>
              </td>);
            }
            return (<td>{tableRowItem}</td>);
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  entries: array.isRequired,
  header: arrayOf(shape({
    txt: string.isRequired,
    callback: func,
  })).isRequired,
  order: string.isRequired,
};

export default Table;
