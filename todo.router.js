"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */



//? express içinde ki router import edildi.
const router = require('express').Router()

const Todo = require('./todo.model')

// LIST
router.get('/',async(req,res)=>{

    const data = await Todo.findAndCountAll()
    res.send({
        eror:false,
        result:data
    })
})

// CREATE
router.post('/',async(req,res)=>{

    const data = await Todo.create(req.body)
    res.send({
        error:false,
        message:'created',
        result:data
    })
})

//? router dişardan erişime açıyoruz
module.exports = router









