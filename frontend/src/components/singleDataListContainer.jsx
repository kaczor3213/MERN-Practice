import React from "react";
import SDLElement from "./singleDataListElement";
import EQUIPMENT_TRANS_PL from "../translation/equipmentParametersTranslation";
import EQUIPMENT_UNITS_PL from "./equipmentUnits";

class SDLContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hash_of_elements: this.props.elements
        };
    }

    renderElements() {
        let tmp = [];
        for(var key in this.state.hash_of_elements)
          if(this.state.hash_of_elements[key] !=null)
            tmp.push(
                <SDLElement 
                    label={EQUIPMENT_TRANS_PL[key]}
                    unit={EQUIPMENT_UNITS_PL[key]}
                    data={this.state.hash_of_elements[key]}
                />
            )
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

export default SDLContainer;

