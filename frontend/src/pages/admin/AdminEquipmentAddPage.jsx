import React, { Component } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBRow,
  MDBNav,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import {Redirect} from "react-router-dom";
import CreateForm from "../../components/adminCreateForm";

class EquipmentAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: undefined,
        equipment_type: undefined,
        tyre_type: undefined,
        brand: undefined,
        equipment: undefined,
        form: undefined,
        redirectToLogin: false,
        errors: {},
        success: false,
        sideDataFetchSuccess: false,
        equipmentFetchSuccess: false,
        redirectToEquipmentList: false,
    }
  }

  componentDidMount() {
    axios.post("http://localhost:4000/panel/equipment/side/data", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        console.log(response.data)
        if(response.data.IS_VALID === false) {
            this.setState({
                redirectToLogin: true,
            });
        } else {
            this.setState({
                equipment_type: response.data.equipment_type,
                tyre_type: response.data.tyre_type,
                brand: response.data.brand,
                form: response.data.equipment_template,
                equipment: Object.assign({}, response.data.equipment_template),
            });
            this.setState({sideDataFetchSuccess: true});
        }
    }).catch(function(error){console.log(error);});
  }

  handleInputChange(event) {
    event.preventDefault();
    let equipment_tmp = this.state.equipment;
    equipment_tmp[event.target.name] = event.target.value;
    let errors_tmp = this.state.errors;
    errors_tmp[event.target.name] = null;
    this.setState({
        equipment: equipment_tmp,
        errors: errors_tmp
    });
  }

  handleReset() {
    this.setState({
        equipment: Object.assign({}, this.state.form),
        errors: {},
        success: false,
    });
  }
  
  handleSumbit(event) {
    event.preventDefault()
    axios.post("http://localhost:4000/panel/equipment/add", this.state.equipment,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        if(response.data.equipmentErrors.total_warnings === 0) {
            this.handleReset();
            this.setState({success: true});
        } else {
            delete response.data.equipmentErrors.total_warnings;
            this.setState({
                success: false,
                errors: response.data.equipmentErrors
            });
        }
    });
  }

  renderSuccess() {
    if(this.state.success)
        return (
            <MDBRow>
                <MDBCol md="6" className="mx-auto text-center" style={{"fontSize": "120%"}}>
                <MDBIcon icon="check" className="green-text mr-1"/>
                <strong>Pomyślnie zmieniono sprzęt</strong>
                </MDBCol>
            </MDBRow>
        );
    else
        return null;
  }

  renderNavLinks() {
    return(
        <MDBNav className="ml-5">
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} to="/admin/panel">Panel</MDBNavLink>
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} to="/admin/panel/equipment">Sprzęt</MDBNavLink>                
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} active to={"/admin/panel/equipment/add"}>Nowy sprzęt</MDBNavLink>
        </MDBNav>
    );
  }

  render() {
    if(this.state.redirectToEquipmentList)
        return <Redirect to="/admin/panel/equipment"/>;
    if(!this.state.redirectToLogin && this.state.sideDataFetchSuccess) {
        return (
        <div style={{"backgroundColor": "#37474F", "paddingTop": "100px", "paddingBottom": "100px", "minHeight": "100vh"}} className="">
            <div className="bg-white py-5">
            {this.renderNavLinks()}
            <p className="h2 pb-3 text-center">Dodawanie sprzętu</p>
            <MDBRow className="pb-5">   
                <MDBCol md="8" lg="8" className="mx-auto">
                    <CreateForm
                        quitLink="/admin/panel/equipment"
                        onChange={this.handleInputChange.bind(this)} 
                        onSubmit={this.handleSumbit.bind(this)}
                        onReset={this.handleReset.bind(this)}
                        createMessage={"Czy jesteś pewien, że chcesz dodać nowy produkt? Po dodaniu zostaniesz przekierowany na stronę sprzętu."}
                        content_type="equipment"
                        data={this.state.equipment}
                        selectable={{equipment_type: "equipment_type", tyre_type: "tyre_type", brand: "brand"}}
                        options={{equipment_type: this.state.equipment_type, tyre_type: this.state.tyre_type, brand: this.state.brand}}
                        errors={this.state.errors}
                    />
                </MDBCol>
            </MDBRow>
            {this.renderSuccess()}
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

export default EquipmentAddPage;

