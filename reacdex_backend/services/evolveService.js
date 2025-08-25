const fs = require("fs");
const path = require("path");

function get_all_itens() {
    return JSON.parse(fs.readFileSync("db_pokemon_evolve.json"));
}

function get_single_item(id) {
    const list = JSON.parse(fs.readFileSync("db_pokemon_evolve.json"));

    const filter_item = list.filter(item => item.id === id)[0];

    return filter_item;
}

module.exports = {
    get_all_itens,
    get_single_item
};