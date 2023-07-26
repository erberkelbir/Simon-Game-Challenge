const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
var path = require ('path');

const app = express();

app.use(express.static(path.join(__dirname + '../public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);


app.get('/', (req, res) => {
    res.render('index');
  });
  


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
