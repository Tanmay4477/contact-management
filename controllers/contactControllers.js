const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({
        user_id: req.user.id
    });
    return res.status(200).json({contacts});
});

const postContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    const user_id = req.user.id;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        user_id,
        name,
        email,
        phone
    });
    contact.save();
    return res.status(201).json({msg: "Contact Created", contact});
});


const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    return res.status(200).json({contact});
});

const putContact = asyncHandler(async (req, res) => {
    const update = req.body;
    const id = req.params.id;

    const contact = await Contact.findByIdAndUpdate(id, update, {new: true})
    return res.status(200).json(contact);
});


const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);
    return res.status(200).json({msg: "Contact deleted", contact});
});


module.exports = {
    getContacts, getContact, postContact, putContact, deleteContact
} 
