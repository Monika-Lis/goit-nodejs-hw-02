const express = require("express");
const auth = require("../../middleware/authorisation/auth");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contacts-contollers");
const {
  validateContact,
  validateContactStatus,
} = require("../../middleware/validators/contacts-validator");

const router = express.Router();

// CONTACT LIST
router.get("/", auth, listContacts);

// CONTACT BY ID
router.get("/:contactId", auth, getContactById);

// NEW CONTACT
router.post("/", auth, validateContact, addContact);

// DELETE CONTACT
router.delete("/:contactId", auth, removeContact);

//UPDATE CONTACT
router.put("/:contactId", validateContact, auth, updateContact);

// UPDATE STATUS
router.patch(
  "/:contactId/favorite",
  validateContactStatus,
  auth,
  updateStatusContact
);

module.exports = router;
