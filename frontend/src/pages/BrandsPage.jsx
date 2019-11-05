import React, { Component } from "react";
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
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBBtn
} from "mdbreact";
import "./BrandPage.css";

class CustomCard extends Component {
  
    render() {
        return (
            <MDBRow className="vertical-center" style={{"padding-top": "4rem"}}> 
              <MDBCol
                md="8" lg="6"
                className="mx-auto headline float-none white z-depth-1 p-2"
              >
                <MDBCardBody className="text-center">
                <img
                        style={{ height: '9rem', width: '9rem' }}
                        src={require('../assets/logo.png')}
                        alt="rol-pol-logo"
                        className="pr-2 d-inline"
                      />
                  <h1 className="display-4 mb-4">
                    <strong className="font-weight-bold">
                      Nasze Marki
                    </strong>
                  </h1>
                  <MDBRow />
                  <p className="pb-4">W naszej ofercie mamy szeroki zakres zarówno marek jak i sprzętu.</p>
                  <p className="pb-4">Znajdziesz u nas <strong>15+</strong> kultowych marek!</p>
                  <MDBRow className="d-flex flex-row justify-content-center row">
                  <MDBBtn outline color="success">
                    <MDBIcon icon="fas fa-download" className="mr-2" />
                    <span className="font-weight-bold">Katalog pełnej oferty</span>
                  </MDBBtn>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
        );
    }
}

class CustomCarousel extends Component {
  
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
          <div className="bg-1 containerfluid">
            <CustomCard/>
            <MDBMask overlay="black-light" />
          </div>
          </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
          <div className="bg-2 containerfluid">
            <CustomCard/>
            <MDBMask overlay="black-slight" />
          </div>
          </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
          <div className="bg-3 containerfluid">
            <CustomCard/>
            <MDBMask overlay="black-slight" />
          </div>
          </MDBView>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="4">
          <MDBView>
          <div className="bg-4 containerfluid">
            <CustomCard/>
            <MDBMask overlay="black-slight" />
          </div>
          </MDBView>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
  }
  }

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
        <CustomCarousel /> 
        <div className="mt-3 mb-5">    
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
