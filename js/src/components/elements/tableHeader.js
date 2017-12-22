import React from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

const TableHeader = ({ headerEntries, order }) => (
  <thead>
    <tr>
      {
        headerEntries.map(entry => (
          <th key={`$txt-${entry.txt}`}>
            {(entry.callback ? (
              <a
                href={'?sort_by=timestamp'}
                onClick={(e) => {
                  e.preventDefault();
                  entry.callback(entry.sort, order);
                }}
                title={`Sort by ${entry.txt}`}
              >
                {entry.txt}
              </a>
            ) : (
              <span>{entry.txt}</span>
            ))}
          </th>
        ))
      }
    </tr>
  </thead>
);

TableHeader.propTypes = {
  headerEntries: arrayOf(shape({
    txt: string.isRequired,
    callback: func,
  })).isRequired,
  order: string.isRequired,
};

export default TableHeader;
