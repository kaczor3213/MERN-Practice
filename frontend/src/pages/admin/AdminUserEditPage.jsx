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
import EditForm from "../../components/adminEditForm";

class EquipmentEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: undefined,
        equipment_type: undefined,
        tyre_type: undefined,
        brand: undefined,
        user: undefined,
        user_m: undefined,
        redirectToLogin: false,
        errors: {},
        success: false,
        sideDataFetchSuccess: false,
        equipmentFetchSuccess: false,
        redirectToEquipmentList: false
    }
  }

  componentDidMount() {
    axios.post("http://localhost:4000/panel/users/"+this.props.match.params.id, null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        console.log(response.data)
        if(response.data.IS_VALID === false) {
            this.setState({
                redirectToLogin: true,
            });
        } else {
            delete response.data.user.id;
            this.setState({
                user: response.data.user,
                user_m: Object.assign({}, response.data.user)
            });
            this.setState({equipmentFetchSuccess: true});
        }
        }).catch(function(error){console.log(error);});
    }

  handleInputChange(event) {
    event.preventDefault();
    let tmp = this.state.user_m;
    tmp[event.target.name] = event.target.value;
    this.setState({user_m: tmp});
  }

  handleReset() {
    this.setState({
        user_m: Object.assign({}, this.state.user),
        errors: {},
        success: false,
    });
  }
  
  handleSumbit(event) {
    event.preventDefault()
    axios.post("http://localhost:4000/panel/user/edit/"+this.props.match.params.id, this.state.user_m,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        if(response.data.userErrors.total_warnings === 0) {
            this.setState({success: true})
        } else {
            delete response.data.userErrors.total_warnings;
            this.setState({
                success: false,
                errors: response.data.userErrors
            });
        }
    });
  }

  handleDelete(event) {
    event.preventDefault();
    axios.post("http://localhost:4000/panel/user/delete/" +this.props.match.params.id, null,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        this.setState({redirectToUserList: true})
    });

  }

  renderNavLinks() {
    return(
        <MDBNav className="ml-5">
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} to="/admin/panel">Panel</MDBNavLink>
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} to="/admin/panel/equipment">Sprzęt</MDBNavLink>                
            <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
            <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} active to={"/admin/panel/user/edit/"+this.props.match.params.id}>{this.state.user.email+"_id["+this.props.match.params.id+"]"}</MDBNavLink>
        </MDBNav>
    );
  }

  renderSuccess() {
    if(this.state.success)
        return (
            <MDBRow>
                <MDBCol md="6" className="mx-auto text-center" style={{"fontSize": "120%"}}>
                <MDBIcon icon="check" className="green-text mr-1"/>
                <strong>Pomyślnie zmieniono użytkownika</strong>
                </MDBCol>
            </MDBRow>
        );
    else
        return null;
  }

  render() {
    if(this.state.redirectToUserList)
        return <Redirect to="/admin/panel/user"/>;
    if(!this.state.redirectToLogin && this.state.userFetchSuccess) {
        return (
        <div style={{"backgroundColor": "#37474F", "paddingTop": "100px", "paddingBottom": "100px"}} className="">
            <div className="bg-white py-5">
            {this.renderNavLinks()}
            <p className="h2 pb-3 text-center">Edycja {this.state.user.email}</p>
            <MDBRow className="pb-5">   
                <MDBCol md="8" lg="8" className="mx-auto">
                    <EditForm 
                        quitLink="/admin/panel/users"
                        onSubmit={this.handleSumbit.bind(this)} 
                        onChange={this.handleInputChange.bind(this)} 
                        onReset={this.handleReset.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        deleteMessage={"Czy jesteś pewien, że chcesz usunąć tego użytkownika:"+this.state.user.email+". Po usunięciu zostaniesz przekierowany na stronę użytkowników."}
                        content_type="user"
                        data={this.state.user_m}
                        selectable={{role: "role"}}
                        options={{role: this.state.role}}
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

export default EquipmentEditPage;

