import React from "react";
import { 
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon
} from 'mdbreact';
    
class GDLElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.element_id,
            content_type: this.props.content_type,
            params: this.props.params,
        };
       // this.onDelete = this.props.onDelete.bind(this);
    }

    renderParams() {
        let str = ""
        const detail_href = '/admin/panel/' + this.state.content_type+'/details/'+this.state.id
        const edit_href = '/admin/panel/' + this.state.content_type+'/edit/'+this.state.id
        for(var key in this.state.params)
            str += this.state.params[key]+" ";
        return(
            <>
                <div className="col-11 p-0">
                    <MDBRow>
                        <div className="col text-left my-auto">{str}</div>
                        <div className="col  text-right">
                            <MDBBtnGroup className="">
                                <MDBBtn className="px-3" href={detail_href} color="info"><MDBIcon icon="info-circle"/></MDBBtn>
                                <MDBBtn className="px-3" href={edit_href} color="warning"><MDBIcon icon="cogs"/></MDBBtn>
                                <MDBBtn className="px-3" value={this.state.id}  color="danger"><MDBIcon icon="trash-alt"/></MDBBtn>
                            </MDBBtnGroup>
                        </div>
                    </MDBRow>
                </div>
            </>
            );
    }

    render() {
        return (
            <MDBContainer>
                <hr className="hr-dark m-0"/>
                <MDBRow className="bg-white">
                    <div className="col-1 p-0 my-auto text-center"><strong>{this.state.id}</strong></div>
                    {this.renderParams()}
                </MDBRow>
            </MDBContainer>
        );
    }
};

export default GDLElement;