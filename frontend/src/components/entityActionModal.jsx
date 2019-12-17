import React, { Component } from 'react';
import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';

class EntityActionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btn_message: this.props.btnMessage,
            action_name: this.props.actionName,
            message: this.props.message
        };
        this.actionHandle = this.props.onAction.bind();
        this.toggle = this.props.onClick.bind();
    }

    render() {
    return (
        <>
        <MDBBtn onClick={this.toggle} color={this.props.color} className="mx-1">
            <MDBIcon icon={this.props.icon} className="mr-1"/>
            {this.state.btn_message}
        </MDBBtn>
        <MDBModal isOpen={this.props.isOpen} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>{this.state.action_name[0].toUpperCase()+this.state.action_name.slice(1)}</MDBModalHeader>
          <MDBModalBody>
              {this.state.message}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={this.toggle}>anuluj</MDBBtn>
            <MDBBtn color={this.props.color} onClick={this.actionHandle}>
                <MDBIcon icon={this.props.icon} className="mr-1"/>
                {this.state.btn_message}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        </>
    );
  }
}

export default EntityActionModal;