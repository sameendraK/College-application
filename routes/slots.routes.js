const express = require('express');
const router = express.Router();
const { createSlot, bookSlot } = require('../Controllers/slotsController');
const auth = require('../middlewares/authentication');

router.post('/createSlot', auth,createSlot);
router.post('/bookSlot', auth, bookSlot);

// const { availableSlots, createSlot, bookSlot } = require('../Controllers/slotsController');
// router.get('/availableSlots', auth, availableSlots);

// router.get('/', getAvailableSlots);
// router.get('/createSlot', createSlot);
// router.get('/bookSlot', bookSlot);


//we are not maintaining a global variable because, we can't control to which route a user navigates.
//so, if the user doesn't come to this route, we don't have the listOfStudents.
//if we use a middleware, that gets called everytime and then the route gets called.
//so, instead of using a middleware, this felt to be the better approach than using middleware.

//TODO: use middleware 



// router.post('/createSlot', async (req, res, next) => {
//     try {
//         let userName = req.body.studentName;
//         //get epoch precision of only time and then store. Don't go for millisecond precision as we need to use this epochTime for finding.
//         //otherwise, we can go by uniqueId.
//         //It will be there from slot creation. So, we can pass the uniqueId instead of time. Doing this now.
//         let listOfStudents = await Student.find();
//         if (listOfStudents.length > 0) {
//             const providedToken = req.body.tokenNumber;
//             let tokensList = await token.find();
//             let isValidToken = tokensList.find(token => token.studentName === userName && token.tokenNumber === providedToken);
//             let providedUserName = req.body.userName;
//             let isUserLoggedIn = listOfStudents.find(user => user.userName === providedUserName && user.isLoggedIn)
//             if (isValidToken && isUserLoggedIn) {
//                 let date = req.body.dateTime;
//                 let mappedCurrentSlots;
//                 let epochTime = '' + new Date(date).getTime();
//                 let idToSet;
//                 let currentSlots = await Slot.find({}, { __V: 0, _id: 0 });
//                 // if (currentSlots.length > 0) {
//                 //we are not doing type check because slot.slot is number type and epochTime is string type
//                 let sameSlotsExist = currentSlots.filter(slot => slot.slot == epochTime);
//                 if (sameSlotsExist.length > 0) {
//                     res.send('Same slot already exists, try to create another slot');
//                 }
//                 //if there is no same slot
//                 else {
//                     //if there are any slots currently, then we set ID based on the max(uniqueId)
//                     if (currentSlots.length > 0) {
//                         mappedCurrentSlots = currentSlots.map(i => i.uniqueId);
//                         // idToSet = Math.max(...currentSlots) + 1;
//                         currentSlots.sort();
//                         idToSet = mappedCurrentSlots[mappedCurrentSlots.length - 1] + 1;
//                         // res.send({ idToSet });
//                         // res.send('currentSlots');
//                     }
//                     //if there are no slots, this would be the first one. So, uniqueIdToSet=1.
//                     else {
//                         idToSet = 1;
//                     }
//                     let saveSlot = { slot: epochTime, uniqueId: idToSet };
//                     let slot = new Slot(saveSlot);
//                     let result = await slot.save();
//                     res.send(result);
//                 }
//                 // }
//             }
//             //if invalid token or user isn't logged in.
//             else {
//                 if (!isValidToken) {
//                     res.send("Invalid Token");
//                 }
//                 else if (!isUserLoggedIn) {
//                     res.send("User is not logged in");
//                 }
//             }
//         }
//         else {
//             res.send("Zero users");
//         }
//     }
//     catch (err) {
//         res.send("Unexpected error while creating a slot.")
//     }
// })

// router.get('/getAvailableSlots', async (req, res, next) => {
//     //we are passing userName because, we can't give access to anyone that requests.
//     //we check userName and if it is logged in, then only we give access.
//     try {
//         const userName = req.body.studentName;
//         const providedTokenNumber = req.headers['authorization'];
//         const list = await Student.find({}, { __v: 0, password: 0 });
//         if (list.length > 0) {
//             let user = list.find(i => i.studentName === userName);
//             let currentTokens = await token.find({}, { __v: 0, _id: 0 });
//             let isValidToken = currentTokens.find(token => token.studentName === userName && token.tokenNumber === providedTokenNumber);
//             if (isValidToken) {
//                 if (user) {
//                     if (user.isLoggedIn) {
//                         let slots = await Slot.find({}, { __v: 0, _id: 0 });
//                         //filtering out all the invalid(past time) slots and converting epoch to Date Object
//                         let availableSlots = slots.filter(obj => obj.isAvailable).map(j => {
//                             let epochTimeSlot = new Date(j.slot);
//                             let availableTime = epochTimeSlot.toGMTString() + ' ' + epochTimeSlot.toLocaleString();
//                             j.availableTime = availableTime;
//                             return j;
//                         });
//                         if (availableSlots.length > 0) {
//                             res.send(availableSlots);
//                         }
//                         else {
//                             res.send("No slots present currently");
//                         }
//                     }
//                     else {
//                         res.send("User not logged In")
//                     }
//                 }
//                 else {
//                     res.send('Invalid User');
//                 }
//             }
//             else {
//                 res.send("Invalid Token");
//             }
//         }
//         else {
//             res.send("Zero users")
//         }
//     }
//     catch (err) {
//         console.log(err, 'error while fetching available slots of dean.');
//     }
// })

// router.post('/bookSlot', async (req, res, next) => {
//     try {

//         //We are using uniqueId because, we don't want to run conditions like 'find' based on epoch time.
//         //for safety purposes and for epoch time may be milliSecond accurate. So it changes too often.
//         let uniqueId = req.body.uniqueId;
//         let requestedUser = req.body.userName;
//         let providedToken = req.body.tokenNumber;
//         let currentTokens = await token.find({}, { __v: 0, _id: 0 });
//         //token vaidation
//         let listOfStudents = await Student.find();
//         if (listOfStudents.length > 0) {
//             let isValidToken = currentTokens.find(token => token.studentName === requestedUser && token.tokenNumber === providedToken);
//             let isUserLoggedIn = listOfStudents.find(student => student.studentName === requestedUser && student.isLoggedIn)
//             if (isValidToken && isUserLoggedIn) {
//                 //flags updation.
//                 let result = await Slot.findOneAndUpdate({ uniqueId: uniqueId }, { isAvailable: false, user: requestedUser });
//                 if (result) {
//                     if (result.isAvailable) {
//                         res.send(result);
//                     }
//                     else {
//                         res.send('slot unavailable');
//                     }

//                 }
//                 else {
//                     let slots = await Slot.find();
//                     if (!slots.length) {
//                         res.send("No slots available for booking")
//                     }
//                     else {
//                         res.send('Slot not booked, enter a valid unique ID');
//                     }
//                 }
//             }
//             else {
//                 res.send("Invalid token");
//             }
//         }
//         else {
//             res.send("zero users");
//         }
//     }
//     catch {
//         res.send("some error while trying to book");
//     }
// })

// router.delete('/deleteAllSlots', async (req, res, next) => {
//     await Slot.deleteMany();
//     res.send("deleted all slots");
// })
module.exports = router;