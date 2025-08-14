const fs = require("fs");

const dadosAtuais = JSON.parse(fs.readFileSync("db_pokemon.json"));
const novoDado = { id: '000', nome: 'item teste'};

fs.writeFileSync("db_pokemon.json", JSON.stringify([...dadosAtuais, novoDado]));

console.log(JSON.parse(fs.readFileSync("db_pokemon.json")));