import React from "react";
import axios from 'axios';
import { 
    MDBRow,
    MDBCol,
    MDBBtn} from 'mdbreact';
import {Redirect} from "react-router-dom";
import "./ProfilePage.css";

    
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            redirectToLogin: false,
            readyToRender: false
        };
    }

    componentDidMount() {
        axios.post('http://localhost:4000/myprofile', null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' }).then(response => {
            if(response.data.IS_VALID === false) {
                this.setState({
                    redirectToLogin: true,
                });
            } else {
                this.setState({
                    user: response.data,
                    readyToRender: true
                });
            }
        });
        console.log(this.state.redirectToLogin, !this.state.redirectToLogin)
    }
    
    render() {
        if(!this.state.redirectToLogin && this.state.readyToRender) {
            return (
                <div className="profile-page pt-5">
                    <MDBRow className="my-5 py-5">
                        <MDBCol xl="6" lg="8" md="10" className="p-5 mx-auto bg-white">
                            <MDBRow>
                                <MDBCol md="6">
                                <div className="profile"></div>
                                    <span style={{"font-size": '250%'}}>Witaj {this.state.user.firstName}!</span>
                                        <p className="lead grey-text">
                                        Już dawno Cię u nas nie było...
                                        </p>
                                        <hr className="my-2" />
                                        <span style={{"font-size": '175%'}}>Moje dane</span>
                                        {console.log(this.state.user)}
                                        <p>{this.state.user.firstName} {this.state.user.lastName}<br/>
                                        {this.state.user.address}, {this.state.user.place}</p>
                                        <span style={{"font-size": '150%'}}>Dane kontaktowe</span>
                                        <p>{this.state.user.email}, <br/> +48 {this.state.user.phoneNumber}</p>
                                        
                                        <p className="lead text-center">
                                            <MDBBtn color="amber">
                                                Konfguruj konto 
                                                <i className="px-1 fas fa-cogs"></i>
                                            </MDBBtn>
                                        </p>
                                </MDBCol>
                                <MDBCol md="6">
                                    <span style={{"font-size": '200%'}}>Moje zamówienia</span>
                                    <p className="grey-text">Nie wiele tego : ( ...</p>
                                    <hr/>
                                </MDBCol>
                            </MDBRow>
                            <hr/>
                            <MDBRow>
                                <MDBCol>
                                <span style={{"font-size": '200%'}}>Bieżący wypożyczony sprzęt</span>
                                <MDBRow>
                                    <MDBCol>
                                        Sprzęt                        
                                    </MDBCol>
                                    <MDBCol>
                                        Wypożyczony dnia (dd/mm/rrrr)             
                                    </MDBCol>
                                    <MDBCol>
                                        Do dnia (dd/mm/rrrr)
                                    </MDBCol>
                                    <MDBCol>
                                        Koszt (PLN)  
                                    </MDBCol>
                                </MDBRow>
                                <p className="text-center grey-text">Pusto</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </div>
            );
        } else {
            if(this.state.redirectToLogin) {
                return <Redirect to="/login"/>;
            }
            return "";
        }
            
    }
};

export default ProfilePage;