module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const cate = require('../../modules/cate')
    router.post('/cate', async(req, res) => {
        const model = await cate.create(req.body)
        let result;
        if (model) {
            result = {
                "code": 200,
                "data": model,
                "msg": "添加分类成功"
            }
        } else {
            result = {
                "code": 0,
                "data": model,
                "msg": "添加分类失败"
            }
        }
        res.send(result)
    })
    router.put('/cate/:id', async(req, res) => {
        const model = await cate.findByIdAndUpdate(`${req.params.id}`,{$set:{'name':`${req.body.name}`}})
        let result;
        if (model) {
            result = {
                "code": 200,
                "data": model,
                "msg": "编辑分类成功"
            }
        } else {
            result = {
                "code": 0,
                "data": model,
                "msg": "编辑分类失败"
            }
        }
        res.send(result)
    })
    router.delete('/cate/:id', async(req, res) => {
        const model = await cate.findByIdAndDelete(req.params.id)
        let result;
        if (model) {
            result = {
                "code": 200,
                "data": model,
                "msg": "删除成功"
            }
        } else {
            result = {
                "code": 0,
                "data": model,
                "msg": "删除失败"
            }
        }
        res.send(result)
    })
    router.get('/cate',async(req,res) => {
        const data = await cate.find().populate('parent').limit(10)
        let result;
        if (data) {
            result = {
                "code": 200,
                "data": data,
                "msg": "查询成功"
            }
        } else {
            result = {
                "code": 0,
                "data": "[]",
                "msg": "查询失败,请重试"
            }
        }
        res.send(result)
    })
    router.get('/cate/:id',async(req,res) => {
        const item = await cate.findById(req.params.id)
        let result;
        if (item) {
            result = {
                "code": 200,
                "data": item,
                "msg": "查询成功"
            }
        } else {
            result = {
                "code": 0,
                "data": {},
                "msg":"查询失败,请重试"
            }
        }
        res.send(result)
    })
    app.use('/admin/api', router)
}