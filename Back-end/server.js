const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const db = require('./src/config/db');

const route = require('./src/routes')
const userAuth = require('./src/routes/userRoute');
const workRoute = require('./src/routes/workRoute');
const {errorHandler} = require('./src/app/middlewares/errorHandler')

const port = process.env.PORT || 6969;
const app = express()

app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
// app.use(bodyParser());  
// app.use(bodyParser.json());



app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json())
// app.use(express.urlencoded({
//   extended: true
// }));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

route(app);
db.connectDB();



app.use('/api/auth', userAuth);

//work route

app.use('/api/work', workRoute);


//Unhandled Route
app.all('*', (req, res, next)=>{
    const err = new Error('The route can not be found !!!')
    err.statusCode = 404;
    next(err)
})
app.use(errorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port:  ${process.env.PORT} `);
})