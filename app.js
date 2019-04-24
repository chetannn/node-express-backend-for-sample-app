const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const post = require('./post');

const PORT = process.env.PORT || 3000;

app.use(volleyball);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

app.use(function(req,res,next) {
 console.log('Logging...');
 next();
});

app.use('/posts', post);

app.get('/', (req,res,next) => {
    res.json({
      message: 'Hello World 😂😂'
    });
});


app.listen(PORT, () => console.log(`Listening at port ${PORT}`));