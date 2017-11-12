import React, { Component } from 'react';
import { arrayOf, string, func, shape } from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    data: arrayOf(shape({
      item: string,
      value: string,
    })).isRequired,
    label: string,
    onChange: func.isRequired,
  }
  static defaultProps = {
    label: '',
  }
  constructor({ onChange }) {
    super();
    this.selected = new Set();
    this.onChange = onChange;
  }
  changeHandler = (e) => {
    if (this.selected.has(e.target.value)) {
      this.selected.delete(e.target.value);
    }
    else {
      this.selected.add(e.target.value);
    }
    this.onChange(this.selected);
  }
  render() {
    const { label, data } = this.props;
    return [
      label !== '' ? <label key={`select-label-${label}`} htmlFor={`select-${label}`}>{label}</label> : '',
      <select key={`select-${label || 'select'}`} multiple size="7" onChange={this.changeHandler} value={Array.from(this.selected)}>
        {data.map(({ value, item }) => (
          <option key={`${item}-${value}`} value={value}>{item}</option>
        ))}
      </select>,
    ];
  }
}
