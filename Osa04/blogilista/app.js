const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => logger.info(error))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
