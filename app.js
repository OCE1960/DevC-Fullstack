const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const mongoose = require('mongoose');

// CONNECT TO DATABASE
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then().catch( (err) => {
      console.log(`Database Error ${err}`);
  });
  
  //ON CONNECTION
  mongoose.connection.on('connected', (err) => {
      console.log(`Connected to Database ${config.database }`)
  });

const app = express();

const recipe = require('./routes/recipe');

//PORT NUMBER
const port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Set Statis Files
app.use(express.static(path.join(__dirname, 'public')));

//Bodey Parser Middleware
app.use(bodyParser.json());

app.use('/api', recipe);

// INDEX ROUTE
app.get('/', (req, res) => {
    res.send("INVALID ENDPOINT");
})



//START SERVER
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})