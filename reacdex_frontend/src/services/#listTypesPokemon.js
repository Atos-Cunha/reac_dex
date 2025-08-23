import axios from "axios";

const list_api = axios.create({baseURL: "http://localhost:8000/type"});

async function getType() {
    const response = await list_api.get('/');

    return response.data;
}

export {
    getType
}