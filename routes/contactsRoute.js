const express = require("express");
const router = express.Router();
const {getContacts, getContact, postContact, putContact, deleteContact} = require("../controllers/contactControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", postContact);
router.put("/:id", putContact);
router.delete("/:id" , deleteContact);

module.exports = router;