const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(403).redirect('/')
}

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next()
  }
  res.status(403).redirect('/')
}

const isUser = (req, res, next) => {
  if (req.params.id) {
    if (req.user.id === Number(req.params.id)) {
      return next()
    }
  }
  if (!req.user.isAdmin) {
    return next()
  }
  res.status(403).redirect('/')
}

const isAdminOrUser = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === Number(req.params.id)) {
    return next()
  }
  res.status(403).redirect('/')
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isUser,
  isAdminOrUser
}
