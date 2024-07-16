// CONTACT LIST
const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;
    const filter = { owner: req.user._id };
    const skip = (page - 1) * limit;
    if (favorite) {
      filter.favorite = favorite;
    }
    const contacts = await listContacts(filter, limit, skip);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// CONTACT BY ID
const getContactById = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.contactId,
      owner: req.user._id,
    };
    const contact = await getContactById(filter);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// NEW CONTACT
const addContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, phone } = req.body;
    const newContact = await createNewContact(userId, { name, email, phone });
    if (!newContact)
      return res.status(400).json({
        message: `Contact not added`,
      });
    else {
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE CONTACT
const removeContact = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.contactId,
      owner: req.user._id,
    };
    const contact = await removeContact(filter);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    else {
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

//UPDATE CONTACT
const updateContact = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.contactId,
      owner: req.user._id,
    };
    const updatedContact = await updateContact(filter);
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

// UPDATE STATUS
const updateStatusContact = async (req, res, next) => {
  try {
    const filter = {
      _id: req.params.contactId,
      owner: req.user._id,
    };
    const updatedContact = await updateContact(filter, {
      favorite: req.body,
    });
    if (!updatedContact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
