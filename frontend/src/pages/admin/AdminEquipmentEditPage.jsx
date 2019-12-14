import React, { Component } from "react";
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBNav,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import {Redirect} from "react-router-dom";
import EditForm from "../../components/EditForm";
import ValidationMessage from "../../components/validationMessage";

class EquipmentEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: undefined,
        equipment_type: undefined,
        tyre_type: undefined,
        brand: undefined,
        equipment: undefined,
        redirectToLogin: false,
        errors: {},

        sideDataFetchSuccess: false,
        equipmentFetchSuccess: false
    }
  }

  componentDidMount() {
    axios.post('http://localhost:4000/panel/equipment/side/data', null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
    .then(response => {
        if(response.data.IS_VALID === false) {
            this.setState({
                redirectToLogin: true,
            });
        } else {
            this.setState({
                equipment_type: response.data.equipment_type,
                tyre_type: response.data.tyre_type,
                brand: response.data.brand
            });
            this.setState({sideDataFetchSuccess: true});
        }
    }).catch(function(error){console.log(error);});

    axios.post('http://localhost:4000/panel/equipment/'+this.props.match.params.id, null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
    .then(response => {
        if(response.data.IS_VALID === false) {
            this.setState({
                redirectToLogin: true,
            });
        } else {
            delete response.data.equipment.id;
            this.setState({
                equipment: response.data.equipment,
                equipment_m: Object.assign({}, response.data.equipment)
            });
            this.setState({equipmentFetchSuccess: true});
        }
        }).catch(function(error){console.log(error);});
  }

  handleInputChange(event) {
    event.preventDefault();
    let tmp = this.state.equipment_m;
    tmp[event.target.name] = event.target.value;
    this.setState({equipment_m: tmp});
  }

  handleReset() {
    this.setState({equipment_m: Object.assign({}, this.state.equipment)});
    this.setState({errors: {}});

  }
  
  handleSumbit(event) {
    event.preventDefault()
    axios.post('http://localhost:4000/panel/equipment/edit/'+this.props.match.params.id, this.state.equipment_m,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
    .then(response => {
        if(response.data["TOTAL_WARNINGS"] === 0)
            this.setState({success: true})
        else {
            delete response.data.equipmentErrors.TOTAL_WARNINGS;
            this.setState({
                errors: response.data.equipmentErrors
            });
            console.log(response.data.equipmentErrors)
        }
    });
  }

  renderNavLinks() {
    return(
        <MDBNav className="ml-5">
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} to="/admin/panel">Panel</MDBNavLink>
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} to="/admin/panel/equipment">Sprzęt</MDBNavLink>                
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} active to={"/admin/panel/equipment/details/"+this.props.match.params.id}>{this.state.equipment.model+'_id['+this.props.match.params.id+']'}</MDBNavLink>
        </MDBNav>
    );
  }

  render() {
    if(!this.state.redirectToLogin && this.state.sideDataFetchSuccess && this.state.equipmentFetchSuccess) {
        return (
        <div style={{'backgroundColor': '#37474F', "paddingTop": "100px", "paddingBottom": "100px"}} className="">
            <div className="bg-white py-5">
            {this.renderNavLinks()}
            <p className="h2 pb-3 text-center">Edycja {this.state.equipment.equipment_type} {this.state.equipment.model}</p>
            <MDBRow className="pb-5">   
                <MDBCol md="8" lg="8" className="mx-auto">
                    <EditForm 
                        quitLink='/admin/panel/equipment'
                        onSubmit={this.handleSumbit.bind(this)} 
                        onChange={this.handleInputChange.bind(this)} 
                        onReset={this.handleReset.bind(this)}
                        content_type='equipment'
                        data={this.state.equipment_m} 
                        selectable={{tyre_type: 'tyre_type', brand: 'brand'}}
                        options={{equipment_type: this.state.equipment_type, tyre_type: this.state.tyre_type, brand: this.state.brand}}
                        errors={this.state.errors}
                        />
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

export default EquipmentEditPage;

