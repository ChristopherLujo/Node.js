const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const conversion = require("./conversion.js")

const port = process.env.PORT || 5000;

const calculateRate = (req, res) => {
    const {weight, mail_type } = req.body;
    const roundedWeight = Math.ceil(weight);
    const maxWeight = conversion[mail_type].maxWeight;
    const price = roundedWeight > maxWeight ? conversion[mail_type][maxWeight].toFixed(2) : conversion[mail_type][roundedWeight].toFixed(2);
    const mail_name = conversion[mail_type].name;
    res.render('pages/result.ejs', {price, weight, mail_name});
} 

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended:true }))
    .set('views', path.join(__dirname, 'views'))
    .set ('view engine', 'ejs')
    .get('/', (req,res) => res.render('pages/index'))
    .post('/getRate', calculateRate);

    app.listen(port, () => { console.log(`Listen on port ${port}!`) })