import React from "react";
import axios from "axios";
import ValidationMessage from "../../components/validationMessage";
import {Redirect} from "react-router-dom";
import { 
    MDBRow,
    MDBCol,
    MDBInput, 
    MDBBtn,
    MDBNavLink} from "mdbreact";
import "./css/LoginPage.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          error_message: "Podany email, bądź hasło są nieprawidłowe. Spróbuj ponownie. ",
          ValidationMessage: null,
          success: false,
          redirectToProfile: false,
          readyToRender: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        axios.post("http://localhost:4000/myprofile", null,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
        .then(response => {
            if(response.data.IS_VALID !== false)
                this.setState({redirectToProfile: true});
        });
        this.setState({readyToRender: true});
    }

    submitHandler = event => {
        event.preventDefault();
        event.persist();
        const loginSession = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post("http://localhost:4000/login", loginSession, {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
        .then(response => {
            if(response.data["TOTAL_WARNINGS"] === 0)
                this.setState({ValidationMessage: null, success: true});
            else
                this.setState({ValidationMessage: <ValidationMessage message={this.state.error_message}/>});
        });
    };

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    
  render() {
    if(this.state.redirectToProfile) {
        return <Redirect to="/myprofile"/>;
    }
    if(!this.state.success && this.state.readyToRender) {
    return (
        <div className="login-page">
            <div className="masker">
                <div className="py-5">
                    <MDBRow className="p-5 w-100">
                        <MDBCol md="6" xl="4" className="mx-auto">
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                            <p className="h2 text-center white-text mb-4">Logowanie</p>
                            <hr className="white"/>
                            <div className="whitey-text">
                            <MDBInput
                                        className="green-hover"
                                        label="Podaj swój email"
                                        icon="at"
                                        name="email"
                                        type="email"
                                        id="email"
                                        error="wrong"
                                        success="right"
                                        onChange={this.handleInputChange}
                                        required
                                        >
                            </MDBInput>
                            <MDBInput
                                            className="green-hover"
                                            label="Podaj hasło"
                                            icon="lock"
                                            name="password"
                                            type="password"
                                            id="password"
                                            error="wrong"
                                            success="right"
                                            onChange={this.handleInputChange}
                                            required
                                        >
                            </MDBInput>
                            {this.state.ValidationMessage}
                            </div>
                            <hr className="white"/>
                            <p className="h5 text-center white-text mb-2">Bądź zaloguj się z:</p>
                            <div className="text-center">
                                <MDBRow>
                                    <MDBCol className="px-0">
                                        <MDBBtn className="custom-btn whitey-text px-3"><i className="fab fa-facebook-f fa-2x"></i></MDBBtn>
                                    </MDBCol>
                                    <MDBCol className="px-0">
                                        <MDBBtn className="custom-btn whitey-text  px-3"><i className="fab fa-google-plus-g fa-2x"></i></MDBBtn>
                                    </MDBCol>
                                    <MDBCol className="px-0">
                                        <MDBBtn className="custom-btn whitey-text  px-3"><i className="fab fa-instagram fa-2x"></i></MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                            <hr className="white"/>

                            <div className="text-center mt-4">
                            <MDBRow>
                                <MDBCol sm="6">
                                    <MDBNavLink tag="button" to="/register" style={{"display": "inline-block"}} className="mx-auto btn whitey-text custom-btn">
                                        Rejestracja
                                    </MDBNavLink>
                                </MDBCol>
                                <MDBCol sm="6">
                                    <MDBBtn type="submit" className="mx-auto whitey-text custom-btn">
                                        Login
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        </div>
        ) } else {
            if(this.state.success) {
                return <Redirect to="/myprofile"/>;
            }
            return "";
        }
    }
};

export default LoginPage;