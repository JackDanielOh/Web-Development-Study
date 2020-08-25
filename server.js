
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotEnv = require('dotenv');
dotEnv.config();

const usersRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Connect to Mongo
require('./config/db');

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


