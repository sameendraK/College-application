let express = require('express');
let router = express.Router();
let employeeController = require('../Controllers/employeeController');
const auth = require('../middlewares/authentication');

router.post('/create', employeeController.createEmployee);
router.get('/viewBookedSlots', auth, employeeController.viewBookedSlots);

module.exports = router;