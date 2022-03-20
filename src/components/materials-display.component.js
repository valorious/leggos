import React from 'react';
import WowheadLink from "./wowhead-link.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {divideBy} from "../database/database_queries";

export class MaterialsDisplay extends React.Component {


    handlePlusMinus = (index) => {
        this.props.handlePlusMinus(index);
    }

    convertAmount = (amount, parent_amount, parent_id) => {
        return Math.ceil((amount  * parent_amount)/(divideBy(parent_id)));
    }

    render() {


        return (

            <tbody>
            {this.props.mats.map((mat, index) => {
                return (<React.Fragment key={index}><tr><td className="expansion">
                    {mat.children.length > 0 ?
                        mat.open ? <FontAwesomeIcon onClick={() => this.handlePlusMinus(index)} icon="caret-down" /> : <FontAwesomeIcon onClick={() => this.handlePlusMinus(index)} icon="caret-right" />
                        : null}

                </td><td> {mat.amount} <WowheadLink id={mat.id} /></td></tr>
                {mat.children.length > 0 && mat.open ?
                    mat.children.map((child, index) => {
                    return (
                        <tr key={index}><td></td><td><FontAwesomeIcon icon="angle-double-right"  />{this.convertAmount(child.amount, mat.amount, mat.id)} <WowheadLink id={child.id} /></td></tr>
                    )
                })

                : null}
                </React.Fragment>)
            })}
            </tbody>
        )
    }
}

export default MaterialsDisplay;