const { get_all_itens, get_single_item } = require("../services/evolveService");
const path = require("path");

function add_image_path(item) {
    if (!item) return null;
    return {
        ...item,
        imagem: `/home/${item.id}/img_pokemon`
    };
}

function get_all_evolves(req, res) {
    try {
        const itens = get_all_itens().map(add_image_path);
        res.send(itens);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function get_single_evolve(req, res) {
    try {
        const id = req.params.id;
        const item = get_single_item(id);

        if (!item) {
            return res.status(404).send("Item não encontrado");
        }

        res.send(add_image_path(item));
    } catch (error) {
        res.status(500).send(error.message);
    }
} 

module.exports = {
    get_all_evolves,
    get_single_evolve
};
