require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Our app is stored here
const app = express();

// middleware, runs between request and response and prints out whatever request we make
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// Connecting to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connecting to database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

//We use .env files in order to carry sensitive information like passwords since it does not get pushed to a repository (USEFUL!!!)
//nodemon allows updates to occur without saving the file on the server (USEFUL!!!!)
//Added a dev script in the package.json file in order to run all scripts at once without needing to do nodemon server.js