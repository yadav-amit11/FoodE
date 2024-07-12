const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret="qwwerfjemcwncfiecndfrnjdfnrewfnecn3jewfr3c";


router.post("/createuser",
  [
    body('email', 'invalid').isEmail(),
    body('name').isLength({ min: 2 }),
    body('phoneno').isLength({ min: 10 }),

    body('password', 'Error! Minimum 8 chars').isLength({ min: 8 })]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt);

    
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        phoneno: req.body.phoneno,
        location: req.body.location

      })
      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  })

router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Error! Minimum 8 chars').isLength({ min: 8 })]
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid Login Credentials" });
      }

      const pwdComp=await bcrypt.compare(req.body.password,userData.password)
      if(!pwdComp){
        return res.status(400).json({ errors: "Invalid Login Credentials" });
      } 
       
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken });


    } catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  })

module.exports = router; 