



const mongoose = require('mongoose');

const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
};

// Connect to Mongo
mongoose
    .connect(process.env.MONGDB_URI, dbOptions) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected…'))
    .catch(err => console.log(err.message));
