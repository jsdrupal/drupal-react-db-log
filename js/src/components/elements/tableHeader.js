import React from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

const onClickSort = (entry, order) => (e) => {
  e.preventDefault();
  entry.callback(entry.sort, order);
};

const tableSortIndicator = (entry, order, sortBy) => {
  if (sortBy && entry.sort === sortBy) {
    return (
      <span className={`tablesort tablesort--${order}`}>
        <span className="visually-hidden">
          Sort descending
        </span>
      </span>
    )
  }
};

const TableHeader = ({ headerEntries, order, sortBy }) => (
  <thead>
    <tr>
      {
        headerEntries.map(entry => (
          <th key={`$txt-${entry.txt}`}>
            {(entry.callback ? (
              <a
                href={`?sort_by=${entry.sort}`}
                onClick={onClickSort(entry, order)}
                title={`Sort by ${entry.txt}`}
              >
                {entry.txt}
                {tableSortIndicator(entry, order, sortBy)}
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
  sortBy: string.isRequired,
};

export default TableHeader;
