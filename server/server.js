require('./config/db');
const app = require('express')();
const port = 3000;
const router = require("./api/User.js");
const morgan = require("morgan");
const cors = require('cors');



const bodyParser = require('express').json;
app.use(bodyParser());
app.use(morgan('dev'))
app.use(cors());
app.use("/users", router);

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})