import React, { Component } from 'react';

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
        options: this.makeOptions(),
        value: this.props.value,
        name: this.props.name
    };
    this.handleInputChange = this.props.onChange.bind();
  }
  
  makeOptions = () => {
    let tmp = [];
    for(var key in this.props.options)
        tmp.push({value: this.props.options[key], label: key});
    return tmp;
  }

  renderOptions = () => {
    let tmp = [];
    this.state.options.forEach((o) => {
        tmp.push(<option value={o.value}>{o.label}</option>);
    })
    return tmp;
  }

  render() {
    return (
        <select 
        required name={this.state.name} 
        defaultValue={this.state.value}  
        onFocus={this.handleInputChange} 
        onChange={this.handleInputChange} 
        className="browser-default">
            {this.renderOptions()}
        </select>
    );
  }
}

export default SelectField;