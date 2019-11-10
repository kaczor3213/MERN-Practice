import React, { Component } from "react";
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow
} from "mdbreact";
import CategoryPicker from "../../components/categoryPicker";
import EquipmentPicker from "../../components/equipmentPicker";
import "./EquipmentPage.css";

class EquipmentCategoryPage extends Component {
    constructor(props) {
      super(props);
      this.state = {equipment_arr: [],
                    category_arr: [],
                    category_btns: undefined,
                    equipment: undefined}; 
    }
  
    componentDidMount() {
      axios.get('http://localhost:4000' + this.props.location.pathname)
          .then(response => {
              this.setState({ equipment_arr: response.data["equipment"],
                              category_arr: response.data["category"]
                             });
              this.setState({
                              category_btns: <CategoryPicker category={this.state.category_arr}/>,
                              equipment: <EquipmentPicker equipment={this.state.equipment_arr}/>
                            })
          })
          .catch(function (error){
              console.log(error);
          })
    }

    // handleClick(e) {
    //   e.preventDefault();
    //   console.log(e.props.to)
    //   axios.get('http://localhost:4000' + e.props.to)
    //       .then(response => {
    //           this.setState({ equipment_arr: response.data["equipment"],
    //                           category_arr: response.data["category"],
    //                          });
    //           this.setState({
    //                           category_btns: <CategoryPicker category={this.state.category_arr}/>,
    //                           equipment_filter_array: this.makeEquipmentsRow(),
    //                         })
    //           console.log(this.state.equipment_arr)
    //       })
    //       .catch(function (error){
    //           console.log(error);
    //       })
    // }
  
    scrollToTop = () => window.scrollTo(0, 0);
  
    render() {
      return (
        <>  
          <div className="equipment-page">
            <div className="masker">
            <MDBContainer>
              <MDBRow className="pt-5">
                <MDBCol md="12" className="mt-4 white-text">
                  <h2 className="text-center my-5 font-weight-bold">
                    Obejrzyj nasz sprzęt już teraz!
                  </h2>
                  <hr className="my-5 white" />
                  <div className="btn-toolbar" role="toolbar">
                    {this.state.category_btns}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer md="12" className="clear-mask mx-1" style={{"max-width": "1920px"}}>
              <MDBRow>
                <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
                <MDBCol className="mt-4" md="12" lg="10">
                  {this.state.equipment}
                </MDBCol>
                <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              </MDBRow>
            </MDBContainer>
            </div>
          </div>
        </>
      );
    }
  }

  export default EquipmentCategoryPage;