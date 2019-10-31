import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';

class equipmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
        };
        fetch(API).then(response => response.json()).then(data => this.setState({ data }));
      }
  render() {
    return (
          <div data-test="animation" class="animated fadeInDown" style="animation-name: fadeInDown; visibility: visible; animation-iteration-count: 1;">
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make
                up the bulk of the card&apos;s content.
              </MDBCardText>
              <MDBBtn outline gradient="dusty-grass-gradient">tekst</MDBBtn>
            </MDBCardBody>
          </MDBCard>
          </div>
    )
  }
}

export default equipmentCard;