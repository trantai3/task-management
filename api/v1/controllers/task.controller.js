const Task = require('../models/task.model')
const paginationHelper = require('../../../helpers/pagination')
const searchHelper = require('../../../helpers/search')

// [GET] /tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    // Search
    let objectSearch = searchHelper(req.query)

    if (req.query.keyword) {
        find.title = objectSearch.regex
    }
    // End search

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    }
    const countTasks = await Task.countDocuments(find)
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    )
    // End pagination

    // Sort
    const sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)
    // End sort
    res.json(tasks)
}

// [GET] /tasks/detail/:id
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

// [PATCH] /tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id

        const status = req.body.status

        await Task.updateOne({
            _id: id
        }, {
            status: status
        })
    
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}

// [PATCH] /tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                })
                break
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!"
                })
                break
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}

// [POST] /tasks/create
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body)
        const data = await task.save()

        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}