import React, { Component } from "react";
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBBtn
} from "mdbreact";
import "./EquipmentPage.css";
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
    axios.get('http://localhost:4000/equipment/'+this.props.match.params.id)
        .then(response => {
          this.setState({
                image: response.data.image,
                title: response.data.equipment_type[0].toUpperCase()+response.data.equipment_type.slice(1)+' '+response.data.brand[0].toUpperCase()+response.data.brand.slice(1) + ' '+response.data.model,
                equipment: {
                  'typ osprzętu': response.data.equipment_type[0].toUpperCase()+response.data.equipment_type.slice(1),
                  'marka': response.data.brand[0].toUpperCase()+response.data.brand.slice(1),
                  'nazwa modelu': response.data.model,
                  'pojemność': response.data.capacity!=null?response.data.capacity+' L':null,
                  'pojemność na plony': response.data.crop_capacity!=null?response.data.crop_capacity+' L':null,
                  'pojemność paliwa': response.data.fuel_capacity!=null?response.data.fuel_capacity+' L':null,
                  'szerokość robocza': response.data.working_width!=null?response.data.working_width + ' m':null,
                  'moc': response.data.horsepower!=null?response.data.horsepower + ' KM':null ,
                  'wymagana moc': response.data.power_required!=null?response.data.power_required + ' KM':null,
                  'masa': response.data.mass + ' kg',
                  'prędkość maks.': response.data.max_speed!=null?response.data.max_speed + ' km/h':null,
                  'typ opon': response.data.tyre_type!=null?response.data.tyre_type.toUpperCase():null,
                  'koszt wynajmu': response.data.cost_per_day + ' zł',
                },
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
            <p style={{'font-size': '250%'}}>{this.state.title}</p>
            <hr className="hr-dark"/>
            <p className="text-center" style={{'font-size': '140%'}}>Specyfikacja</p>
            {console.log(this.state.equipment)}
            <SDLContainer elements={this.state.equipment}/>
            <hr className="hr-dark"/>
            <MDBRow className="text-center">
              <MDBCol md='6'>
              <DateRangePicker className="my-3"
                  onChange={this.onChange}
                  value={this.state.date}
                />
              </MDBCol>
              <MDBCol md='6'>
              <MDBBtn color="success" onClick={this.validateSubmit}>
                Wypożycz
              </MDBBtn>
              </MDBCol>
            </MDBRow>
            </MDBCol>
        </MDBRow>    
    </div>
    );
    } else {
      return "";
    }
  }
}

export default EquipmentSpecificPage;

