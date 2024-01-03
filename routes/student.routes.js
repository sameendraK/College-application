let express = require('express');
let router = express.Router();
let { createStudent, getAvailableSlots } = require('../Controllers/studentsController');
const auth = require('../middlewares/authentication');
// router.get('/', studentsController);
router.post('/create', createStudent);
router.get('/getAvailableSlots', auth, getAvailableSlots)
module.exports = router;
