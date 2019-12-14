import React, { Component } from "react";
import EditableElement from './EditableElement';
import {MDBBtn,MDBIcon, MDBRow, MDBCol} from 'mdbreact';
import EQUIPMENT_TRANS_PL from "../translation/equipmentParametersTranslation";
import EQUIPMENT_UNITS_PL from "./equipmentUnits";
import EQUIPMENT_VALIDATE_MESSAGES_PL from "./equipmentValidateMessages";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content_type: this.props.content_type,
      data: this.props.data,
      options: this.props.options,
      selectable: this.props.selectable,
    }
    this.handleInputChange = this.props.onChange.bind();
    this.resetHandler = this.props.onReset.bind();
    this.submitHandler = this.props.onSubmit.bind();
  }

  preparedField() {
    let tmp = [];
    for(var key in this.state.data) {
      if(this.state.content_type === 'equipment') {
        if(this.state.selectable[key] !== undefined)
          tmp.push(
            <EditableElement 
              error_present={this.props.errors[key]}
              error_message={EQUIPMENT_VALIDATE_MESSAGES_PL[key]}
              onChange={this.handleInputChange} 
              options={this.state.options[key]} 
              field_type="select"
              unit={EQUIPMENT_UNITS_PL[key]}
              value={this.state.data[key]}
              name={key}
              label={EQUIPMENT_TRANS_PL[key]}
            />
          );
        else if(!(this.state.selectable[key] === undefined && this.state.options[key] !== undefined))
          tmp.push(
            <EditableElement 
              error_present={this.props.errors[key]}
              error_message={EQUIPMENT_VALIDATE_MESSAGES_PL[key]}
              onChange={this.handleInputChange} 
              field_type="text" 
              unit={EQUIPMENT_UNITS_PL[key]}
              value={this.state.data[key]}
              name={key} 
              label={EQUIPMENT_TRANS_PL[key]}
            />
          );
      }
     
    }
    return tmp;
  }

  render() {
    return(
      <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
        {this.preparedField()}
        <MDBRow className="pt-3">
          <MDBCol md="8" className="mx-auto text-center">
            <MDBBtn href={this.props.quitLink} color="success">
            <MDBIcon icon="chevron-left" className="mr-1"/>
              cofnij
            </MDBBtn>
            <MDBBtn onClick={this.resetHandler} type="reset">
            <MDBIcon icon="undo" className="mr-1"/>
              anuluj
            </MDBBtn>
            <MDBBtn color="warning" type="submit">
              <MDBIcon icon="check" className="mr-1"/>
                zmień
            </MDBBtn>
            <MDBBtn onClick={this.onDelete} color="danger" className="mx-1">
                <MDBIcon icon="trash-alt" className="mr-1"/>
                usuń
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    )
  }
}

  export default EditForm;