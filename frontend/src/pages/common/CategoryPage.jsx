import React, { Component } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBCardTitle,
  MDBNavLink
} from "mdbreact";
import "./css/CategoryPage.css";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {category_arr: []};
  }

  componentDidMount() {
    axios.get("http://localhost:4000/equipment_types")
    .then(response => {
      this.setState({ category_arr: response.data });
    }).catch(function (error){console.log(error);})
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
      <MDBCol md="12" className="category-card p-0 w-100" id={index} style={{"backgroundImage": "url(" + require("../../assets/category/" + category.toLowerCase()+".jpg") + ")" }}>
        <div className="masker-categories">
          <div className="text-white vertical-center text-center py-5 px-4" >
              <MDBCol className="py-5">
              <MDBCardTitle className="display-4  pt-3 m-5 font-bold">{category[0].toUpperCase()+category.slice(1)}</MDBCardTitle>
              <MDBNavLink 
                  to={"/equipment/category/"+category}
                  className="btn btn-light-green mb-5 text-center mx-auto" style={{"maxWidth": "300px"}}>
                  <MDBIcon icon="clone" className="mr-2"></MDBIcon> Obejrz kategorię
              </MDBNavLink>
              </MDBCol>
          </div>
        </div>
      </MDBCol>
    );
  }

  render() {
    return this.makeCategoryJumbos();
  }
}

export default CategoryPage;
