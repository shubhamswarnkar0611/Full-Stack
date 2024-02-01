const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./models/tracker');
const trackerRouter = require('./routes/tracker')

const app = express();
 
app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use(trackerRouter);

sequelize.sync()
.then((result)=>{
    console.log(result)
    app.listen(3000);
})
.catch((error)=>{
    console.log(error)
})


