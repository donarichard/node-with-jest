const express = require('express')

const router = express()

var students = [];

router.get('/',(req, res)=>{
    return res.status(200).json({
        data:students,
        error:null
    })
})

router.post('/',(req,res)=>{
    const data = req.body.student
    students.push(data)
    res.status(201).json({
        message:"Student created successfully",
        error:null
    })
})

router.delete('/:id',(req,res)=>{
    try {
        const id = req.params.id
        students =  students.splice(students.indexOf(id), 1);
         res.status(200).json({
             message:"Student Deleted successfully",
             error:null
         })   
    } catch (error) {
        res.status(500).json({
            error
        })
    }
   
})

module.exports = {
    router
}