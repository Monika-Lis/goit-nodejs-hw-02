const Contact = require("./contact");

const listContacts = () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = (contactId) => {
  const result = Contact.findByIdAndDelete(contactId);
  return result ? true : false;
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = (contactId, { favorite }) => {
  return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
