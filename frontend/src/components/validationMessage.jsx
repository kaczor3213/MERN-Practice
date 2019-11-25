import React from "react";

class ValidationMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
        };
    }

    render() {
            return(
                <div className="bg-danger p-2" style={{'borderRadius': '5px'}}>
                {this.state.message}
                <i class="far fa-frown"></i> 
                </div>
            );
    }
}

export default ValidationMessage;