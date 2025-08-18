const express = require("express");
const path = require("path");
const cors = require("cors");

const route_home = require("./routes/main");
const route_fav = require("./routes/favs");
const route_img = require("./routes/img");
// const route_update = require("./route/update");


const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use('/home', route_home);
app.use('/fav', route_fav);
// app.use('/update', route_update);

// app.use('/img', route_img);
// Servir imagens diretamente (caso queira acessar /img/001.png)
app.use("/img", express.static(path.join(__dirname, "img")));

const port = 8000;
app.listen(port, () =>{
    console.log(`Escutando a porta ${port}`)
});