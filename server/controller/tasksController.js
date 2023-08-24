const Tasks = require("../models/tasksModel");
const mongoose = require("mongoose");

const getAllTasks = async (req, res) => {
    user_id = req.user._id.toHexString()

    console.log("GET getAllTasks '/'", user_id)
    const tasks = await Tasks.find({ user_id: user_id })

    return res.status(200).json(tasks)
}

const getOneTask = async (req, res) => {
    const { id } = req.params;
    user_id = req.user._id.toHexString()

    console.log(`GET getOneTask '/${id} for user ${user_id}'`)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Invalid id: ${id}`)
    }
    const task = await Tasks.findOne({ user_id: user_id, _id: id })
    if (!task) {
        return res.status(404).send(`No task with id: ${id}`)
    }

    return res.status(200).json(task)
}

const createTask = async (req, res) => {
    console.log("POST createTask '/'")
    user_id = req.user._id.toHexString()
    try {

        const { name, description } = req.body
        console.log(name)
        const newTask = await Tasks.create({
            name,
            description,
            user_id
        })
        return res.status(200).json({ newTask });
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    user_id = req.user._id.toHexString()

    console.log(`DELETE deleteTask '/${id} for user ${user_id}'`)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Invalid id: ${id}`)
    }
    try {
        const task = await Tasks.deleteOne({ _id: id, user_id: user_id })
        if (task.deletedCount === 0) {
            return res.status(404).send(`No task with id: ${id}`)
        }
        return res.status(200).json({ message: "Deletion Successful!", task })
    }
    catch (err) {
        return res.status(400).json({ error: err.message })
    }

}

const updateTask = async (req, res) => {
    const { id } = req.params;
    user_id = req.user._id.toHexString()
    console.log(`PATCH updateTask '/${id} for user ${user_id}'`)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Invalid id: ${id}`)
    }
    try {
        const task = await Tasks.findOneAndUpdate(
            { _id: id, user_id: user_id },
            {
                ...req.body,
            }
        )
        if (!task) {
            return res.status(404).send(`No task with id: ${id}`)
        }
        return res.status(200).json({ message: "Updation Successful!", task })
    }
    catch (err) {
        return res.status(400).json({ error: err.message })
    }
}



module.exports = { getAllTasks, getOneTask, createTask, deleteTask, updateTask };
