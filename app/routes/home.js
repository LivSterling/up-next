const express = require('express')
const router = express.Router()

// Middleware to protect the dashboard, this will push someone back to login of they arnt already
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

// hom routes ===============================================================
router.get('/projects', isLoggedIn, (req, res) => {
  res.render('home', { user: req.user })
})


module.exports = router