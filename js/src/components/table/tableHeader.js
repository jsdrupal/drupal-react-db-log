import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ sortHandler, order }) => (
  <thead>
    <tr>
      <th />
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

TableHeader.propTypes = {
  sortHandler: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
};

export default TableHeader;
