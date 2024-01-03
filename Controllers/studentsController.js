const Student = require('../Models/student.model');
const Slots = require('../Models/slots.model')
const createStudent = async (req, res, next) => {
    let providedUserName = req.body.name;
    let providedPassword = req.body.password;
    let providedUserType = req.body.type
    let studentWithSameNameExists = await Student.findOne({ studentName: providedUserName });
    //if student name already exists.
    if (studentWithSameNameExists) {
        res.send({ message: "Student with same name exists" });
    }
    //save for student details is below.
    else {
        let saveDetails = { studentName: providedUserName, password: providedPassword, userType: providedUserType };
        let studentDetails = new Student(saveDetails);
        let result = await studentDetails.save();
        res.send({ message: "Student created successfully", result: result })
    }
}


const getAvailableSlots = async (req, res, next) => {
    // we don't need employeeName because we are displaying all the slots.
    let availableSlot;
    //we are filtering only slots with valid time and isAvailable.
    availableSlot = await Slots.find({ isAvailable: true, slot: true });
    if (availableSlot.length > 0) {
        let availableTimesArray = [];
        availableTimesArray = availableSlot.map((i) => {
            let epochTimeSlot = new Date(i.slot);
            let availableTime = epochTimeSlot.toLocaleString();
            return i.slot = availableTime;
        })
        res.send({ availableTimes: availableTimesArray });
    }
    else {
        res.send({ message: "No slots" });
    }
}
module.exports = { createStudent, getAvailableSlots };