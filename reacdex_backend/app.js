const express = require("express");
const route_home = require("./routes/main");
const route_fav = require("./routes/favs");
// const route_update = require("./route/update");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use('/home', route_home);
app.use('/fav', route_fav);
// app.use('/update', route_update);

const port = 8000;


app.listen(port, () =>{
    console.log(`Escutando a porta ${port}`)
});