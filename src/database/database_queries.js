import db from './database';

export function getItemById(id) {
    let found = db.item.find(element => element.wowhead_id === id);
    return found;
}

export function getComponents(id, rank, r_num) {
    let components = [];
    let recipe_num = r_num ? r_num : 1;
    if (isLegendary(id)) {
        recipe_num = getLegendaryRecipeNumber(id, rank);
    }
    db.crafted_from.forEach(entry =>  {
        if (entry.id_item ===  id && entry.recipe_num === recipe_num) {
            components.push(entry);
        }
    })
    return components;
}

export function getLegendaryRecipeNumber(id, rank) {
    return db.legendary_rank.find(element => element.id_item === id && element.rank === rank).recipe_num;
}

export function hasComponents(id) {
    let found = db.crafted_from.find(element => element.id_item === id);
    return !!found;
}

export function getIdOfLegendary(armor, slot) {
    let a = armor;
    if (slot === 'Neck' ||  slot === 'Ring') {
        a = 'Jewelry';
    }
    if (slot === 'Back') {
        a = 'Cloth';
    }
    let found = db.legendary.find(element => element.armor_type === a && element.slot === slot);
    if (found) {
        return found.id_item;
    }
    return null;
}

export function isLegendary(id) {
    return !!db.legendary.find(element => element.id_item === id);
}

export function divideBy(id) {
    let found = db.makes_duplicates.find(element => element.id_item === id);
    return found ? found.amount_made : 1;
}