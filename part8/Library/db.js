const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)
mongoose.connect(config.MONGODB_URI)
    .then(()=> console.log("connected to MongoDB"))
    .catch((error) => {
        console.log("...error happened ", error);
      });