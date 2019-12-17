import React, { Component } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from "mdbreact";

class NotFoundPage extends Component {
  render() {
    return (
      <div style={{"backgroundColor": "grey", "flex": "100%", "display": "flex"}}>
      <div className="vetical-center mx-auto text-center"   style={{"min-height": "100%", "display": "flex", "align-items": "center"}}>
        <div>
        <p className="display-2">Status<strong> 404</strong></p>
        <p className="display-3">Ups, coś poszło nie tak...</p>
        <MDBBtn color="success" href="/"><MDBIcon icon="home" className="mr-1"/>Powrót do strony głównej</MDBBtn>
        
        </div>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
