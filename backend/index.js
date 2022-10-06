const express = require('express')
const cors = require('cors')

const app = express()
const products = require('./product')

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('sss')
})

app.get('/product', (req,res) => {
    res.send(products)
})

app.listen(5000, () => {
    console.log('Server is starting in port 5000')
})