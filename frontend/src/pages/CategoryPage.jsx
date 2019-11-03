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
  MDBJumbotron,
  MDBBtn
} from "mdbreact";

import "./BrandPage.css";




class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {brands_arr: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/equipment_types')
        .then(response => {
            this.setState({ category_arr: response.data });
            console.log(this.state.category_arr);
        })
        .catch(function (error){
            console.log(error);
        })
  }

  makeCategoryJumbos() {
    return <MDBRow id="brands">
        {this.gatherAllCategoryJumbos()}
        </MDBRow>;
  }

  gatherAllCategoryJumbos() {
    let tmp = [];
    while (this.state.category_arr.length>0)
      tmp.push(this.makeCategoryJumbo(this.state.category_arr.pop()));
    return tmp;
  }
  
  makeCategoryJumbo(category) {
    return (           
        <MDBRow>
        <MDBCol>
            <MDBJumbotron style={{ padding: 0 }}>
            <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)` }}>
                <MDBCol className="py-5">
                <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">{category}</MDBCardTitle>
                <p className="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                    optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                </p>
                <MDBBtn outline color="white" className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> View project</MDBBtn>
                </MDBCol>
            </MDBCol>
            </MDBJumbotron>
        </MDBCol>
        </MDBRow>
    );
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        <div className="mt-3 mb-5">    
          <MDBContainer  md="12" className="mx-1" style={{"max-width": "1920px"}}>
            {this.makeCategoryJumbos()}
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default CategoryPage;
