const productsModel = require('../models/productsModel')
const categoryModel = require('../models/categoryModel')
module.exports = {
    getAll: async(req, res, next) => {
        try {
            let queryFind = {}
            if (req.query.find) {
                queryFind = { name: { $regex: ".*" + req.query.find + ".*", $options: "i" } }
            }
            const document = await productsModel.find(queryFind).populate("category")
            res.json(document)
        } catch (e) {
            next(e)
        }
    },
    getDestacados: async(req, res, next) => {
        try {
            const document = await productsModel.find({ destacado: true }).populate("category")
            res.json(document)
        } catch (e) {
            next(e)
        }
    },
    getById: async(req, res, next) => {
        try {
            const document = await productsModel.findById(req.params.id).populate("category")
            res.json(document)
        } catch (e) {
            next(e)
        }
    },
    create: async(req, res, next) => {
        console.log(req.body)
        try {
            const category = await categoryModel.findByIdAndValidate(req.body.category)
            console.log(category)
            if (category.error) {
                res.json(category)
                return;
            }
            const product = new productsModel({
                name: req.body.name,
                sku: req.body.sku,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                destacado: req.body.destacado
            })
            const document = await product.save()
            res.json(document)
        } catch (e) {
            next(e)
        }
    },
    update: async(req, res, next) => {
        try {
            console.log(req.params)
            console.log(req.body)
            const producto = await productsModel.updateOne({ _id: req.params.id }, req.body)
            res.json(producto)
        } catch (e) {
            next(e)
        }
    },
    delete: async(req, res, next) => {
        try {
            console.log(req.params)
            const producto = await productsModel.deleteOne({ _id: req.params.id })
            res.json(producto)
        } catch (e) {
            next(e)
        }
    }

}