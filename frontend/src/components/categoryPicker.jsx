import React from "react";
import {
    MDBBtn
} from "mdbreact"

class CategoryPicker extends React.Component {

    constructor(props) {
      super(props);
      this.state = {category: this.props.category};
    }
  
    render() {
      return (
        <MDBBtn 
        onClick ={e=>this.props.onClick(e)}
        color="light-green"
        value={this.state.category}
        >
          {this.state.category}
        </MDBBtn>
      );
    }
  }
  
export default CategoryPicker;