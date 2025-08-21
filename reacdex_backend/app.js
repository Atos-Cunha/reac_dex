const express = require("express");
const path = require("path");
const cors = require("cors");

const route_home = require("./routes/main");
const typeRouter = require("./routes/type");
const route_fav = require("./routes/favs");



const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use('/home', route_home);
app.use("/img", express.static(path.join(__dirname, "img_pokemon")));
app.use("/type", typeRouter);
app.use('/fav', route_fav);


const port = 8000;
app.listen(port, () =>{
    console.log(`Escutando a porta ${port}`)
});