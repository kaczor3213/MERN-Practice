import React from "react";
import axios from 'axios';
import { 
  MDBRow,
  MDBCol,
  MDBNav,
  MDBNavLink,
  MDBIcon,
  MDBBtn
} from 'mdbreact';
import GDLContainer from "../../components/groupDataListContainer";
import {Redirect} from "react-router-dom";
    
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
            readyToRender: false,
            equipment: null,
        };
    }

    componentDidMount() {
        axios.post('http://localhost:4000/panel/equipment', null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
        .then(response => {
            if(response.data.IS_VALID === false) {
                this.setState({
                    redirectToLogin: true,
                });
            } else {
                this.setState({
                  equipment: response.data.equipment,
                  readyToRender: true
                });
            }
        });
    }

    handleDelete(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/panel/equipment/delete/' +this.props.match.params.id, null,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
        .then(response => {});
    }
    
    
    render() {
        if(!this.state.redirectToLogin && this.state.readyToRender) {
            return (
            <div style={{'backgroundColor': '#37474F', "paddingTop": "100px", "paddingBottom": "100px"}} className="">
                <div className="bg-white py-5">
                <MDBNav className="ml-5">
                    <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
                    <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} to="/admin/panel">Panel</MDBNavLink>
                    <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
                    <MDBNavLink className="my-auto indigo-text" style={{'fontSize': '120%'}} active to="/admin/panel/equipment">Sprzęt</MDBNavLink>
                </MDBNav>
                <p className="h2 pb-3 text-center">Sprzęt</p>
                <MDBRow>   
                    <MDBCol md="8" lg="8" className="mx-auto">
                    <GDLContainer onDelete={this.handleDelete.bind(this)} elements={this.state.equipment} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="pt-3">
                    <MDBCol md="8" className="mx-auto text-center">
                        <MDBBtn href='/admin/panel' color="success">
                        <MDBIcon icon="chevron-left" className="mr-1"/>
                        cofnij
                        </MDBBtn>
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
};

export default ProfilePage;