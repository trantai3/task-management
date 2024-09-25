const Task = require('../models/task.model')

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }
    const tasks = await Task.find(find)

    res.json(tasks)
}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findOne({
            _id: id,
            deleted: false
        })

        res.json(task)
    } catch (error) {
        res.json({message: 'Task not found'})
    }

}