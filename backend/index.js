const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const products = require('./product')
const register = require('./routes/register')
const login = require('./routes/login')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('sss')
})

app.get('/product', (req,res) => {
    res.send(products)
})


app.use('/register', register)
app.use('/login', login)

// @ = %40
// ' = %27
// ! = %21
// ...
const uri = "mongodb+srv://BenjaminNguyen:Aa%40123456@cluster0.ourk6lm.mongodb.net/react-nodejs?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Mongoose connection successfull...'))
.catch(err => console.log('Mongoose connect failed', err.message))


app.listen(5000, () => {
    console.log('Server is starting in port 5000')
})