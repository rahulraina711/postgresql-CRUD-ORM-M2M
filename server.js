const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var corsOptions = {
    origin: "http://localhost:3100"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./api/models");
db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db.")
}).catch(err=>console.log(err));

app.get('/', (req, res)=>{
    res.status(200).json({messgae: "everything is working fine here"});
})

require("./api/routes/movie.routes")(app);
require("./api/routes/review.routes")(app);
require("./api/routes/actor.routes")(app);
require("./api/routes/topmovies.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})