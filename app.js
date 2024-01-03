const express = require('express');
const app = express();
const productsRoute = require('./routes/product.routes')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
console.log(dotenv.parsed);
const auth = require('./middlewares/authentication');
const studentRoute = require('./routes/student.routes')
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const employeeRoute = require('./routes/employee.routes');

const slotDetailsAndOperationsRoute = require('./routes/slots.routes');

app.use(express.json());
const routesThatNeedAuthentication = [
    logoutRoute,
    studentRoute,
    slotDetailsAndOperationsRoute,
    employeeRoute
]

//authentication module
// app.use(routesThatNeedAuthentication, auth);

// app.use('/products', productsRoute)
app.use('/login', loginRoute);
app.use('/logout', logoutRoute)
app.use('/student', studentRoute)
app.use('/slots', slotDetailsAndOperationsRoute);
app.use('/employee', employeeRoute);
// app.use('/bookSlot', bookSlots);
// app.use('/createSlot', createSlot);
mongoose.connect(process.env.mongoDbURI, {
    dbName: process.env.dbName,
    user: process.env.user,
    pass: process.env.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listeningo")
})

// app.use((req, res, next) => {
//     const err = new Error('not found')
//     err.status = 404
//     next(err)
// })
// app.use((err, req, res, next) => {
//     res.status(err.status);
//     res.send({
//         error: {
//             status: err.status || 500,
//             message: err.message
//         }
//     });
// });