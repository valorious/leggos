import React from "react";
import {getItemById, isLegendary} from "../database/database_queries";


export class WowheadLink extends React.Component {
    rankConversion = {
        1: 190,
        2: 210,
        3: 225,
        4: 235,
        5: 249,
        6: 262,
        7: 291
    }


    format  = (id) => {
        let details = '';

        if (isLegendary(id)) {
            details += '&ilvl=' + this.rankConversion[this.props.rank]
        }
        return '\'item=' + id + details + '\'';
    }

    render () {
        return (
            <a href={'https://wowhead.com/item=' + this.props.id} target="_blank" data-wowhead={this.format(this.props.id)}>[{getItemById(this.props.id)? getItemById(this.props.id).name : "Empty"}]</a>
        )
    }
}

export default WowheadLink;