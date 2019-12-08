import React from "react";
import {
    MDBBtn
} from "mdbreact"

class SmartPicker extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        parameter: this.props.parameter,
        value: this.props.value,
        repr: this.props.repr!==undefined?this.props.repr:this.props.value,
      };
    }
  
    render() {
      return (
        <MDBBtn 
        color={this.props.color}
        onClick ={e=>this.props.onClick(e)}
        value={this.state.value}
        parameter={this.state.parameter}
        >
          {this.state.repr}
        </MDBBtn>
      );
    }
  }
  
export default SmartPicker;