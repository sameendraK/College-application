const Employee = require('../Models/employee.model');
const Slots = require('../Models/slots.model');
const CURRENTEPOCHTIME = new Date().getTime();
const currentDate = Date.parse(CURRENTEPOCHTIME)
const viewBookedSlots = async (req, res, next) => {
    let providedEmployee = req.body.name;
    let availableSlot = await Slots.find({ employee: providedEmployee, isAvailable: false });
    if (availableSlot.length > 0) {
        // let availableTimesArray = [];
        // availableTimesArray = availableSlot.map((i) => {
        //     let epochTimeSlot = new Date(i.slot);
        //     let availableTime = epochTimeSlot.toLocaleString();
        //     if ((i.slot) < CURRENTEPOCHTIME) {
        //         return i.slot = availableTime;
        //     }
        //     // if (Date.parse(availableTime) < Date.parse(currentDate)); {
        //     //     return i.slot = availableTime;
        //     // }
        // })
        const filteredSlots = availableSlot.filter((slotObj) => {
            return slotObj.slot >= CURRENTEPOCHTIME;
        }).map((slotObj) => {
            const epochTimeSlot = new Date(slotObj.slot);
            const availableTime = epochTimeSlot.toLocaleString();
            return { ...slotObj, slot: availableTime };
        });;

        // const availableTimesArray = filteredSlots.map((slotObj) => {
        //     const epochTimeSlot = new Date(slotObj.slot);
        //     const availableTime = epochTimeSlot.toLocaleString();
        //     return { ...slotObj, slot: availableTime }; // Create a new object with the formatted time
        // });
        res.send({ currentTime: CURRENTEPOCHTIME, availableSlot: filteredSlots });
    }
    else {
        res.send({ message: "No slots" });
    }
}
const createEmployee = async (req, res, next) => {
    try {
        let providedEmployeeName = req.body.name;
        let providedPassword = req.body.password;
        let providedUserType = req.body.type;
        let employeeWithSameNameExists = await Employee.findOne({ name: providedEmployeeName });
        if (employeeWithSameNameExists) {
            res.send({ message: "Employee with same name already exists" });
        }
        else {
            let detailsToSave = { name: providedEmployeeName, password: providedPassword };
            //why were we saving a slot when creating a employee? Both are not related
            // let slotDetails = { employee: providedEmployeeName, userType: providedUserType };
            // let slot = new Slots(slotDetails);
            // let slotSaveResult = await slot.save();
            let employee = new Employee(detailsToSave);
            let result = await employee.save();
            res.send({ message: "Employee created successfully", result: result })
        }
    }
    catch (err) {
        res.send({ message: "Same error while creating employee" });
    }
}

module.exports = { viewBookedSlots, createEmployee };