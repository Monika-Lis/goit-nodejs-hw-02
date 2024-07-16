const Contact = require("./schemas/contact-schema");

const listContacts = (filter, skip, limit) => {
  return Contact.find(filter).skip(skip).limit(limit);
};

const getContactById = (filter) => {
  return Contact.findById(filter);
};

const removeContact = (filter) => {
  const result = Contact.findByIdAndDelete(filter);
  return result ? true : false;
};

const addContact = (userId, { name, email, phone }) => {
  return Contact.create({ name, email, phone, owner: userId });
};

const updateContact = (filter) => {
  return Contact.findByIdAndUpdate(filter, body, { new: true });
};

const updateStatusContact = (filter, { favorite }) => {
  return Contact.findByIdAndUpdate(filter, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
