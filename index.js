require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./userRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const getConnection = () => {


    mongoose.connect(process.env.MONGO_URI).then((connection) => {


        console.log('db os connected')

    }).catch((error) => {
        console.log('failed to connect to db')
    })

}


app.get('/', (req, res, next) => {
    res.send('server is runing')
})

app.use('/user', userRoutes)


getConnection()


app.use((error, req, res, next) => {

    const statusCode = error.statusCode || 500;
    const message = error.message || 'server error'
    res.status(statusCode).json({ message: message })

})


app.listen(process.env.PORT, () => console.log(`server is running on port: ${process.env.PORT}`))