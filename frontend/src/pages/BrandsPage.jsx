import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink,
  MDBJumbotron
} from "mdbreact";

import "./HomePage.css";

class BrandsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {brands_arr: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/brands')
        .then(response => {
            this.setState({ brands_arr: response.data });
            console.log(this.state.brands_arr);
        })
        .catch(function (error){
            console.log(error);
        })
  }

  makeBrandsRow() {
    return <MDBRow id="brands">
        {this.gatherAllBrandsCols()}
        </MDBRow>;
  }

  gatherAllBrandsCols() {
    let tmp = [];
    while (this.state.brands_arr.length>0)
      tmp.push(this.makeAnimatedBrandCard(this.state.brands_arr.pop()));
    return tmp;
  }
  
  makeAnimatedBrandCard(brand) {
    return (
    <MDBCol sm="6" md="4" lg="3">
      <MDBAnimation reveal type="fadeIn">
        <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
          <MDBContainer cascade className="p-3">
          <MDBCardImage
            cascade
            className="img-fluid"
            src={require("../assets/brands/" + brand.toLowerCase()+".png")}
            style={{height: "50%", margin: "auto"}}
          />
          </MDBContainer>
          <MDBCardBody cascade className="text-center">
            <MDBCardTitle>
              <strong>{brand}</strong>
            </MDBCardTitle>
            <MDBCardText>

            </MDBCardText>
            <MDBNavLink 
                tag="button"
                to={"/equipment/"+brand}
                className="btn btn-outline-mdb-color btn-sm btn-rounded"
              >
                Obejrz ofertę
            </MDBNavLink>
          </MDBCardBody>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
    );
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        <div className="mt-3 mb-5">    
          <MDBContainer className="mt-5 text-center">
            <MDBRow>
                <MDBCol>
                <MDBJumbotron className="text-center">
                    <MDBCardTitle className="card-title h4 pb-2">
                    <strong>MARKI</strong>
                    </MDBCardTitle>

                    <MDBCardImage
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                    className="img-fluid"
                    />
                    <MDBCardBody>
                    <MDBCardTitle className="indigo-text h5 m-4">
                        Photography
                    </MDBCardTitle>
                    <MDBCardText>
                        Sed ut perspiciatis unde omnis iste natus sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam.
                    </MDBCardText>

                    <MDBCol className="d-flex justify-content-center mt-4" md="12">
                        <MDBCol md="3" className="d-flex justify-content-around">
                        <a href="#"><MDBIcon
                            fab
                            icon="facebook-f"
                            className="grey-text"
                            size="lg"
                        /></a>
                        </MDBCol>
                    </MDBCol>

                    </MDBCardBody>
                </MDBJumbotron>
                </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer  md="12" className="mx-1" style={{"max-width": "1920px"}}>
            <MDBRow>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.makeBrandsRow()}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default BrandsPage;
