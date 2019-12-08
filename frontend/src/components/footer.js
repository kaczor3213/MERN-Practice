import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends Component {
  render() {
      return (
    <MDBFooter style={{'backgroundColor': '#3b613c'}} className="font-small pt-4">
      <MDBContainer fluid className="text-center">
        <MDBRow>
        <MDBCol md="4">
            <h5 className="title text-uppercase">twoje konto</h5>
            <hr class="hr-light"/>

            <ul className="px-0">
              <li className="list-unstyled">
                <a href="#!">Profil</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Historia Zamówień</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title text-uppercase">Informacje prawne</h5>
            <hr class="hr-light"/>

            <ul className="px-0">
              <li className="list-unstyled">
                <a href="#!">Regulamin sklepu</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Kontakt</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title text-uppercase">Pomocne linki</h5>
            <hr class="hr-light"/>

            <ul className="px-0">
              <li className="list-unstyled">
                <a href="#!">Kategorie</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Producenci</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Punkty wypożyczenia</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="localhost:3000/"> RolPol.pl </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
      }
}

export default Footer;