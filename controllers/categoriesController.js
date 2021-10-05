const categoryModel = require('../models/categoryModel')
module.exports = {
    getAll: async(req, res, next) => {
        try {
            const categories = await categoryModel.find()
            res.json(categories)
        } catch (e) {
            next(e)
        }
    },
    create: async(req, res, next) => {
        try {
            console.log(req.body)
            console.log(req.body.name)

            const document = new categoryModel({
                name: req.body.name
            })

            const response = await document.save()

            res.json(response)
        } catch (e) {
            //e.status=200
            next(e)
        }

    }
}