const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "error.details[0].message" });
  }
  next();
};

const validateContactStatus = (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "error.details[0].message" });
  }
  next();
};
module.exports = {
  validateContact,
  validateContactStatus,
};
