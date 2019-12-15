import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

class EntityDeleteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.message
        };
        this.deleteHandle = this.props.onDelete.bind();
        this.toggle = this.props.onClick.bind();
    }

    render() {
    return (
        <>
        <MDBBtn onClick={this.toggle} color="danger" className="mx-1">
            <MDBIcon icon="trash-alt" className="mr-1"/>
            usuń
        </MDBBtn>
        <MDBModal isOpen={this.props.isOpen} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>Usuwanie</MDBModalHeader>
          <MDBModalBody>
              {this.state.message}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={this.toggle}>anuluj</MDBBtn>
            <MDBBtn color="danger" onClick={this.deleteHandle}>
                <MDBIcon icon="trash-alt" className="mr-1"/>
                usuń
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        </>
    );
  }
}

export default EntityDeleteModal;