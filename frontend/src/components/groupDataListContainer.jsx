import React from "react";

import GDLElement from "./groupDataListElement";

class GDLContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_of_elements: this.props.elements
        };
    }
    renderElements() {
        let tmp = [];
        if(this.props.elements !== undefined) {
            this.state.array_of_elements.forEach( function(e) {
                tmp.push(<GDLElement
                    element_id={e.id}s
                    content_type={e.content_type}
                    params={e.params}
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