const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'token missing or invalid'})
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }


  next(error)
}

const tokenExtractor = (req, res, next) => {

  const authorization = req.get('authorization')
  
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')

  } else {
    req.token = null
  }
  
  
  next()
}

const userExtractor = (req, res, next) => {
  if (req.token) {
    req.user = jwt.verify(req.token, process.env.SECRET)
  } else {
    req.user = null
  }

  
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}


// const authorization = req.get('authorization')
// if (authorization && authorization.startsWith('Bearer ')) {
//   return authorization.replace('Bearer ', '')
// }
// return null


