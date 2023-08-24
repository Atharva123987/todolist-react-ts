const express = require('express')
const {
    getAllTasks,
    getOneTask,
    createTask,
    deleteTask,
    updateTask,
} = require('../controller/tasksController.js');

const requireAuth = require('../middleware/requireAuth.js');

const router = express.Router();

// AUTH MIDDLEWARE
router.use(requireAuth)

router.get('/', getAllTasks);
router.get('/:id', getOneTask)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

module.exports = router;
