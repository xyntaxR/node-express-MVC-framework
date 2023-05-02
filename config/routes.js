const express = require('express');
const router = express.Router();
const profiler = require('../middlewares/Profiler');
const studentsController = require('../application/controllers/Students');
// students routes
router.get('/', studentsController.index);
router.get('/students/profile', studentsController.profile);
router.get('/logoff', studentsController.log_off)
router.post('/register', studentsController.register);
router.post('/login', studentsController.login);
module.exports = router;