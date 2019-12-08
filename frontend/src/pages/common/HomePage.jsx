import React, { Component } from "react";
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBView,
  MDBBtn,
  MDBNavLink
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
          <div className="masker-home " style={{'padding-top': '4rem', 'padding-bottom': '1rem'}}>
            <MDBRow className="fadeIn vertical-center w-100">
              <MDBCol md="5" lg="4" className="mx-auto headline white p-2 bg-transparent">
                <div className="text-center white-text">
                  <h1 className="display-3 mb-4">
                  <img
                        style={{'height':'9rem', 'width': '9rem' }}
                        src={require('../../assets/logo.png')}
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
                  <MDBRow className="d-flex flex-row justify-content-center w-100">  
                    <MDBBtn>
                      <MDBIcon icon="book" className="mr-2" />
                      <span>Warunki wynajmu</span>
                    </MDBBtn>
                    <MDBBtn href="/equipment" color="success">
                      <MDBIcon icon="fas fa-download" className="mr-2" />
                      <span>Katalog pełnej oferty</span>
                    </MDBBtn>
                  </MDBRow>
                </div>
                <hr class="hr-light"/>
              </MDBCol>
              <MDBCol md="5" lg="4" className="mx-auto white-text p-2">
                <div className="px-3">
                <h3 class="h2 mb-3">Dlaczego my?</h3>
                <p style={{'font-size': '125%'}}>
                  Jesteśmy fimą z wieloletnim doświadczeniem w obsłudze i konserwacji maszyn rolniczych.
                  Wierzymy, że pod dobrą ręką każdy osprzęt może długo i wiernie służyć.
                  Rynek dynamicznie się zmienia, a nie każdy rolnik jest w stanie pozwolić sobie na zakup nowego ciągnika.
                  Dzięki naszej usłudze możesz w dowolnym momencie wynająć maszynę rolniczą do swojej dyspozycji!
                </p>
                </div>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBView>
        <div>
          <section class="mt-5 wow fadeIn">
            <MDBRow>
              <MDBCol className="mb-4">
                <img src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg" class="img-fluid z-depth-1-half" alt=""/>
              </MDBCol>
              <MDBCol md="6" className="mb-4 text-center">
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
        </div>
        <div className="mt-3 mb-5">
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <h2 className="text-center my-5 font-weight-bold">
                  Obejrzyj nasz sprzęt już teraz!
                </h2>
                <hr className="my-5" />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.makeEquipmentsRow()}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
            </MDBRow>
        </div>
      </>
    );
  }
}

export default HomePage;
