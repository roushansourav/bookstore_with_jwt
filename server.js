const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const users = require('./routes/users/users');

const app =express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI,
    { useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=>console.log('MongoDB successfully connected'))
    .catch(err=>console.log(err));

const port=4000 || process.env.PORT;
app.use('/api/users',users);
app.get('/',(req,res)=>{
    res.json('Server is running').status(200);
})

app.listen(port,()=>{console.log(`server is running on port ${port}`);});