import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink,
  MDBMask,
  MDBView,
  MDBBtn
} from "mdbreact";
import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {equipment_arr: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/')
        .then(response => {
            this.setState({ equipment_arr: response.data });
            console.log(this.state.equipment_arr);
        })
        .catch(function (error){
            console.log(error);
        })
  }

  makeEquipmentsRow() {
    return <MDBRow id="brands">
        {this.gatherAllEquipmentsCols()}
        </MDBRow>;
  }

  gatherAllEquipmentsCols() {
    let tmp = [];
    while (this.state.equipment_arr.length>0)
      tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment_arr.pop()));
    return tmp;
  }
  
  makeAnimatedEquipmentCard(equipment) {
    return (
    <MDBCol sm="6" md="4" lg="3">
      <MDBAnimation reveal type="fadeIn">
        <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
          <MDBCardImage
            cascade
            className="img-fluid"
            src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg"
            style={{margin: "auto"}}
          />
          <MDBCardBody cascade className="text-center">
            <MDBCardTitle>
              <MDBIcon icon="cubes" className="green-text pr-2" />
              <span class="text-capitalize">{equipment.equipment_type}</span><br/>
              <strong>{equipment.model}</strong>
            </MDBCardTitle>
            <MDBCardText>
              <strong>Producent: </strong>{equipment.brand}<br/>
              <strong>Koszt (1 dzień): </strong><p class="success">{equipment.cost_per_day} zł</p>
            </MDBCardText>
            <MDBNavLink 
                tag="button"
                to={"/equipment/"+equipment.id}
                color="amber"
                className="btn btn-outline-mdb-color btn-sm btn-rounded"
              >
                Obejrz
            </MDBNavLink>
          </MDBCardBody>
        </MDBCard>
      </MDBAnimation>
    </MDBCol>
    );
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>  
        <MDBView className="landing-page">
          <MDBMask overlay="stylish-strong" style={{'padding-top': '4rem', 'padding-bottom': '1rem'}}>
            <MDBRow className="fadeIn vertical-center">
              <MDBCol md="5" lg="4" className="mx-auto headline white p-2 bg-transparent">
              <div className="text-center white-text">
                <h1 className="display-3 mb-4">
                <img
                      style={{'height':'9rem', 'width': '9rem' }}
                      src={require('../assets/logo.png')}
                      alt="mdbreact-logo"
                      className="pr-2 d-inline"
                    />
                  <strong className="font-weight-bold">
                    RolPol
                  </strong>
                  <hr class="hr-light"/>
                </h1>
                <h3>Od ponad <strong>30 lat</strong> na rynku</h3>
                <h5 className="pb-4">Chcemy się podzielić pasją, doświadczeniem i dobrym sprzętem.</h5>
                <MDBRow className="d-flex flex-row justify-content-center">  
                  <MDBBtn outline>
                    <MDBIcon icon="book" className="mr-2" />
                    <span className="font-weight-bold">Warunki wynajmu</span>
                  </MDBBtn>
                  <MDBBtn outline color="success">
                    <MDBIcon icon="fas fa-download" className="mr-2" />
                    <span className="font-weight-bold">Katalog pełnej oferty</span>
                  </MDBBtn>
                </MDBRow>
              </div>
              </MDBCol>
              <MDBCol md="5" lg="4" className="mx-auto headline white z-depth-1 p-2">
                  <MDBCardBody className="bg-white">
                    <form name="">
                      <h3 class="dark-grey-text text-center">
                        <strong>Zapisz się na nasz newsletter:</strong>
                      </h3>
                      <hr/>
                      <div class="md-form">
                        <i class="fas fa-user prefix grey-text"></i>
                        <input type="text" id="form3" class="form-control"/>
                        <label for="form3">Imię</label>
                      </div>
                      <div class="md-form">
                        <i class="fas fa-envelope prefix grey-text"></i>
                        <input type="text" id="form2" class="form-control"/>
                        <label for="form2">Email</label>
                      </div>
                      <div class="text-center">
                        <hr/>
                        <fieldset class="form-check">
                          <input type="checkbox" class="form-check-input" id="checkbox1" required/>
                          <label for="checkbox1" class="form-check-label dark-grey-text">*Wyrażam zgodę na przetwarzanie moich danych osobowych</label>
                        </fieldset>
                      </div>
                      <div class="text-center">
                        <MDBBtn type="submit" outline color="primary">
                          <MDBIcon icon="fas fa-paper-plane" className="mr-1" />
                          <strong>Subskrybuj</strong>                
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBMask>
        </MDBView>
        <MDBContainer>
          <section class="mt-5 wow fadeIn">
            <MDBRow>
              <MDBRow>
                <MDBCol className="mb-4 text-center ">
                <h3 class="h3 mb-3">Dlaczego my?</h3>
                  <p>Jesteśmy fimą z wieloletnim doświadczeniem w obsłudze i konserwacji maszyn rolniczych.
                  Wierzymy, że pod dobrą ręką każdy osprzęt może długo i wiernie służyć.
                  Rynek dynamicznie się zmienia, a nie każdy rolnik jest w stanie pozwolić sobie na zakup nowego ciągnika.
                  Dzięki naszej usłudze możesz w dowolnym momencie wynająć maszynę rolniczą do swojej dyspozycji!</p>
                  <hr/>
                </MDBCol>
              </MDBRow>
              <MDBCol className="mb-4">
                <img src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg" class="img-fluid z-depth-1-half" alt=""/>
              </MDBCol>
              <MDBCol md="6" className="mb-4">
                <p>
                  mamy <strong>200+</strong> maszyn rolniczych do wynajęcia,
                  zatrudniamy <strong>48</strong> wyszkolonych i doświadczonych operatorów,
                  w razie usterki pokrywamy do <strong>100.000 zł</strong> z ubezpieczenia, 
                  dajemy <strong>pełną gwarancję</strong>, a w razie usterki dostarczamy sprzęt zastępczy bez dodatkowych kosztów
                </p>
                <MDBBtn className="dusty-grass-gradient">
                  Katalog pełnej oferty
                  <i class="fas fa-download ml-1"></i>
                </MDBBtn>
                <MDBBtn outline color="danger">
                  Wspiera nas
                  <i class="fab fa-youtube ml-1"></i>
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </section>
          <hr class="my-5"/>
          <section>
            <h3 class="h3 text-center mb-5">O naszej ofercie</h3>
            <MDBRow class="row wow fadeIn">
              <MDBCol lg="6" md="12" className="px-4">
                <MDBRow>
                  <MDBCol size="1" className="mr-3">
                    <MDBIcon icon="fas fa-tractor fa-2x" className="green-text"/>
                  </MDBCol>
                  <MDBCol size="10">
                    <h5 class="feature-title">Duże maszyny</h5>
                    <p class="grey-text">Dysponujemy ciagnikami, kombajnami i innym ciężkim sprzętem.</p>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol size="1" className="mr-3">
                    <MDBIcon icon="fas fa-car-crash fa-2x" className="orange-text"/>
                  </MDBCol>
                  <MDBCol size="10">
                    <h5 class="feature-title">Szerokie ubezpieczenie</h5>
                    <p class="grey-text">Na każdą maszynę mamy różne formy ubezpieczenia, asekurując udany wynajm.
                    </p>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol size="1" className="mr-3">
                    <MDBIcon icon="fas fa-wrench fa-2x" className="grey-text"/>
                  </MDBCol>
                  <MDBCol size="10">
                    <h5 class="feature-title">Serwis i jakość</h5>
                    <p class="grey-text">Każda maszyna ma aktualne badania techniczne, jest w pełni sprawna, a w razie drobnej awarii dokonujemy szybkiej naprawy.
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol lg="6" md="12">
                <p class="h5 text-center mb-4">Zobacz nasz sprzęt w akcji!</p>
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/mu_SnrMacwA" allowfullscreen></iframe>
                </div>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
        <div className="mt-3 mb-5">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <h2 className="text-center my-5 font-weight-bold">
                  Obejrzyj nasz sprzęt już teraz!
                </h2>
                <hr className="my-5" />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer md="12" className="mx-1" style={{"max-width": "1920px"}}>
            <MDBRow>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.makeEquipmentsRow()}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default HomePage;
