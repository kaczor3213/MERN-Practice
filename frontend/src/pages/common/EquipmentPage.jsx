import React, { Component } from "react";
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdbreact";
import SmartPicker from "../../components/SmartPicker";
import EquipmentPicker from "../../components/equipmentPicker";
import "./EquipmentPage.css";

class EquipmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     equipment: undefined,

     equipment_all_array: [],
     category_array: [],
     brand_array: [],

     category_btns: undefined,
     brand_btns: undefined,

     category_filter: 'none',
     brand_filter: 'none',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/equipment')
        .then(response => {
            this.setState({ 
             equipment_all_array: response.data["equipment"],
             category_array: response.data["category"],
             brand_array: response.data["brand"]
            });

            this.setState({ 
              brand_btns: this.makeBrandBtns(),
              category_btns: this.makeCategoryBtns(),
              equipment: <EquipmentPicker  brand={this.state.brand_filter} category={this.state.category_filter} equipment={this.state.equipment_all_array}/>
            });
        }).catch(function(error){console.log(error);});
  }

  handleEvent (event) {
    if(event.target.getAttribute('parameter') === 'category')
      this.setState({category_filter: event.target.value}, () =>
      {this.setState({equipment: <EquipmentPicker brand={this.state.brand_filter} category={this.state.category_filter} equipment={this.state.equipment_all_array}/>},
        () => {console.log(this.state.brand_filter, this.state.category_filter);});});
    if(event.target.getAttribute('parameter') === 'brand')
      this.setState({brand_filter: event.target.value}, () => 
      {this.setState({equipment: <EquipmentPicker brand={this.state.brand_filter} category={this.state.category_filter} equipment={this.state.equipment_all_array}/>},
        () => {console.log(this.state.brand_filter, this.state.category_filter);});});
    
  }

  makeBrandBtns() {
    let tmp = [];
    for(var i=0; i<this.state.brand_array.length; i++)
      tmp.push(<SmartPicker color="light-green" onClick={e=>this.handleEvent(e)} parameter='brand' value={this.state.brand_array[i]} />)
    tmp.push(<SmartPicker color="danger" onClick={e=>this.handleEvent(e)} parameter='brand' value='none' repr={<div><MDBIcon className="mr-1" icon="times"/>Wyczyść filtr</div>}/>)

    return tmp;
  }

  makeCategoryBtns() {
    let tmp = [];
    for(var i=0; i<this.state.category_array.length; i++)
      tmp.push(<SmartPicker color="green" onClick={e=>this.handleEvent(e)} parameter='category' value={this.state.category_array[i]}/>)
    tmp.push(<SmartPicker color="danger" onClick={e=>this.handleEvent(e)} parameter='category' value='none' repr={<div><MDBIcon className="mr-1" icon="times"/>Wyczyść filtr</div>}/>)

    return tmp;
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>  
        <div className="equipment-page">
          <div className="masker-equipment">
          <MDBContainer>
            <MDBRow className="pt-5">
              <MDBCol md="12" className="mt-4 white-text">
                <h2 className="text-center my-5 font-weight-bold">
                  Obejrzyj nasz sprzęt już teraz!
                </h2>
                <hr className="my-5 white" />
                <div className="text-center">
                  <p className="text-center" style={{'fontSize': '200%'}}>
                    Marki
                  </p>
                  {this.state.brand_btns}
                </div>
                <div className="text-center">
                  <p style={{'fontSize': '200%'}}>
                    Kategorie
                  </p>
                  {this.state.category_btns}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="clear-mask mx-1">
            <MDBRow className="w-100">
              <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.state.equipment}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
            </MDBRow>
          </div>
          </div>
        </div>
      </>
    );
  }
}

export default EquipmentPage;

