import React from 'react';

export class ArmorSlots extends React.Component {

    state = {currentSlot: 'Head'};

    toggleCurrentSlot = (slot) => {
            this.setState({currentSlot: slot});
            this.props.changeSlot(slot);
        }


    render () {

        return (
            <div id='armor-area'>ARMOR! {this.props.currentArmorType} {this.state.currentSlot}
            <table><tbody>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Head" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_head.jpg')} onClick={() => this.toggleCurrentSlot("Head")} width="80px" height="80px"></img></td><td className='empty'></td>
                <td className={'armor-content ' + (this.state.currentSlot === "Hands" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_hand.jpg')} onClick={() => this.toggleCurrentSlot("Hands")}  width="80px" height="80px"></img></td></tr>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Neck" ? 'selected' : '')} ><img src={require('../images/neck.jpg')} onClick={() => this.toggleCurrentSlot("Neck")}  width="80px" height="80px"></img></td><td className='empty'></td>
                <td className={'armor-content ' + (this.state.currentSlot === "Waist" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_waist.jpg')} onClick={() => this.toggleCurrentSlot("Waist")}  width="80px" height="80px"></img></td></tr>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Shoulder" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_shoulder.jpg')} onClick={() => this.toggleCurrentSlot("Shoulder")}  width="80px" height="80px"></img></td><td className='empty'></td>
                <td className={'armor-content ' + (this.state.currentSlot === "Legs" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_legs.jpg')} onClick={() => this.toggleCurrentSlot("Legs")}  width="80px" height="80px"></img></td></tr>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Back" ? 'selected' : '')} ><img src={require('../images/cloth_back.jpg')} onClick={() => this.toggleCurrentSlot("Back")}  width="80px" height="80px"></img></td><td className='empty'></td>
                <td className={'armor-content ' + (this.state.currentSlot === "Feet" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_feet.jpg')} onClick={() => this.toggleCurrentSlot("Feet")}  width="80px" height="80px"></img></td></tr>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Chest" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_chest.jpg')} onClick={() => this.toggleCurrentSlot("Chest")}  width="80px" height="80px"></img></td><td className='empty'></td>
                <td className={'armor-content ' + (this.state.currentSlot === "Ring" ? 'selected' : '')} ><img src={require('../images/ring.jpg')} onClick={() => this.toggleCurrentSlot("Ring")}  width="80px" height="80px"></img></td></tr>
            <tr><td className={'armor-content ' + (this.state.currentSlot === "Wrist" ? 'selected' : '')} ><img src={require('../images/'+ this.props.currentArmorType.toLowerCase() +  '_wrist.jpg')} onClick={() => this.toggleCurrentSlot("Wrist")}  width="80px" height="80px"></img></td><td className='empty'></td><td className='empty'></td></tr>
            </tbody></table></div>
        );
    }
}


export default ArmorSlots;