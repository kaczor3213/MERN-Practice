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
            fname: "",
            lname: "",
            email: "",
            city: "",
            state: "",
            zip: ""
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
                <MDBInput
                        className="green-hover"
                        label="Podaj swoje imię"
                        icon="user"
                        name="fname"
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
                <MDBInput
                        className="green-hover"
                        label="Podaj swoje nazwisko"
                        icon="user"
                        name="lname"
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
                <MDBInput
                        className="green-hover"
                        label="Podaj swój adres zamieszkania"
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
                <MDBInput
                        className="green-hover"
                        label="Podaj nazwę swojej miejscowości"
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
            </div>
          <MDBBtn color="primary" type="submit">
            Submit Form
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
