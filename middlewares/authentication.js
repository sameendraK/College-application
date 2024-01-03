let Token = require('../Models/tokens.model');

const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    let providedToken = token.replace("Bearer ", "");
    let providedUserName = req.body.loggedInUser;
    let providedUserType = req.body.type;
    console.log(providedToken, providedToken.length);
    try {
        //checking tokenNumber mapped with entityType and entity.
        //now we are gettig an issue which is, if we are trying to book a slot and there, we are sending the name object for booking a specific dean. That is the same we are using here. There are 2 possible solutions. 1. Change the entity 'name' in 'bookSlot' route
        let userAlreadyLoggedIn = await Token.findOne({ isLoggedIn: true, userName: providedUserName });
        if (userAlreadyLoggedIn) {
            next();
        }
        else {
            let tokenValid = await Token.findOne({ token: providedToken, userName: providedUserName });
            console.log("token", tokenValid);
            if (tokenValid) {
                next();
            }
            else {
                res.send({ message: "unauthorized usesr" });
                return;
            }
        }
    }
    catch (err) {
        res.send({ message: "Some error" });
        return;
    }
}

module.exports = auth;