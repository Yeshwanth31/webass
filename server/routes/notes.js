const express = require('express');
const note = require('../models/notes');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await note.getAllnote();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/login', async (req, res) => {
    try {
      let note = await note.login(req.body);
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/register', async (req, res) => {
    try {
      let note = await note.register(req.body);
      res.send({...note, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      let note = await note.editnote(req.body);
      res.send({...note, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.deletenote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;