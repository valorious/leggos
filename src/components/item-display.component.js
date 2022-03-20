import React from 'react';
import {
    divideBy,
    getComponents,
    getIdOfLegendary,
    getItemById,
    hasComponents,
    isLegendary
} from '../database/database_queries';
import WowheadLink from "./wowhead-link.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCaretRight, faCaretDown, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import MaterialsDisplay from "./materials-display.component";

library.add(faCaretRight);
library.add(faCaretDown);
library.add(faAngleDoubleRight);

export class ItemDisplay extends React.Component {

    state = {
        needsOrigins: false,
        needsEternal: false,
        currentRank: 1,
        vestigeProfession: 3,
        totals: [],
        components: []
    }

    newTotals = [];

    currRank = 1;

    componentDidMount() {
        this.getAllComponentMaterials(this.props.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.rank !== this.props.rank || prevState.needsOrigins !== this.state.needsOrigins || prevState.needsEternal !== this.state.needsEternal) {
            let rank = this.props.rank;
            if (rank === 5) {
                this.setState({needsOrigins: true,
                                    needsEternal: false,
                                    currentRank: 3});
                this.currRank = 3;
            } else if (rank === 6) {
                this.setState({needsOrigins: true,
                                    needsEternal: false,
                                    currentRank: 4});
                this.currRank = 4;
            } else if (rank === 7) {
                this.setState({
                                    needsOrigins: false,
                                    needsEternal: true,
                                    currentRank: 4});
                this.currRank = 4;
            } else {
                this.setState({
                    needsEternal: false,
                    needsOrigins: false,
                    currentRank: rank
                });
                this.currRank = rank;
            }
            this.getAllComponentMaterials(this.props.id);
        }
        if (prevProps.id !== this.props.id) {
            if (this.props.slot === 'Neck' || this.props.slot === 'Ring') {
                this.setState({vestigeProfession: 4});
            } else if (this.props.slot === 'Back' || this.props.armor === 'Cloth') {
                this.setState({vestigeProfession: 3});
            }  else if (this.props.armor === 'Plate') {
                this.setState({vestigeProfession: 1});
            } else {
                this.setState({vestigeProfession: 2});
            }
            this.getAllComponentMaterials(this.props.id);
        }
    }

    getComps = (id, r_num) => {
        if (isLegendary(id)) {
            return getComponents(id, this.currRank);

        }
        return getComponents(id, null, r_num);
    }

    getAllComponentMaterials = (id, r_num) => {
        let rows = [];
        let  currentComps = this.getComps(id, r_num);
        let children = [];
        for (let i=0; i<currentComps.length; i++) {
            children = [];
            if(hasComponents(currentComps[i].id_material)) {
                let childComponents = this.getComps(currentComps[i].id_material);
                for (let j=0; j<childComponents.length;j++) {
                    children.push({
                        id: childComponents[j].id_material,
                        amount: childComponents[j].amount
                    })
                }
            }
            rows.push({
                id: currentComps[i].id_material,
                amount: currentComps[i].amount,
                children: children,
                open: false
            });
        }
        if (this.state.needsOrigins) {
            let vestigeComps = this.getComps(185960, this.state.vestigeProfession);
            console.log(vestigeComps);
            for (let i=0; i<vestigeComps.length; i++) {
                children = [];
                let alreadyInRows = rows.findIndex(element => element.id === vestigeComps[i].id_material);
                if (alreadyInRows >= 0) {
                    rows[alreadyInRows].amount = +rows[alreadyInRows].amount + +vestigeComps[i].amount;
                } else {
                    let childVestigeComponents = this.getComps(vestigeComps[i].id_material);
                    for (let j=0; j<childVestigeComponents.length;j++) {
                        children.push({
                            id: childVestigeComponents[j].id_material,
                            amount: childVestigeComponents[j].amount
                        })
                    }
                    rows.push({
                        id: vestigeComps[i].id_material,
                        amount: vestigeComps[i].amount,
                        children: children,
                        open: false,
                        rip: true
                    })
                }
            }
            console.log(rows);
        } else if (this.state.needsEternal) {
            let vestigeComps = this.getComps(187784, this.state.vestigeProfession);
            for (let i=0; i<vestigeComps.length; i++) {
                children = [];
                let alreadyInRows = rows.findIndex(element => element.id === vestigeComps[i].id_material);
                if (alreadyInRows >= 0) {
                    rows[alreadyInRows].amount = +rows[alreadyInRows].amount + +vestigeComps[i].amount;
                } else {
                    let childVestigeComponents = this.getComps(vestigeComps[i].id_material);
                    for (let j=0; j<childVestigeComponents.length;j++) {
                        children.push({
                            id: childVestigeComponents[j].id_material,
                            amount: childVestigeComponents[j].amount
                        })
                    }
                    rows.push({
                        id: vestigeComps[i].id_material,
                        amount: vestigeComps[i].amount,
                        children: children,
                        open: false,
                        rip: true
                    })
                }
            }
        }
        this.setState({components: rows});
        this.updateRequiredRawMaterials(rows);
    }

    handlePlusMinus = (index) => {
        let components = this.state.components;
        components[index].open = !components[index].open;
        this.setState({components: components});
        this.updateRequiredRawMaterials(components);

    }



    updateRequiredRawMaterials = (components) => {
        let newMats = [];
        let comps = components;
        comps.forEach( (mat) => {
                if (mat.children.length > 0 && mat.open) {
                    mat.children.forEach((child) => {
                        let newChild = {id: child.id};
                        newChild.amt = this.convertAmount(child.amount, mat.amount, mat.id);
                        newMats = this.checkThenAdd(newMats, newChild);
                    });

                } else {
                    mat.amt = mat.amount;
                    newMats =  this.checkThenAdd(newMats, mat);
                }
            });
        this.setState({totals: newMats});
    }

    checkThenAdd  = (currentList, newItem) => {
        let index = currentList.findIndex(element => element.id === newItem.id)
        let newList = [...currentList];
        if (index === -1) {
            newList.push(newItem);
        } else {
            console.log("actually new amount needs to be added");
            console.log([...newList]);
            console.log("add " + newItem.amt + " to " + newList[index].amt);
            newList[index].amt += newItem.amt;
        }
        return newList;
    }

    convertAmount = (amount, parent_amount, parent_id) => {
        return Math.ceil((amount  * parent_amount)/(divideBy(parent_id)));
    }

    render() {

        return (
            <div id="item-display">

                <div id="totals"><div><WowheadLink id={this.props.id} rank={this.props.rank}/> Components:</div>
                <table><tbody>
                    {this.state.totals.map(element => {
                            return <tr key={element.id}><td>{element.amt} <WowheadLink id={element.id} /> </td></tr>;
                    })}
                </tbody></table>
                </div>
                <div id="components">
                    <div>Modify your above mats list down here - expand or minimize resources crafted from others using the arrows.</div>
                    <table>
                        <MaterialsDisplay handlePlusMinus={this.handlePlusMinus} mats={this.state.components} />
                    </table>
                    </div>
            </div>
        );
    }
}


export default ItemDisplay