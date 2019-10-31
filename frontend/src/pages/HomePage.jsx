import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBEdgeHeader,
  MDBFreeBird,
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
  MDBNavLink
} from "mdbreact";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from
"mdbreact";

import "./HomePage.css";


class CustomCarousel extends Component {
  constructor(props) {
    super(props);
  };

  render() {
  return (
  <MDBContainer className="px-0 mx-0 w-100 mw-100">
    <MDBCarousel
    activeItem={1}
    length={4}
    showControls={true}
    showIndicators={false}
  >
    <MDBCarouselInner>
      <MDBCarouselItem itemId="1">
        <MDBView>
          <img
            className="img-carousel d-block w-100"
            src={require('../assets/carousel_1.jpg')}
            alt="First slide"
          />
        <MDBMask overlay="black-light" />
        </MDBView>
      </MDBCarouselItem>
      <MDBCarouselItem itemId="2">
        <MDBView>
          <img
            className="img-carousel d-block w-100"
            src={require('../assets/carousel_2.jpg')}
            alt="Second slide"
          />
        <MDBMask overlay="black-slight" />
        </MDBView>
      </MDBCarouselItem>
      <MDBCarouselItem itemId="3">
        <MDBView>
          <img
            className="img-carousel d-block w-100"
            src={require('../assets/carousel_3.jpg')}
            alt="Third slide"
          />
        <MDBMask overlay="black-slight" />
        </MDBView>
      </MDBCarouselItem>
      <MDBCarouselItem itemId="4">
        <MDBView>
          <img
            className="img-carousel d-block w-100"
            src={require('../assets/carousel_4.jpg')}
            alt="Third slide"
          />
        <MDBMask overlay="black-slight" />
        </MDBView>
      </MDBCarouselItem>
    </MDBCarouselInner>
  </MDBCarousel>
  </MDBContainer>
);
}
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {equipment_arr: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/')
        .then(response => {
            this.setState({ equipment_arr: response.data });
            console.log(this.state.equipment_arr);
        })
        .catch(function (error){
            console.log(error);
        })
  }

  makeEquipmentsRow() {
    return <MDBRow id="brands">
        {this.gatherAllEquipmentsCols()}
        </MDBRow>;
  }

  gatherAllEquipmentsCols() {
    let tmp = [];
    while (this.state.equipment_arr.length>0)
      tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment_arr.pop()));
    return tmp;
  }
  
  makeAnimatedEquipmentCard(equipment) {
    return (
    <MDBCol sm="6" md="4" lg="3">
      <MDBAnimation reveal type="fadeIn">
        <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
          <MDBCardImage
            cascade
            className="img-fluid"
            src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg"
            style={{margin: "auto"}}
          />
          <MDBCardBody cascade className="text-center">
            <MDBCardTitle>
              <MDBIcon icon="cubes" className="green-text pr-2" />
              <span class="text-capitalize">{equipment.equipment_type}</span><br/>
              <strong>{equipment.model}</strong>
            </MDBCardTitle>
            <MDBCardText>
              <strong>Producent: </strong>{equipment.brand}<br/>
              <strong>Koszt (1 dzień): </strong><p class="success">{equipment.cost_per_day} zł</p>
            </MDBCardText>
            <MDBNavLink 
                tag="button"
                to={"/equipment/"+equipment.id}
                color="amber"
                className="btn btn-outline-mdb-color btn-sm btn-rounded"
              >
                Obejrz
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
      <CustomCarousel />        
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="10"
                className="mx-auto headline float-none white z-depth-1 py-2 px-2"
              >
                <MDBCardBody className="text-center">
                  <h1 className="display-3 mb-4">
                    <strong className="font-weight-bold">
                      <img
                        style={{ height: '9rem', width: '9rem' }}
                        src={require('../assets/logo.png')}
                        alt="mdbreact-logo"
                        className="pr-2"
                      />
                      Rol Pol
                    </strong>
                  </h1>
                  <MDBRow />
                  <p>React Bootstrap with Material Design</p>
                  <p className="pb-4">
                    This application shows the actual use of MDB React
                    components in the application.
                  </p>
                  <MDBRow className="d-flex flex-row justify-content-center row">
                    <a
                      className="border nav-link border-light rounded mr-1 mx-2 mb-2"
                      href="https://mdbootstrap.com/react/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon icon="graduation-cap" className="mr-2" />
                      <span className="font-weight-bold">Official Documentation</span>
                    </a>
                    <a
                      className="border nav-link border-light rounded mx-2 mb-2"
                      href="https://mdbootstrap.com/products/react-ui-kit/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon far icon="gem" className="mr-2" />
                      <span className="font-weight-bold">PRO</span>
                    </a>
                    <a
                      className="border nav-link border-light rounded mx-2 mb-2"
                      href="https://mdbootstrap.com/docs/react/getting-started/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon icon="download" className="mr-2" />
                      <span className="font-weight-bold">FREE</span>
                    </a>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <h2 className="text-center my-5 font-weight-bold">
                  Dlaczego my?
                </h2>
                <p className="text-center text-muted mb-1">
                  Jesteśmy fimą z wieloletnim doświadczeniem w obsłudze i konserwacji maszyn rolniczych.  
                </p>
                <p className="text-center text-muted mb-1">
                Wierzymy, że pod dobrą ręką każdy osprzęt może długo i wiernie służyć.                
                </p>
                <p className="text-center text-muted mb-1">
                  Rynek dynamicznie się zmienia, a nie każdy rolnik jest w stanie pozwolić sobie na zakup nowego ciągnika.
                </p>
                <p className="text-center text-muted">
                  Dzięki naszej usłudze możesz w dowolnym momencie wynająć maszynę rolniczą do swojej dyspozycji!
                </p>
                <hr className="my-5" />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer  md="12" className="mx-1" style={{"max-width": "1920px"}}>
            <MDBRow>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.makeEquipmentsRow()}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default HomePage;
