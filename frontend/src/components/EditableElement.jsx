import React, { Component } from "react";
import { 
  MDBRow,
  MDBCol
} from 'mdbreact';
import SelectField from './selectField';

class EditableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      name: this.props.name,
      label: this.props.label,
      field_type: this.props.field_type,
      options: this.props.options !== undefined ? this.props.options : null,
      unit: this.props.unit
    }
    this.handleInputChange = this.props.onChange.bind();
  }

  prepareField() {
    if(this.state.field_type === "text")
      return <input style={{'maxWidth': '80px'}} required onChange={this.handleInputChange} defaultValue={this.state.value} name={this.state.name} id={this.state.label} type="text" onChange={this.handleInputChange} required/>;
    if(this.state.field_type === "select")
      return <SelectField onChange={this.handleInputChange} name={this.state.name} options={this.state.options} value={this.state.value}/>
  }
  
  render() {
    return(
      <>
        <hr className='mb-2'/>
        <MDBRow>
          <MDBCol className="mx-auto"><strong>{this.state.label[0].toUpperCase()+this.state.label.slice(1)}</strong></MDBCol>
          <MDBCol>{this.prepareField()} {this.state.unit}</MDBCol>
        </MDBRow>
      </>
    );
  }
}

  export default EditableElement;