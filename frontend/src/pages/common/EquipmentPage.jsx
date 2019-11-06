import React, { Component } from "react";
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
  MDBBtnGroup,
} from "mdbreact";
import "./EquipmentPage.css";


// class CategoryPicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {category: this.props.category};
//   }

//   makeButtonGroup() {
//     return (
//       <MDBBtnGroup className="mx-auto">
//         {this.gatherAllButtons()}
//       </MDBBtnGroup>
//     );
//   }

//   gatherAllButtons() {
//     let tmp = [];
//     while (this.state.category.length>0)
//       tmp.push(this.makeButton(this.state.category.pop()));
//     return tmp.reverse();
//   }

//   makeButton(category, icon) {
//     return(
//       <MDBNavLink 
//       tag="button"
//       to={"/equipment/category/"+category.toLowerCase()}
//       color="cyan"
//       className="btn btn-default"
//       >
//         {category}
//       </MDBNavLink>
//     );
//   }

//   render() {
//     return this.makeButtonGroup();
//   }
// }

// class EquipmentPicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {equipment: this.props.equipment};
//   }

//   makeEquipmentsRow() {
//     return <MDBRow id="equipment">
//         {this.gatherAllEquipmentsCols()}
//         </MDBRow>;
//   }

//   gatherAllEquipmentsCols() {
//     let tmp = [];
//     while (this.state.equipment.length>0)
//       tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment.pop()));
//     return tmp;
//   }
   
//   makeAnimatedEquipmentCard(equipment) {
//     return (
//     <MDBCol sm="6" md="4" lg="3">
//       <MDBAnimation reveal type="fadeIn">
//         <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
//           <MDBCardImage
//             cascade
//             className="img-fluid"
//             src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg"
//             style={{margin: "auto"}}
//           />
//           <MDBCardBody cascade className="text-center">
//             <MDBCardTitle>
//               <MDBIcon icon="cubes" className="green-text pr-2" />
//               <span class="text-capitalize">{equipment.equipment_type}</span><br/>
//               <strong>{equipment.model}</strong>
//             </MDBCardTitle>
//             <MDBCardText>
//               <strong>Producent: </strong>{equipment.brand}<br/>
//               <p class="success">{equipment.cost_per_day} zł</p>
//             </MDBCardText>
//             <MDBNavLink 
//                 tag="button"
//                 to={"/equipment/"+equipment.id}
//                 color="amber"
//                 className="btn btn-outline-mdb-color btn-sm btn-rounded"
//               >
//                 Obejrz
//             </MDBNavLink>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBAnimation>
//     </MDBCol>
//     );
//   }

//   render() {
//     return (this.makeEquipmentsRow())
//   }
// }

class EquipmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {equipment_arr: [],
                  category_arr: [],
                };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/equipment')
        .then(response => {
            this.setState({ equipment_arr: response.data["equipment"],
                            category_arr: response.data["category"],
                           });
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
              <p class="success">{equipment.cost_per_day} zł</p>
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


  makeButtonGroup() {
    return (
      <MDBBtnGroup className="mx-auto">
        {this.gatherAllButtons()}
      </MDBBtnGroup>
    );
  }

  gatherAllButtons() {
    let tmp = [];
    while (this.state.category_arr.length>0)
      tmp.push(this.makeButton(this.state.category_arr.pop()));
    return tmp.reverse();
  }

  makeButton(category, icon) {
    return(
      <MDBNavLink 
      tag="button"
      to={"/equipment/category/"+category.toLowerCase()}
      color="cyan"
      className="btn btn-default"
      >
        {category}
      </MDBNavLink>
    );
  }
  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>  
        <div className="equipment-page">
          <div className="masker">
          <MDBContainer>
            <MDBRow className="pt-5">
              <MDBCol md="12" className="mt-4 white-text">
                <h2 className="text-center my-5 font-weight-bold">
                  Obejrzyj nasz sprzęt już teraz!
                </h2>
                <hr className="my-5 white" />
                <div className="btn-toolbar" role="toolbar">
                  {this.makeButtonGroup()}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer md="12" className="clear-mask mx-1" style={{"max-width": "1920px"}}>
            <MDBRow>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
              <MDBCol className="mt-4" md="12" lg="10">
                {this.makeEquipmentsRow()}
              </MDBCol>
              <MDBCol md="0" lg="1" style={{"max-width": "90%"}}/>
            </MDBRow>
          </MDBContainer>
          </div>
        </div>
      </>
    );
  }
}

export default EquipmentPage;

