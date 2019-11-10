import React, { Component } from "react";
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup
} from "mdbreact";
import CategoryPicker from "../../components/categoryPicker";
import EquipmentPicker from "../../components/equipmentPicker";
import "./EquipmentPage.css";

class EquipmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {equipment_all_array: [],
                  category_array: [],
                  category_btns: undefined,
                  equipment: undefined,
                };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/equipment')
        .then(response => {
            this.setState({ equipment_all_array: response.data["equipment"],
                            category_array: response.data["category"],
                            filter: undefined,
                           });
            this.setState({ category_btns: this.makeCategoryBtns(),
                            equipment: <EquipmentPicker equipment={this.state.equipment_all_array}/>
                          });
        })
        .catch(function (error){ console.log(error); });
  }

  handleEvent(event) {
    this.setState({equipment: <EquipmentPicker category={event.target.value} equipment={this.state.equipment_all_array}/>})
  }

  makeCategoryBtns() {
    let tmp = [];
    for(var i=0; i<this.state.category_array.length; i++)
      tmp.push(<CategoryPicker onClick={e=>this.handleEvent(e)} category={this.state.category_array[i]}/>)
    return tmp;
  }

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
                  <MDBBtnGroup className="mx-auto">
                  {this.state.category_btns}
                  </MDBBtnGroup>
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

export default EquipmentPage;

