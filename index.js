const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const db = require("./models/model");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("DB successful"))
  .catch((err) => console.log(err));


const app = express();

app.enable("trust proxy");

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app,use(cors());
//app.use("/api", routes);

app.set('view engine','ejs');

app.get("/", (req, res) => {

  db.find({}).then((data) => {
    res.send(data);
  });
  
});

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});


//post
app.post("/", function (req, res, next) {
  
  const name=req.body.name;
  const value=req.body.value;
  
 
  db.create(req.body)
    .then(function (data) {
      res.redirect("/");
    })
    .catch(next);

});

app.delete("/:id", function (req, res, next) {

  var id=req.params["id"];
  db.findByIdAndDelete(id)
    .then((data) =>{
        res.send(data);
    });

})


app.listen(process.env.PORT || 5000, function () {
  console.log("server is running on 5000");
});