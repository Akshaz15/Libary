if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexrouter = require('./routes/index')
const authorrouter = require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('connected to Mongoose'))

    app.use('/', indexrouter)
    app.use('/authors', authorrouter)
    'authors/new'


app.listen(process.env.PORT || 3500)