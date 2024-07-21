const secret_key = "myLove";
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token) {
        return res.status(401).json({
            msg: "Access Denied"
        });
    };

    try {
        const decoded = jwt.verify(token.split(" ")[1], secret_key);
        console.log(token);
        console.log("This is decoded", decoded);
        req.user = decoded;
        console.log(`This is req.user.id ${req.user.id}` )
        next();
    } catch(e) {
        return res.status(400).json({
            msg: "Invalid Token"
        });
    };
}

module.exports = authMiddleware;