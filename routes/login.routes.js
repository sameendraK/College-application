const express = require('express');
const router = express.Router();
const loginHandler = require('../Controllers/loginController');
const auth = require('../middlewares/authentication');

router.post('/', loginHandler);

// login based on user Name and password.
// router.post('/', async (req, res, next) => {
//     let results = await student.find();
//     //checking if there student entry in DB or not.
//     // if (results.length > 0) {
//     const studentName = req.body.userName;
//     const pass = req.body.password;
//     let tokens = await Tokens.find();
//     let token;
//     //checking Credentials
//     const userObject = results.find(i => i.studentName === studentName && i.password === pass);
//     if (userObject) {
//         token = tokens && tokens.find(i => i.studentName === studentName && i.isLoggedIn);
//         //TODO:
//         //create a timestamp for the token and tokeTimeStamp+24H> currentTime, mark token expired.

//         //for a token to be valid, make sure it is mapped with tokenNumber and timestamp 
//         //    token = tokens && tokens.find(i => i.studentName === studentName && token.timeStamp+ 24H > currentTime);
//         //2 cases must be here
//         //1.if there is user.
//         //2.if there is user but no token is assigned to the user.
//         //TODO: Add token validation conditon (for new token generation based on timestamp else send the old token.)
//         //if already logged in, isLoggedIn flag is true and it is  assigned only on successfull validation of credentials and token.
//         //if not logged in but creds are valid.
//         // else {
//         //if there is no token (token is assigned only on succesfull creds validation.)
//         if (token) {
//             res.send({ token: token.tokenNumber, message: "Logged In succesfully" });
//         }
//         else {
//             let newToken = uuidv4();
//             let studentToken = { tokenNumber: newToken, studentName: studentName };
//             const token = new Tokens(studentToken);
//             await token.save();
//             await student.findOneAndUpdate({ studentName: studentName }, { isLoggedIn: true, token: newToken });
//             res.send({ token: token.tokenNumber, message: "Logged In succesfully" });
//         }
//         //if there is no specific user. different from zero users (zero user is no user in DB and no user is users are there in DB, but there is no specific user that is requested).
//     }
//     else {
//         res.send({ message: "No User Found or Invalid Credentials" });
//     }
// })
module.exports = router;