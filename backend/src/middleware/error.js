export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  error.status = 404
  next(error)
}

export function errorHandler(err, req, res, next) {
  void next
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Internal server error' })
}
