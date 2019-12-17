import React, { Component } from "react";
import { 
    MDBRow,
    MDBCol
} from 'mdbreact';

class SDLElement extends Component {
    constructor(props) {
      super(props);
      this.state = {
          label: this.props.label,
          data: this.props.data,
          unit: this.props.unit
      }
    }
    render() {
      return(
        <>
        <hr className='mb-2'/>
        <MDBRow>
          <MDBCol className="mx-auto"><strong>{this.state.label[0].toUpperCase()+this.state.label.slice(1)} </strong></MDBCol>
          <MDBCol>
            <span style={{'display': 'inline-block', 'maxWidth': '200px', 'whiteSpace': 'nowrap','overflow': 'hidden','textOverflow': 'ellipsis'}} >{this.state.data}</span>{' '}
            <span style={{'display': 'inline-block', 'whiteSpace': 'nowrap','overflow': 'hidden',}}>{this.state.unit}</span>
          </MDBCol>
        </MDBRow>
        </>
      )
    }
  }

  export default SDLElement;