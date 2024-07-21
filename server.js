const express = require("express");
const app = express();
const contactsRoute = require("./routes/contactsRoute");
const port = 3000;
const errorHandler = require("./middleware/errorHandler");
const db = require("./config/dbConnection");
const userRoute = require("./routes/userRoute")

app.use(express.json());
app.use(errorHandler);
app.use("/api/user", userRoute);
app.use("/api/contacts", contactsRoute);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});