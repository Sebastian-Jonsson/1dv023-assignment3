const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const logger = require('morgan')
const createError = require('http-errors')
const helmet = require('helmet')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
require('dotenv').config()
const port = process.env.PORT
// const session = require('express-session')
// require('./configs/mongoose.js')
// const csrf = require('csurf')

// engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'https://gitlab.lnu.se/api/v4/projects/937/issues'],
    scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js'],
    styleSrc: ["'self'", 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'],
    imgSrc: ["'self'", 'https://secure.gravatar.com/avatar/']
  }
}))
// app.use(helmet.xssFilter())
// app.use(helmet.frameguard())

// Socket IO
io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  socket.on('disconnect', () => { console.log('user disconnected', socket.id) })
})
app.set('socketio', io)

// Routes create a folder and call on routes
app.use('/', require('./routes/webhookRouter'))
app.use('/', require('./routes/homeRouter'))
app.use('/issueView', require('./routes/issueViewRouter'))

// Error handler
app.use('*', (req, res, next) => next(createError(404)))
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, 'views', 'errors', '404.html'))
  }
  if (err.status === 403) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, 'views', 'errors', '403.html'))
  }

  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      .sendFile(path.join(__dirname, 'views', 'errors', '500.html'))
  }
  res
    .status(err.status || 500)
    .render('errors/error', { err })
})

server.listen(port, () => console.log('Connection listening on port 4000.'))
