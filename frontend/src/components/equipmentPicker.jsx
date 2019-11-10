import React from "react";
import {
    MDBIcon,
    MDBNavLink,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCard,
    MDBAnimation,
    MDBCol,
    MDBRow,
    MDBCardBody
} from "mdbreact"

class EquipmentPicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  equipment: this.props.equipment,
                    };
    }
  
    makeEquipmentsRow() {
      return <MDBRow id="equipment">
          {this.gatherAllEquipmentsCols()}
          </MDBRow>;
    }
  
    gatherAllEquipmentsCols() {
      let tmp = [];
      if(this.props.category === undefined) {
        for(var i=0; i<this.state.equipment.length; i++)
          tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[i]));
      } else {
        for(var i=0; i<this.state.equipment.length; i++)
          if(this.state.equipment[i].equipment_type == this.props.category)
            tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[i]));  
      }
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
  
    render() {
      return this.makeEquipmentsRow();
    }
  }
  
  export default EquipmentPicker;