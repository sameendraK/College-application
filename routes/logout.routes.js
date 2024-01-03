const express = require('express');
const router = express.Router();
const logoutController = require('../Controllers/logoutController');
const auth = require('../middlewares/authentication');
router.post('/', auth, logoutController)

// router.post('/', logoutController);
// router.post('/', async (req, res, next) => {
//     try {
//         const tokenNumber = req.body.tokenNumber
//         let listOfTokens = await Token.find();
//         let isValidToken = listOfTokens.find(token => token.tokenNumber === tokenNumber && token.isLoggedIn);
//         // let tokenValidationSuccess = isValidToken.tokenNumber === providedTokenNumber ? true : false
//         if (isValidToken) {
//             //TODO: mark isLoggedIn as false and send JSON response.
//         }
//         else {
//             token.isLoggedIn ? res.send({ message: "Invalid token" }) : res.send({ message: "Student not logged in" });
//         }
//     }
//     catch (err) {
//         res.send({ message: "error while logout" });
//     }
// })
module.exports = router;