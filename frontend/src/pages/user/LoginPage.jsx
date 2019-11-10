import React from "react";
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput, 
    MDBBtn,
    MDBBtnGroup, 
    MDBNavLink} from 'mdbreact';

import "./LoginPage.css"


class LoginPage extends React.Component {
  render() {
  return (
            <div className="login-page">
            <div className="masker">
            <MDBContainer className="py-5">
            <MDBRow className="py-5">
                <MDBCol md="6" className="mx-auto">
                <form>
                    <p className="h2 text-center white-text mb-4">Logowanie</p>
                    <hr className="white"/>
                    <div className="grey-text">
                    <MDBInput
                        className="green-hover"
                        label="Podaj swój email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                    />
                    <MDBInput
                    className="green-hover"
                        label="Podaj swoje hasło"
                        icon="lock"
                        group
                        type="password"
                        validate
                    />
                    </div>
                    <hr className="white"/>
                    <p className="h5 text-center white-text mb-2">Bądź zaloguj się z:</p>
                    <div className="text-center">
                        <MDBBtnGroup>
                            <MDBBtn className="custom-btn whitey-text mx-4"><i class="fab fa-facebook-f fa-2x"></i></MDBBtn>
                            <MDBBtn className="custom-btn whitey-text mx-4"><i class="fab fa-google-plus-g fa-2x"></i></MDBBtn>
                            <MDBBtn className="custom-btn whitey-text mx-4"><i class="fab fa-instagram fa-2x"></i></MDBBtn>
                        </MDBBtnGroup>
                    </div>
                    <hr className="white"/>

                    <div className="text-center mt-4">
                    <MDBBtnGroup>
                        <MDBNavLink 
                            tag="button"
                            to="/register"
                            color="amber"
                            className="btn whitey-text custom-btn mx-5"
                        >
                            Rejestracja
                        </MDBNavLink>
                        <MDBBtn type="submit" className="mx-5 whitey-text custom-btn">Login</MDBBtn>
                    </MDBBtnGroup>
                    </div>
                </form>
                
                </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
            </div>
        );
    }
};

export default LoginPage;