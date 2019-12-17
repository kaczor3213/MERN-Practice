import React from "react";
import {
    MDBIcon,
    MDBNavLink,
    MDBCardImage,
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
      this.state = {  equipment: this.props.equipment};
    }
  
    makeEquipmentsRow() {
      return <MDBRow id="equipment">
          {this.gatherAllEquipmentsCols()}
          </MDBRow>;
    }
  
    gatherAllEquipmentsCols() {
      let tmp = [];
      var j;
      if(this.props.category === 'none' && this.props.brand === 'none') {
        for(j=0; j<this.state.equipment.length; j++)
          tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[j]));
      }

      if(this.props.brand !== 'none' && this.props.category !== 'none') {
        for(j=0; j<this.state.equipment.length; j++)
          if(this.state.equipment[j].equipment_type === this.props.category && this.state.equipment[j].brand === this.props.brand)
            tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[j]));      
      }

      if(this.props.brand !== 'none' && this.props.category === 'none') {
        for( j=0; j<this.state.equipment.length; j++)
          if(this.state.equipment[j].brand === this.props.brand)
            tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[j]));     
      }

      if(this.props.category !== 'none' && this.props.brand === 'none') {
        for( j=0; j<this.state.equipment.length; j++)
          if(this.state.equipment[j].equipment_type === this.props.category)
            tmp.push(this.makeAnimatedEquipmentCard(this.state.equipment[j]));      
      } 

      if(tmp.length===0)
        return <p className='white-text' style={{'fontSize': '130%'}}>Ups, nie ma takiego sprzętu ... </p>
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
                <span className="text-capitalize">{equipment.equipment_type}</span><br/>
                <strong>{equipment.model}</strong>
              </MDBCardTitle>
                <p><strong>Producent: </strong>{equipment.brand[0].toUpperCase()+equipment.brand.slice(1)}</p>
                <p className="success">{equipment.cost_per_day} zł</p>
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