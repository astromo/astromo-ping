module.exports = function (req, res) {
  res.json({
    message: 'pong!',
    identity: req.user
  })
}
