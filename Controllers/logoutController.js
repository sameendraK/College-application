const Token = require('../Models/tokens.model');

const logout = async (req, res, next) => {
    try {
        let providedUserName = req.body.name;
        let result = await Token.findOneAndUpdate({ userName: providedUserName }, { isLoggedIn: false });
        res.send({result:result});
    }
    catch{
        res.send({message:"Unknown occur during logout."})
    }
}

module.exports = logout;