// Any logged-in user
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Logged in AND has one of the allowed roles
// Usage: requireRole('owner') or requireRole('owner', 'employee')
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    if (!allowedRoles.includes(req.session.user.role)) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }
    next();
  };
};

export { requireLogin, requireRole };