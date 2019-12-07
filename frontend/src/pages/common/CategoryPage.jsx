import React, { Component } from "react";
import axios from 'axios';
import {
  MDBContainer,
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
            <MDBView className="category-card">
              <MDBMask overlay="black-light" style={{'padding-top': '4rem', 'padding-bottom': '1rem'}}>
                <div className="text-white text-center py-5 px-4" >
                    <MDBCol className="py-5">
                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">{category}</MDBCardTitle>
                    <p className="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                        optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
                    </p>
                    <MDBBtn outline color="white" className="mb-5"><MDBIcon icon="clone" className="mr-2"></MDBIcon> View project</MDBBtn>
                    </MDBCol>
                </div>
              </MDBMask>
            </MDBView>
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
