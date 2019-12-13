import React, { Component } from "react";
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBNav,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import {Redirect} from "react-router-dom";
import SDLContainer from "../../components/singleDataListContainer";

class EquipmentDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        equipment: undefined,
        date: [Date(Date.now()),Date()],
    }
  }

  componentDidMount() {
    axios.post('http://localhost:4000/panel/equipment/'+this.props.match.params.id, null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
    .then(response => {
        if(response.data.IS_VALID === false) {
            this.setState({
                redirectToLogin: true,
            });
        } else {
            this.setState({
                image: response.data.image,
                id: response.data.id,
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
              });
        }
        }).catch(function(error){console.log(error);});
  }

  onDelete() {

  }

  renderNavLinks() {
    return(
        <MDBNav className="ml-5">
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} to="/admin/panel">Panel</MDBNavLink>
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} to="/admin/panel/equipment">Sprzęt</MDBNavLink>                
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} active to={"/admin/panel/equipment/details/"+this.state.id}>{this.state.equipment['nazwa modelu']+'_id['+this.state.id+']'}</MDBNavLink>
        </MDBNav>
    );
  }

  render() {
    if(!this.state.redirectToLogin && this.state.readyToRender) {
        return (
        <div style={{'backgroundColor': '#37474F', "paddingTop": "100px", "paddingBottom": "100px"}} className="">
            <div className="bg-white py-5">
            {this.renderNavLinks()}
            <p className="h2 pb-3 text-center">Sprzęt</p>
            <MDBRow className="pb-5">   
                <MDBCol md="8" lg="8" className="mx-auto">
                    <SDLContainer elements={this.state.equipment}/>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="8" className="mx-auto text-center">
                    <MDBBtn href="/admin/panel/equipment" color="success" className="mx-1"><MDBIcon icon="chevron-left" className="mr-1"/>cofnij</MDBBtn>
                    <MDBBtn href={"/admin/panel/equipment/edit/"+this.state.id} color="warning" className="mx-1"><MDBIcon icon="cogs" className="mr-1"/>edytuj</MDBBtn>
                    <MDBBtn onClick={this.onDelete} color="danger" className="mx-1"><MDBIcon icon="trash-alt" className="mr-1"/>usuń</MDBBtn>
                </MDBCol>
            </MDBRow>
            </div>
        </div>
        );
    } else {
        if(this.state.redirectToLogin) {
            return <Redirect to="/admin"/>;
        }
        return "";
    }
  }
}

export default EquipmentDetailsPage;

