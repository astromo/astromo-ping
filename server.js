var app = require('express')()
var jwt = require('express-jwt')
var ping = require('./routes/ping')

var permissions = require('express-jwt-permissions')()

var key = require('fs').readFileSync('./keys/key.pub')

// Set the server name for debugging
app.use(function (req, res, next) {
  if (process.env.HOSTNAME) {
    res.setHeader('Server', process.env.HOSTNAME)
  }

  next()
})

// Validate and decode JWT
app.use(jwt({
  secret: key,
  algorithms: ['RS512'],
  credentialsRequired: true // false for centralized auth
}).unless({
  path: [
    '/ping'
  ]
}))

// Check permissions
app.use(permissions.check('ping'))

app.disable('x-powered-by')

app.get('/ping', ping)
app.get('/pong', ping)
app.get('/foo', permissions.check('foo'), ping)

module.exports = app
