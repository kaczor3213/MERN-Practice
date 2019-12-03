import React from "react";
import axios from 'axios';
import { 
    MDBRow,
    MDBCol,
    MDBInput, 
    MDBBtn,
    MDBNavLink} from 'mdbreact';
    
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        };
    }

    componentDidMount() {

        axios.post('http://localhost:4000/myprofile', null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' }).then(response => {
            console.log(response.data);
        });
    }
    
    render() {
        if(!this.state.success)
            return (<div className="my-5 py-5"></div>);
    }
};

export default ProfilePage;