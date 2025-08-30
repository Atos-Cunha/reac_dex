const fs = require("fs");
const path = require("path");

function get_all_itens() {
    return JSON.parse(fs.readFileSync("db_pokemon.json"));
}

function get_single_item(id) {
    const list = JSON.parse(fs.readFileSync("db_pokemon.json"));

    const filter_item = list.filter(item => item.id === id)[0];

    return filter_item;
}

function insert_item(new_item) {
    const list = JSON.parse(fs.readFileSync("db_pokemon.json"));

    const new_item_list = [...list, new_iten];

    fs.writeFileSync("db_pokemon.json", JSON.stringify(new_item_list));
}

function modify_item(modification, id) {
    let list = JSON.parse(fs.readFileSync("db_pokemon.json"));
    const modify_index = list.findIndex(item => item.id === id);

    const apply_modification = { ...list[modify_index], ...modification };

    list[modify_index] = apply_modification

    fs.writeFileSync("db_pokemon.json", JSON.stringify(list));
}

function delete_item(id) {
    const list = JSON.parse(fs.readFileSync("db_pokemon.json"));

    const filter_item = list.filter(item => item.id !== id);
    fs.writeFileSync("db_pokemon.json", JSON.stringify(filter_item))

}

function get_img(id) {
    const list = JSON.parse(fs.readFileSync("db_pokemon.json"));

    const filter_item = list.filter(item => item.id === id)[0];

    return filter_item;
}

module.exports = {
    get_all_itens,
    get_single_item,
    insert_item,
    modify_item,
    delete_item,
    get_img
};