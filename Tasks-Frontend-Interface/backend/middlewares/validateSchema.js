export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      errors: error.errors.map((error) => ({
        field: error.path[0],
        message: error.message
      }))
    });
  }
};