const express=require('express');
const app = express();
const morgan=require('morgan')
const port = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
const Route = require('./routes/router.js');

app.use('/', Route);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/`)
})
