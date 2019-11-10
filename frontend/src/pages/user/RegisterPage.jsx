import React from "react";
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
    } from 'mdbreact';

import "./LoginPage.css";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            city: "",
            zip: "",
            password: "",
            password_r: ""
          };
    }
        
    submitHandler = event => {
      event.preventDefault();
      event.target.className += " was-validated";
    };
    
    changeHandler = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
        
    render() {
  return (
    <div className="login-page">
    <div className="masker">
    <MDBContainer className="py-5">
      <MDBRow className="py-5">
        <MDBCol md="6" className="mx-auto">
        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
            <p className="h2 text-center white-text mb-4">Rejestracja</p>
            <hr className="white"/>
            <div className="grey-text">
            <div>
                <MDBRow>
                    <MDBCol md="6">
                    <MDBInput
                            className="green-hover"
                            label="Podaj swoje imię"
                            icon="user"
                            name="firstname"
                            type="text"
                            id="firstname"
                            error="wrong"
                            success="right"
                            onChange={this.changeHandler}
                            required
                        >
                        <div className="invalid-tooltip">Please provide a valid first name.</div>
                        <div className="valid-tooltip">Looks good!</div>
                    </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                    <MDBInput
                            className="green-hover"
                            label="Podaj swoje nazwisko"
                            name="lastname"
                            type="text"
                            id="lastname"
                            error="wrong"
                            success="right"
                            onChange={this.changeHandler}
                            required
                        >
                        <div className="invalid-tooltip">Please provide a valid last name.</div>
                        <div className="valid-tooltip">Looks good!</div>
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
                            onChange={this.changeHandler}
                            required
                        >
                        <div className="invalid-tooltip">Please provide a valid email.</div>
                        <div className="valid-tooltip">Looks good!</div>
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
                                onChange={this.changeHandler}
                                required
                            >
                            <div className="invalid-tooltip">Please provide a valid address.</div>
                            <div className="valid-tooltip">Looks good!</div>
                        </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                        <MDBInput
                                className="green-hover"
                                label="Podaj miejscowość"
                                icon="city"
                                name="city"
                                type="text"
                                id="city"
                                error="wrong"
                                success="right"
                                onChange={this.changeHandler}
                                required
                            >
                            <div className="invalid-tooltip">Please provide a valid address.</div>
                            <div className="valid-tooltip">Looks good!</div>
                        </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                        <MDBInput
                                className="green-hover"
                                label="Podaj kod pocztowy"
                                icon="envelope"
                                name="postalcode"
                                type="text"
                                id="postalcode"
                                error="wrong"
                                success="right"
                                onChange={this.changeHandler}
                                required
                            >
                            <div className="invalid-tooltip">Please provide a valid address.</div>
                            <div className="valid-tooltip">Looks good!</div>
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
                                label="Podaj hasło"
                                icon="lock"
                                name="password"
                                type="password"
                                id="password"
                                error="wrong"
                                success="right"
                                onChange={this.changeHandler}
                                required
                            >
                            <div className="invalid-tooltip">Please provide a valid address.</div>
                            <div className="valid-tooltip">Looks good!</div>
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
                                onChange={this.changeHandler}
                                required
                            >
                            <div className="invalid-tooltip">Please provide a valid address.</div>
                            <div className="valid-tooltip">Looks good!</div>
                        </MDBInput>
                        </MDBCol>
                    </MDBRow>
                </div>
                <hr className="white"/>

                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultUnchecked"/>
                    <label class="custom-control-label" for="defaultUnchecked">*Wyrażam zgodę na przetwarzanie danych osobowych i zgadzam się z regulaminem wypożyczalni.</label>
                </div>
            </div>
          <MDBBtn className="custom-btn whitey-text" type="submit">
            Potwierdź
          </MDBBtn>
        </form>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
    </div>
    </div>
  );
}
};

export default RegisterPage;
