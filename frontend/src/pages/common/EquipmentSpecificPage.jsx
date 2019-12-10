import React, { Component } from "react";
import axios from 'axios';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdbreact";
import SmartPicker from "../../components/SmartPicker";
import EquipmentPicker from "../../components/equipmentPicker";
import "./EquipmentPage.css";

class EquipmentSpecificPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        equipment: undefined,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/equipment/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                id: response.data.id,
                brand: response.data.brand,
                capacity: response.data.capacity,
                cost_per_day: response.data.cost_per_day,
                crop_capacity: response.data.crop_capacity,
                equipment_type: response.data.equipment_type,
                fuel_capacity: response.data.fuel_capacity,
                horsepower: response.data.horsepower,
                image: response.data.image,
                mass: response.data.mass,
                max_speed: response.data.max_speed,
                model: response.data.model,
                power_required: response.data.power_required,
                tyre_type: response.data.tyre_type,
                working_width: response.data.working_width
            })
            console.log(response.data)
        }).catch(function(error){console.log(error);});
  }

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
      //TO JESt TO SUKo
    return(
        <div className="m-5 p-5">
            {/* {this.state.equipment} */}
        </div>
    );
  }
}

export default EquipmentSpecificPage;

