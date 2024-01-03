const Slots = require('../Models/slots.model');
const UserTypes = {
    Student: "Student",
    Employee: "Employee"
}
const createSlot = async (req, res, next) => {
    try {
        // creating slot with employeeName and time.
        let employeeName = req.body.employeeName;
        let slotTime = req.body.slot;
        let epochTime = new Date(slotTime).getTime();
        // res.send(epochTime);
        let slotAlreadyExists = await Slots.findOne({ slot: epochTime })
        if (slotAlreadyExists) {
            res.send({ message: "Slot already exists" });
        }
        else {
            let slotDetailsToSave = { slot: epochTime, employee: employeeName };
            let slotSaveDetails = new Slots(slotDetailsToSave);
            let result = await slotSaveDetails.save();
            res.send({
                message: "Slot created successfully",
                result: result
            });
        }
    }
    catch (err) {
        res.send({ message: "Some error occured during slot creation" });
    }
}

const bookSlot = async (req, res, next) => {
    try {

        let providedTime = req.body.slot;
        let employeeName = req.body.employeeName;
        let student = req.body.studentName;
        let epochTime = new Date(providedTime).getTime();
        // let slotAvailable = await Slots.findOne({ slot: epochTime, isAvailable: true });
        //if there is no employee then it will throw an error and go to catch block.
        let slotAvailable = await Slots.findOne({ slot: epochTime, isAvailable: true, employee: employeeName });
        // res.send({ slotAvailable: slotAvailable });
        if (slotAvailable.isAvailable   ) {
            // if (slotAvailable.isAvailable) {
            let slot = { isAvailable: false };
            let id = slotAvailable._id;
            //updating which user booked the slot and isAvailable flag
            let result = await Slots.updateOne({ _id: id }, { user: student, isAvailable: false });
            res.send({ message: "Booked Successful", result: result });
        }
        //if slot isn't valid/ slot isn't available.
        else {
            if (slotsList && slotAvailable && slotsList.length > slotAvailable.length) {
                res.send({ message: "Requsted slot already booked" })
            }
            else if (!slotsList) {
                res.send({ message: "No slots available" });
            }
        }
    }
    catch (err) {
        res.send({ message: "Some error occured while booking a slot" });
    }
}

module.exports = { createSlot, bookSlot };

// const availableSlots = async (req, res, next) => {
//     const userType = req.body.userType;
//     let availableSlot;
//     if (userType === UserTypes.Student) {
//         availableSlot = await Slots.find({ isAvailable: true });
//     }
//     else if (userType === UserTypes.Employee) {
//         availableSlot = await Slots.find({ isAvailable: false });
//     }
//     if (availableSlot.length > 0) {
//         let availableTimesArray = [];
//         availableTimesArray = availableSlot.map((i) => {
//             let epochTimeSlot = new Date(i.slot);
//             let availableTime = epochTimeSlot.toLocaleString();
//             return i.slot = availableTime;
//         })
//         res.send(availableTimesArray);
//     }
//     else {
//         if (userType === UserTypes.Student) {
//             res.send("No slots");
//         }
//         else if (userType === UserTypes.Employee) {
//             res.send("No bookings done curretnly");
//         }
//     }
// }

// async function getAvailableSlots(userType) {
//     let availableSlot;
//     if (userType === UserTypes.Student) {
//         availableSlot = await Slots.find({ isAvailable: true });
//     }
//     else if (userType === UserTypes.Employee) {
//         availableSlot = await Slots.find({ isAvailable: false });
//     }
// }


// module.exports = { createSlot, bookSlot, availableSlots };
