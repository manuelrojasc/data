const express=require('express');
const app = express();
const morgan=require('morgan')
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
const Route_v1 = require('./routes/inventario_v1.js');
const Route_v2 = require('./routes/inventario_v2.js');

app.use('/v1', Route_v1);
app.use('/v2', Route_v2);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/`)
    console.log('visit to /v1 or /v2')
})
