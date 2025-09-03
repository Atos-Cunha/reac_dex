import axios from "axios";

const list_api = axios.create({baseURL: "http://localhost:8000/types"});

async function listTypes() {
    const response = await list_api.get('/');

    return response.data;
}

export {
    listTypes
}


