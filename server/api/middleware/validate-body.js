
//We can pull the boilerplate around validating the request body into
//middleware to avoid having to write the same checks all over.
//Note that validateBody is _not_ the middleware function, but instead
//is a function that _returns_ the middleware.
const validateBody = (validator, error = "Invalid Body") => (req, res, next) => {
   if (!validator(req.body)) return res.status(400).json({error});

   return next();
};

module.exports = validateBody;
