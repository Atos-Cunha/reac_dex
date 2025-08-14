const fs = require("fs");

function get_all_favs() {
    return JSON.parse(fs.readFileSync("fav.json"));
}

function remove_fav(id) {
    const list = JSON.parse(fs.readFileSync("fav.json"));

    const filter_item = list.filter(item => item.id !== id);
    fs.writeFileSync("fav.json", JSON.stringify(filter_item));
}

function insert_fav(id) {
    const list = JSON.parse(fs.readFileSync("db_pokemon.json"));
    const favoritos = JSON.parse(fs.readFileSync("fav.json"));

    const inserted_item = list.find(item => item.id === id);
    const new_fav_list = [...favoritos, inserted_item];
    fs.writeFileSync("fav.json", JSON.stringify(new_fav_list));
}

module.exports = {
    get_all_favs,
    remove_fav,
    insert_fav
};