const PORT = 5000;

const express = require("express")
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Server is running...")
})

const customerRouter = require('./Routers/customer')  
const bookRouter = require('./Routers/books')
const infoRouter = require('./Routers/rentalInfo')

app.use('/customer', customerRouter)
app.use('/book', bookRouter)
app.use('/', infoRouter)

//LISTEN PORT
app.listen(PORT, () => {
    console.log("Server has been run...")
})
