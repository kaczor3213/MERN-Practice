import React, { Component } from "react";
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBView,
  MDBMask,
} from "mdbreact";
import "./CategoryPage.css";


class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {category_arr: []};
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
    return <MDBRow className="w-100 m-0" id="types">
        {this.gatherAllCategoryJumbos()}
        </MDBRow>;
  }
  
  gatherAllCategoryJumbos() {
    let tmp = [];
    var i=0;
    while (this.state.category_arr.length>0)
      tmp.push(this.makeCategoryJumbo(this.state.category_arr.pop(), i));
      i++;
    return tmp.reverse();
  }

  makeCategoryJumbo(category, index) {
    return (           
        <MDBCol md="12" className="category-card p-0 w-100" id={index} style={{'backgroundImage': 'url(' + require("../../assets/category/" + category.toLowerCase()+".jpg") + ')' }}>
              <div className="masker-categories">
                <div className="text-white vertical-center text-center py-5 px-4" >
                    <MDBCol className="py-5">
                    <MDBCardTitle className="display-4  pt-3 m-5 font-bold">{category}</MDBCardTitle>
                    <p className="mx-5 mb-5" style={{'fontSize': '130%'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                        optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                    </p>
                    <MDBBtn color="light-green" className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> Obejrz kategorię</MDBBtn>
                    </MDBCol>
                </div>
                </div>
        </MDBCol>
    );
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        {this.makeCategoryJumbos()}
      </>
    );
  }
}

export default CategoryPage;
