const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(403).redirect('/forbidden')
}

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next()
  }
  res.status(403).redirect('/forbidden')
}

const isAdminOrUser = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === Number(req.params.id)) {
    return next()
  }
  res.status(403).redirect('/forbidden')
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isAdminOrUser
}
