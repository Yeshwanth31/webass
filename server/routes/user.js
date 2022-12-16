const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async(req,res)=> {
  try {
    // console.log("hi");
    const users = await User.getAllUsers();
    res.send(users);
  }
  catch(err) {
    res.json({ error: err.message || err.toString() });
  }
})

router.post('/register', async (req, res) => {
  try {
    // console.log('in routes user');
    // console.log(req.body);

    let user = await User.register(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    console.log(err.message);
    res.status(401).send({message: err.message});
  }
})

router.post('/login', async (req, res) => {
  try {
   // console.log('hi');
    let user = await User.login(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    // console.log('hiiiiiii');

    res.status(401).send({message: err.message});
  }
})


router.delete('/delete', async (req, res) => {
  try {
    let user = await User.deleteUser(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})

router.put('/update', async (req, res) => {
  try {
    let user = await User.editUser(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})

module.exports=router;