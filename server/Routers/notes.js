require('../data/dataBase');
const NoteModel = require('../model/notes');
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    NoteModel.find({}, (err, data) => {
        if (err) {
            console.log('error from mongoDB ...');
        } else {
            res.send(data)
        }
    })
})

router.post('/', (req, res) => {
    const newNote = new NoteModel({
        date : req.body.date,
        time : req.body.time,
        title : req.body.note
    })
    newNote.save().then( ()=> console.log('New Note has been added ...'));
})

router.delete('/', (req,res) => {
    console.log(req.body)
    NoteModel.findOneAndDelete({title : req.body.title},(err)=>{
        if(err){
            console.log('error in delte');
        }
        else {
            res.send({})
        }
    })
})


module.exports = router;