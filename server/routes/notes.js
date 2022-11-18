const express = require('express');
const Note = require('../models/notes');
const router = express.Router();

router.get('/', (req,res)=> {
  try {

    const notes = Note.getNote();
    res.send(notes);

  }
  catch(err){
    res.status(401).send({message: 'error in note'});
  }
}

);

module.exports=router;