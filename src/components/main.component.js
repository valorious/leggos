import Selection from "./selection.component";
import {Table} from "react-bootstrap";
import React from 'react';
import db from "../database/database";
import ArmorSlots from "./armor-slots.component";
import ItemDisplay from "./item-display.component";
import {getIdOfLegendary} from "../database/database_queries";

export class Main extends React.Component {
    state = {
        currentArmor:  'Cloth',
        currentRank: 1,
        currentSlot: 'Head'
    }
    show = db.crafted_from;

    handleArmorChange = (armor) => {
        this.setState({currentArmor: armor});
    }

    handleRankChange = (rank) => {
        this.setState({currentRank: rank});
    }

    handleSlotSelection = (slot) => {
        this.setState({currentSlot: slot});
    }

    render() {

    return (
        <div>
            <Selection changeArmor= {this.handleArmorChange} changeRank={this.handleRankChange} />
            <Table className="content">

                <tbody>
                    <tr>
                        <td className="left-side">Left Side
                            Currently {this.state.currentSlot}
                            <ArmorSlots currentArmorType={this.state.currentArmor} changeSlot={this.handleSlotSelection} />
                        </td>
                        <td className="right-side">Right Side
                        <ItemDisplay rank={this.state.currentRank} armor={this.state.currentArmor} slot={this.state.currentSlot} id={getIdOfLegendary(this.state.currentArmor, this.state.currentSlot)} />
                        </td>

                    </tr>
                </tbody>
            </Table>
        </div>
    )};

}

export default Main;