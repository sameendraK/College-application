const Student = require('../Models/student.model');
const Token = require('../Models/tokens.model');
const Employee = require('../Models/employee.model');
const { json } = require('express/lib/response');   
const { v4: uuidv4 } = require('uuid');
const student = require('./studentsController');
const UserTypes = {
    Student: "Student",
    Employee: "Employee"
}
const login = async (req, res) => {
    //we are handling login based on userType instead of separate logins.
    try {
        const userType = req.body.type;
        if (userType === UserTypes.Student) {
            try {
                let providedStudentName = req.body.name;
                let providedPassword = req.body.password;
                let studentFound = await Student.findOne({ studentName: providedStudentName, password: providedPassword });
                let tokenPresent = await Token.findOne({ userName: providedStudentName });
                if (studentFound) {
                    if (tokenPresent && tokenPresent.token) {
                        res.send({ message: "Logged In successfully" });
                    }
                    else {
                        const newToken = uuidv4();
                        const tokenDetails = { token: newToken, userType: userType, userName: providedStudentName, isLoggedIn: true }
                        const saveToken = new Token(tokenDetails);
                        result = await saveToken.save();
                        res.send({result:result});
                    }
                }
                else {
                    res.send({ message: "Invalid creds" });
                }
            }
            catch (err) {
                res.send({message:"unexpected error"});
            }
        }
        else if (userType === UserTypes.Employee) {
            let providedEmployeeName = req.body.name;
            let providedPassword = req.body.password;
            let providedUserType = req.body.type;

            let validCreds = await Employee.findOne({ name: providedEmployeeName, password: providedPassword });
            let tokenPresent = await Token.findOne({ userName: providedEmployeeName });
            if (validCreds) {
                if (tokenPresent && tokenPresent.token) {
                    res.send({message:"Logged In successfully"});
                }
                else {
                    const newToken = uuidv4();
                    const tokenDetails = { token: newToken, userType: userType, userName: providedEmployeeName, isLoggedIn: true }
                    const saveToken = new Token(tokenDetails);
                    result = await saveToken.save();
                    res.send({result:result});
                }
            }
            else {
                res.send({ message: "Invalid Credentials" });
            }
        }
    }
    catch (err) {
        res.send({ message: "Some error occured while login" })
    }
}
module.exports = login;