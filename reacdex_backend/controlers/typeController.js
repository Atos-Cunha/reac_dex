const { getAllTypes, getTypeImage } = require("../services/typeService");
const path = require("path");

function listTypes(req, res) {
    try {
        const types = getAllTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function getType(req, res) {
    const { filename } = req.params;
    const imagePath = getTypeImage(filename);

    if (!imagePath) {
        return res.status(404).send("Imagem não encontrada");
    }

    res.sendFile(path.resolve(imagePath));
}

module.exports = { listTypes, getType };