const { getAllTypesFf, getTypeImageFf, get_all_typesFf, get_single_typeFf } = require("../services/typesFfService");
const path = require("path");

function add_image_path(item) {
    if (!item) return null;
    return {
        ...item,
        imagem: `/typeFf/${item.id}/typesFf`
    };
}

function listTypesFf(req, res) {
    try {
        const typesFf = getAllTypesFf();
        res.json(typesFf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function getTypeFf(req, res) {
    const { filename } = req.params;
    const imagePathFf = getTypeImageFf(filename);

    if (!imagePathFf) {
        return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(path.resolve(imagePath));
}

function get_all(req, res) {
    try {
        const itens = get_all_typesFf().map(add_image_path);
        res.send(itens);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function get_single(req, res) {
    try {
        const id = req.params.id;
        const item = get_single_typeFf(id);

        if (!item) {
            return res.status(404).send("Item não encontrado");
        }

        res.send(add_image_path(item));
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = { listTypesFf, getTypeFf, get_all, get_single };