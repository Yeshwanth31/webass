const express = require('express');
const Note = require('../models/notes');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllnote();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })


  .post('/register', async (req, res) => {
    try {
      console.log(req.body);
      let note = await Note.register(req.body);
      res.send({...note, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      let note = await Note.editnote(req.body);
      res.send({...note, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      Note.deletenote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;