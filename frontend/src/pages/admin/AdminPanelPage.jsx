import React from "react";
import axios from "axios";
import { 
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBNav,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import {Redirect} from "react-router-dom";
import equipment_baner from "../../assets/equipment_list.jpg";
import users_baner from "../../assets/users_list.jpg";
    
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
            readyToRender: false,
            equipment_count: null,
            users_count: null,
            orders_7days: null
        };
    }

    componentDidMount() {
        axios.post("http://localhost:4000/panel", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
            if(response.data.IS_VALID === false) {
                this.setState({
                    redirectToLogin: true,
                });
            } else {
                this.setState({
                  equipment_count: response.data.equipment_count,
                  users_count: response.data.users_count,
                  orders_7days: response.data.orders_7days,
                  readyToRender: true
                });
            }
        });
    }
    
    render() {
        if(!this.state.redirectToLogin && this.state.readyToRender) {
            return (
              <div style={{"backgroundColor": "#37474F", "minHeight": "100vh"}}>
                <div className="my-5 py-5 bg-white">
                <MDBNav className="ml-5">
                  <MDBIcon className="my-auto indigo-text " icon="chevron-right"></MDBIcon>
                  <MDBNavLink className="my-auto indigo-text" style={{"fontSize": "120%"}} to="/admin/panel">Panel</MDBNavLink>
                </MDBNav>
                <p className="h2 pb-3 text-center">Panel</p>
                    <MDBRow >
                        <MDBCol md="4" className="p-3 mx-auto bg-white">
                          <MDBCard>
                            <MDBCardImage className="img-fluid" src={equipment_baner} waves />
                            <MDBCardBody>
                              <MDBCardTitle>Sprzęt</MDBCardTitle>
                              <MDBCardText>
                               Łączna ilość sprzętu: <strong>{this.state.equipment_count}</strong>
                              </MDBCardText>
                              <MDBBtn color="success" href="/admin/panel/equipment">Wyświetl</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md="4" className="p-3 mx-auto bg-white">
                          <MDBCard>
                            <MDBCardImage className="img-fluid" src={users_baner} waves />
                            <MDBCardBody>
                              <MDBCardTitle>Użytkownicy</MDBCardTitle>
                              <MDBCardText>
                                Użytkowników w bazie: <strong>{this.state.users_count}</strong>
                              </MDBCardText>
                              <MDBBtn color="primary"href="/admin/panel/users">wyświetl</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                        <MDBCol md="4" className="p-3 mx-auto bg-white">
                          <MDBCard>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                            <MDBCardBody>
                              <MDBCardTitle>Zamówienia</MDBCardTitle>
                              <MDBCardText>
                                Zamówień w ciagu ostatnich 7 dni: <strong>{this.state.orders_7days}</strong>
                              </MDBCardText>
                              <MDBBtn color="warning" href="/admin/panel/orders">wyświetl</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
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