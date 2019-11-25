import React from "react";
import axios from 'axios';
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
    } from 'mdbreact';

import "./LoginPage.css";
import { Redirect } from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        email_w: "Podaj poprawny adres email.",
        password: "",
        password_w: "Zbyt słabe hasło.",
        password_r: "",
        password_r_w: "Podane hasła są róźne.",
        success: false,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
        
    submitHandler = event => {
      event.preventDefault();
      event.persist();

      const loginSession = {
          email: this.state.email,
          password: this.state.password,
          password_r: this.state.password_r
      };
      
      axios.post('http://localhost:4000/register', newUser)
        .then(response => {
            console.log(response.data);

            event.target.className += " was-validated";
            if(response.data["TOTAL_WARNINGS"] === 0)
                this.setState({success: true})
            else
                event.target.className += " was-validated";
        });
    };
    
    
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
        
    render() {
        if(!this.state.success) 
            return (
        <div className="login-page">
        <div className="masker">
        <MDBContainer className="py-5">
        <MDBRow className="py-5">
            <MDBCol md="6" className="mx-auto">
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                <p className="h2 text-center white-text mb-4">Rejestracja</p>
                <hr className="white"/>
                <div className="whitey-text">
                <div>
                    <MDBRow>
                        <MDBCol md="6">
                        <MDBInput
                                className="green-hover"
                                label="Podaj swoje imię"
                                icon="user"
                                name="firstName"
                                type="text"
                                id="firstName"
                                error="wrong"
                                success="right"
                                onChange={this.handleInputChange}
                                required
                            >
                            <div className="invalid-tooltip">{this.state.firstName_w}</div>
                            <div className="valid-tooltip">Wygląda dobrze!</div>
                        </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                        <MDBInput
                                className="green-hover"
                                label="Podaj swoje nazwisko"
                                name="lastName"
                                type="text"
                                id="lastName"
                                error="wrong"
                                success="right"
                                onChange={this.handleInputChange}
                                required
                            >
                            <div className="invalid-tooltip">{this.state.lastName_w}</div>
                            <div className="valid-tooltip">Wygląda dobrze!</div>
                        </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
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
                            <div className="invalid-tooltip">{this.state.email_w}</div>
                            <div className="valid-tooltip">Wygląda dobrze!</div>
                        </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                        <MDBInput
                                className="green-hover"
                                label="Podaj numer telefonu"
                                icon="phone"
                                name="phoneNumber"
                                type="tel"
                                id="phoneNumber"
                                error="wrong"
                                success="right"
                                onChange={this.handleInputChange}
                                required
                            >
                            <div className="invalid-tooltip">{this.state.phoneNumber_w}</div>
                            <div className="valid-tooltip">Wygląda dobrze!</div>
                        </MDBInput>
                        </MDBCol>
                    </MDBRow>
                    </div>
                    <hr className="white"/>
                    <div>
                        <MDBRow>
                            <MDBCol md="6">
                            <MDBInput
                                    className="green-hover"
                                    label="Podaj adres zam."
                                    icon="home"
                                    name="address"
                                    type="text"
                                    id="address"
                                    error="wrong"
                                    success="right"
                                    onChange={this.handleInputChange}
                                    required
                                >
                                <div className="invalid-tooltip">{this.state.address_w}</div>
                                <div className="valid-tooltip">Wygląda dobrze!</div>
                            </MDBInput>
                            </MDBCol>
                            <MDBCol md="6">
                            <MDBInput
                                    className="green-hover"
                                    label="Podaj miejscowość"
                                    icon="city"
                                    name="place"
                                    type="text"
                                    id="place"
                                    error="wrong"
                                    success="right"
                                    onChange={this.handleInputChange}
                                    required
                                >
                                <div className="invalid-tooltip">{this.state.place_w}</div>
                                <div className="valid-tooltip">Wygląda dobrze!</div>
                            </MDBInput>
                            </MDBCol>
                            <MDBCol md="6">
                            <MDBInput
                                    className="green-hover"
                                    label="Podaj kod pocztowy"
                                    icon="envelope"
                                    name="postCode"
                                    type="text"
                                    id="postCode"
                                    error="wrong"
                                    success="right"
                                    onChange={this.handleInputChange}
                                    required
                                >
                                <div className="invalid-tooltip">{this.state.postCode_w}</div>
                                <div className="valid-tooltip">Wygląda dobrze!</div>
                            </MDBInput>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <hr className="white"/>
                    <div>
                        <strong>Haslo powinno składać się z conajmniej 9 znaków w tym jedna duża litera, cyfra i znak specjalny.</strong>
                        <MDBRow>
                            <MDBCol md="6">
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
                                <div className="invalid-tooltip">{this.state.password_w}</div>
                                <div className="valid-tooltip">Wygląda dobrze</div>
                            </MDBInput>
                            </MDBCol>
                            <MDBCol md="6">
                            <MDBInput
                                    className="green-hover"
                                    label="Powtórz hasło"
                                    name="password_r"
                                    type="password"
                                    id="password_r"
                                    error="wrong"
                                    success="right"
                                    onChange={this.handleInputChange}
                                    required
                                >
                                <div className="invalid-tooltip">{this.state.password_r_w}</div>
                            </MDBInput>
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <hr className="white"/>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
                        <label className="custom-control-label" htmlFor="defaultUnchecked">*Wyrażam zgodę na przetwarzanie danych osobowych i zgadzam się z regulaminem wypożyczalni.</label>
                        <div className="invalid-tooltip">W celu korzystania z serwisu należy wyrazić zgodę na regulamin wypożyczalni.</div>
                        <div className="valid-tooltip">Wygląda dobrze!</div>
                    </div>
                </div>
            <MDBBtn className="custom-btn whitey-text" type="submit">
                {" Potwierdź (" +this.state.success+")"}
            </MDBBtn>
            </form>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
        </div>);
        else
            return <Redirect to="/"/>;
}
};

export default RegisterPage;
