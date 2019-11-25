import React from "react";
import axios from 'axios';
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
    } from 'mdbreact';
import ValidationMessage from "../../components/validationMessage";
import "./LoginPage.css";
import { Redirect } from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        firstName_error: null,
        lastName: "",
        lastName_error: null,
        email: "",
        email_error: null,
        phoneNumber: "",
        phoneNumber_error: null,
        address: "",
        address_error: null,
        place: "",
        place_error: null,
        postCode: "",
        postCode_error: null,
        password: "",
        password_r: "",
        password_error: null,
        rules: "",
        rules_error: null,
        success: false,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
        
    submitHandler = event => {
      event.preventDefault();
      event.persist();

      const newUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          place: this.state.place,
          postCode: this.state.postCode,
          password: this.state.password,
          password_r: this.state.password_r,
          rules: this.state.rules,
      };
      
      axios.post('http://localhost:4000/register', newUser)
        .then(response => {
            console.log(response.data);
            if(response.data["TOTAL_WARNINGS"] === 0)
                this.setState({success: true})
            else {
                this.setState({
                    firstName_error: response.data["WRONG_FIRST_NAME"]?<ValidationMessage message="Podaj poprawne imię. "/>:null,
                    lastName_error: response.data["WRONG_LAST_NAME"]?<ValidationMessage message="Podaj poprawne nazwisko. "/>:null,
                    email_error: response.data["WRONG_EMAIL"]?<ValidationMessage message="Podaj poprawny adres email. "/>:null,
                    address_error: response.data["WRONG_ADDRESS"]?<ValidationMessage message="Podaj poprawny adres. "/>:null,
                    place_error: response.data["WRONG_PLACE"]?<ValidationMessage message="Podaj poprawną miejscowość. "/>:null,
                    phoneNumber_error: response.data["WRONG_PHONE_NUMBER"]?<ValidationMessage message="Podaj poprawny n. telefonu. "/>:null,
                    postCode_error: response.data["WRONG_POST_CODE"]?<ValidationMessage message="Podaj poprawny kod pocztowy. "/>:null,
                    password_error: response.data["WRONG_PASSWORD"]?<ValidationMessage message="Złe hasło. "/>:null,
                    rules_error: response.data["RULES_ERROR"]?<ValidationMessage message="Należy wyrazić zgodę na regulamin serwisu. "/>:null
                })
                this.setState({
                    email_error: response.data["OCCUPIED_EMAIL"]?<ValidationMessage message="Zajęty adres email. "/>:this.state.email_error,
                    phoneNumber_error: response.data["OCCUPIED_PHONE_NUMBER"]?<ValidationMessage message="Zajęty numer telefonu. "/>:this.state.phoneNumber_error,
                    password_error: response.data["PASSWORDS_DONT_MATCH"]?<ValidationMessage message="Podane hasła się nie pokrywają. "/>:this.state.password_error,
                })

            }
        });
    };
    
    handleInputChange(event) {
        this.setState({
        [event.target.name]: event.target.value
        });
        console.log(event.target.value)
    }
        
    render() {
        if(!this.state.success) 
            return (
        <div className="login-page">
        <div className="masker">
        <MDBContainer className="py-5">
        <MDBRow className="py-5">
            <MDBCol md="8" lg="7" className="mx-auto">
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
                        />
                        {this.state.firstName_error}
                        </MDBCol>
                        <MDBCol md="6" >
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
                        />
                        {this.state.lastName_error}
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
                        />
                        {this.state.email_error}
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
                        />
                        {this.state.phoneNumber_error}
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
                            />
                            {this.state.address_error}
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
                            />
                            {this.state.place_error}
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
                            />
                            {this.state.postCode_error}
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
                            />
                            {this.state.password_error}
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
                            />
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <hr className="white"/>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" value="true" name="rules" className="custom-control-input" id="defaultUnchecked" onChange={this.handleInputChange}/>
                        <label className="custom-control-label" htmlFor="defaultUnchecked">*Wyrażam zgodę na przetwarzanie danych osobowych i zgadzam się z regulaminem wypożyczalni.</label>
                        <div className="invalid-tooltip">W celu korzystania z serwisu należy wyrazić zgodę na regulamin wypożyczalni.</div>
                        <div className="valid-tooltip">Wygląda dobrze!</div>
                    </div>
                    {this.state.rules_error}

                </div>
            <MDBBtn className="custom-btn whitey-text" type="submit">
                { "Potwierdź" }
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
