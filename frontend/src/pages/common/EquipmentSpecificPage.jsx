import React, { Component } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBRow,
  MDBBtn
} from "mdbreact";
import "./css/EquipmentPage.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import SDLContainer from "../../components/singleDataListContainer";

class EquipmentSpecificPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        equipment: undefined,
        date: [Date(Date.now()),Date()],
    }
  }
  onChange = date => this.setState({ date })

  componentDidMount() {
    axios.get("http://localhost:4000/equipment/"+this.props.match.params.id)
        .then(response => {
          this.setState({
                image: response.data.image,
                title: response.data.equipment_type[0].toUpperCase()+response.data.equipment_type.slice(1)+" "+response.data.brand[0].toUpperCase()+response.data.brand.slice(1)+ " "+response.data.model,
                equipment: response.data,
                readyToRender: true
            })
        }).catch(function(error){console.log(error);});
  }

  render() {
    if(this.state.readyToRender) {
    return(
      <div className="profile-page pt-5">
        <MDBRow className="my-5 py-5">
            <MDBCol xl="6" lg="8" md="10" className="p-5 mx-auto bg-white">
            <p style={{"fontSize": "250%"}}>{this.state.title}</p>
            <hr className="hr-dark"/>
            <p className="text-center" style={{"fontSize": "140%"}}>Specyfikacja</p>
            <SDLContainer content_type="equipment" elements={this.state.equipment}/>
            <hr className="hr-dark"/>
            <MDBRow className="text-center">
              <MDBCol md="6">
              <DateRangePicker className="my-3"
                  onChange={this.onChange}
                  value={this.state.date}
                />
              </MDBCol>
              <MDBCol md="6">
              <MDBBtn color="success" onClick={this.validateSubmit}>
                Wypożycz
              </MDBBtn>
              </MDBCol>
            </MDBRow>
            </MDBCol>
        </MDBRow>    
    </div>
    );
    } else
      return "";
  }
}

export default EquipmentSpecificPage;

