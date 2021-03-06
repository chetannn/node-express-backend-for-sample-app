const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const error = require('./middleware/error');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true})
.then(() => {
  console.log('Connected to DB...');
});
mongoose.connection.on('error', function(err) {
  console.log(err);
});

// app.use(volleyball);
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
//reason to put it here
app.use(error);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));