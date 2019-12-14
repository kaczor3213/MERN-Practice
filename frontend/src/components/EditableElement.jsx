import React, { Component } from "react";
import { 
  MDBRow,
  MDBCol
} from 'mdbreact';
import SelectField from './selectField';
import ValidationMessage from './validationMessage';

class EditableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error_present: this.props.error_present !== undefined ? this.state.error_present : false,
      error_message: this.props.error_message,
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

  prepareError() {
    console.log(this.props.error_present)
    if(this.props.error_present)
      return <MDBRow><ValidationMessage message={this.props.error_message}/></MDBRow>
    else
      return null;
  }
  
  render() {
    return(
      <>
        {
}
        <hr className='mb-2'/>
        <MDBRow>
          <MDBCol className="mx-auto"><strong>{this.state.label[0].toUpperCase()+this.state.label.slice(1)}</strong></MDBCol>
          <MDBCol>{this.prepareField()} {this.state.unit}</MDBCol>
        </MDBRow>
        {this.prepareError()}
      </>
    );
  }
}

  export default EditableElement;