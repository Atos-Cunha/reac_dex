import axios from "axios";
const reacdex_api = axios.create({baseURL: "http://localhost:8000/home"});

async function get_all_itens() {
    const response = await reacdex_api.get('/');

    return response.data;
}

export {
    get_all_itens
}
