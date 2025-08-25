const express = require("express");
const path = require("path");
const cors = require("cors");

const route_home = require("./routes/main");
const route_type = require("./routes/type");
const route_evolve = require("./routes/evolve");
const route_fav = require("./routes/favs");

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use('/home', route_home);
app.use("/img", express.static(path.join(__dirname, "img_pokemon")));
app.use("/type", route_type);
app.use("/evolve", route_evolve);
app.use('/fav', route_fav);


const port = 8000;
app.listen(port, () =>{
    console.log(`Escutando a porta ${port}`)
});