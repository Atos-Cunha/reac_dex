import axios from "axios";

const fav_api = axios.create({ baseURL: "http://localhost:8000/fav" });


async function get_fav() {
    const response = await fav_api.get('/');

    return response.data;
}

async function post_fav(id) {
    await fav_api.post(`/${id}`);
}

async function del_fav(id) {
    await fav_api.delete(`/${id}`);
}

export {
    get_fav,
    post_fav,
    del_fav
}