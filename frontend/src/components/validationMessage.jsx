import React from "react";
import {MDBIcon} from "mdbreact";
class ValidationMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
        };
    }

    render() {
            return(
                <div className="mt-2 mx-3 bg-danger p-2 white-text" style={{'borderRadius': '5px'}}>
                    {this.state.message}
                    <MDBIcon className="ml-1" icon="frown"/> 
                </div>
            );
    }
}

export default ValidationMessage;