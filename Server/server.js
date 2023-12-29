const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const mongoose = require('mongoose')
const UserModel =  require('../Server/Models/Users')


const app = express();
dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/FoodTopia")

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const sampleData = {
  name:'AMAL',
  age:50
}
app.use(cors()); 

app.use(express.json()); 

//email sending integration
app.use("/email", emailRoutes);

// intial get 
app.get("/", (req, res) => {
  res.send(sampleData);
});

app.post('/signup', (req, res) => {
  const userData = req.body; 
  UserModel.create(userData)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get('/users', (req, res) => {
  UserModel.find({})
  .then((users)=> res.json(users))
  .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then((user) => res.json(user))
  .catch((err) => res.json(err));  
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id,{name :req.body.name ,age:req.body.age,place : req.body.place,email:req.body.email})
  .then((user) => res.json(user))
  .catch((err) => res.json(err));  
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id).lean()
  .then((user) => res.json(user))
  .catch((err) => res.json(err));  
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
