require('dotenv').config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));
