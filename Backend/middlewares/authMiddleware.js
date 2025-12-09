export const authorizeRole = (allowedRoles) => (req, res, next) => {
  // User must be logged in
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  // Check if the user role is allowed
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: wrong role" });
  }

  //   If role is correct allow access
  next();
};
