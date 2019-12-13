import React from "react";

import GDLElement from "./groupDataListElement";

class GDLContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_of_elements: this.props.elements
        };
        //this.onDelete = this.props.onDelete.bind(this);
    }
    renderElements() {
        let tmp = [];
        if(this.props.elements !== undefined) {
            this.state.array_of_elements.forEach( function(e) {
                tmp.push(<GDLElement
                    element_id={e.id}
                    content_type={e.content_type}
                    params={e.params}
                    // onDelete={e.onDelete}
                />);
            });
        }
        return tmp;
    }
    
    render() {
        return (
            <div>
                {this.renderElements()}
            </div>
        );
    }
};

export default GDLContainer;