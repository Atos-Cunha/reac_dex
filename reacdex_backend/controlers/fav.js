const { get_all_favs, insert_fav, remove_fav } = require("../services/fav");

function get_favs(req, res) {
    try {
        const list = get_all_favs();
        res.send(list);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

function post_fav(req, res) {
    try {
        const id = req.params.id;
        insert_fav(id);
        res.status(201);
        res.send("Item favorito inserido com sucesso");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

function delete_fav(req, res) {
    try {
        const id = req.params.id;

        if (id && Number(id)) {
            remove_fav(id);
            res.send("Favorito deletado com sucesso");
        } else {
            res.status(422);
            res.send("ID invalido");
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    get_favs,
    post_fav,
    delete_fav
}