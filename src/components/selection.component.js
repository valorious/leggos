import React from "react";
import {Button, ButtonGroup, ButtonToolbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';


export class Selection extends React.Component {
    state = { selection: '',
        currentArmor: 'Cloth',
        currentRank: 1}

    toggleRank = (rank) => {
        this.setState({currentRank: rank});
        this.props.changeRank(rank);
    }
    toggleCurrentArmor = (armor) => {
        this.setState( {currentArmor: armor});
        this.props.changeArmor(armor);
    }

    render() {
        const menuArmorClass = `dropdown-menu${this.state.isOpenArmor ? " show" : ""}`;
        const selectedArmor = '${this.state.currentArmor ? " active" : ""}';
        return (
            <div>
                <div>I am a <ToggleButtonGroup type="radio" name="options" defaultValue={'Cloth'} onChange={this.toggleCurrentArmor}>
                        <ToggleButton id="tbg-radio-1" value={'Cloth'}>
                            Cloth
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={'Leather'}>
                            Leather
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-3" value={'Mail'}>
                            Mail
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-4" value={'Plate'}>
                            Plate
                        </ToggleButton>
                    </ToggleButtonGroup> wearer and I want to make a
                    Rank <ToggleButtonGroup type="radio" name="rank" defaultValue={1} onChange={this.toggleRank}>
                        <ToggleButton id="rank-radio-1" value={1}>1</ToggleButton>
                        <ToggleButton id="rank-radio-2" value={2}>2</ToggleButton>
                        <ToggleButton id="rank-radio-3" value={3}>3</ToggleButton>
                        <ToggleButton id="rank-radio-4" value={4}>4</ToggleButton>
                        <ToggleButton id="rank-radio-5" value={5}>5</ToggleButton>
                        <ToggleButton id="rank-radio-6" value={6}>6</ToggleButton>
                        <ToggleButton id="rank-radio-7" value={7}>7</ToggleButton>
                    </ToggleButtonGroup> legendary.</div></div>
        );
    }
}

export default Selection;