import React from "react";
import axios from 'axios';
import ValidationMessage from "../../components/validationMessage";
import {Redirect} from "react-router-dom";
import { 
    MDBRow,
    MDBCol,
    MDBInput, 
    MDBBtn,
    MDBJumbotron
} from 'mdbreact';
import "./AdminLoginPage.css"

class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          error_message: "Podany email, bądź hasło są nieprawidłowe. Incydent będzie zgłoszony. ",
          ValidationMessage: null,
          success: false,
          redirectToProfile: false,
          readyToRender: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
        axios.post('http://localhost:4000/panel', null,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
        .then(response => {
            console.log(response.data, 'dsadsadsa')
            if(response.data.IS_VALID !== false)  {
                this.setState({
                    redirectToProfile: true,
                });
            }
        });
        this.setState({
            readyToRender: true     
        });
    }

    
    submitHandler = event => {
        event.preventDefault();
        event.persist();
        const loginSession = {
            email: this.state.email,
            password: this.state.password,
        };
        document.cookie = "";
        axios.post('http://localhost:4000/admin', loginSession, {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' })
        .then(response => {
            if(response.data["TOTAL_WARNINGS"] === 0) {
                this.setState({ValidationMessage: null});
                this.setState({success: true});
            }
            else
                this.setState({ValidationMessage: <ValidationMessage className="white-text" message={this.state.error_message}/>});
        });
    };

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    
  render() {
    if(this.state.redirectToProfile) {
        return <Redirect to="/admin/panel"/>;
    }
    if(!this.state.success && this.state.readyToRender) {
    return (
            <div style={{'backgroundColor': '#37474F', 'height': '100vh'}} className="pt-5">
                <MDBRow className="pt-5">
                    <MDBCol md="10" lg="8" xl="6" className="px-4 mx-auto">
                        <MDBJumbotron className="vertical-center" fluid>
                            <MDBRow className="align-middle w-100">
                                <MDBCol  xs="9" md="8"  xl="7" className="mx-auto">
                                <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                    <p className="h2 text-center mb-4">Logowanie do panelu administratora</p>
                                    <hr className="hr-dark"/>
                                    <div>
                                    <MDBInput
                                        label="Podaj email"
                                        icon="user-cog"
                                        name="email"
                                        type="email"
                                        id="email"
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                    </MDBInput>
                                    <MDBInput
                                        label="Podaj hasło"
                                        icon="lock"
                                        name="password"
                                        type="password"
                                        id="password"
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                    </MDBInput>
                                    {this.state.ValidationMessage}
                                    </div>
                                    <hr className="hr-dark"/>

                                    <div className="text-center mt-4">
                                    <MDBRow>
                                        <div className="col-6" md='6'>
                                            <MDBBtn color="indigo" href="/" className="mx-auto">
                                                uciekam 
                                            </MDBBtn>
                                        </div>
                                        <div className="col-6" md='6'>
                                            <MDBBtn color="danger" type="submit" className="mx-auto">
                                                zaloguj
                                            </MDBBtn>
                                        </div>
                                    </MDBRow>
                                    </div>
                                </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </div>

        ) } else {
            if(this.state.success) {
                return <Redirect to="/admin/panel"/>;
            }
            return "";
        }
    }
};

export default AdminLoginPage;