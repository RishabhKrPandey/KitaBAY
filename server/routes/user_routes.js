const express = require('express')
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// create all user related routes here
const router = express.Router()

router.get('/test', (req, res)=>{
    res.send("this is a test route")
})

router.get('/register', (req, res)=>{
    res.render('register')
})
router.post('/register',
    body('email').trim().isEmail().isLength({min:10}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async(req, res)=>{

        const errors = validationResult(req)
    // console.log(req.body)
    // res.send('user registered')
    if(!errors.isEmpty()){
        // res.send('Invalid data')
        //but we dont send it like this instead
        res.status(400).json(
            {
                errors:errors.array(),
                message:"Invalid Data",
            }
        )
    }
    // now obv if user is correct we will add it in database
    const {username, email, password} = req.body
    const hashpassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        email : email,
        username : username,
        password : hashpassword,
    })
    res.json(user)
    // but our password is not protected in case if database is compromised
    // there password must be protected
    

    
})

router.get('/login', (req, res)=>{
    res.render('login')
})
// get the data on backend validate and try to login the user
router.post('/login', 
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async(req, res) =>{
        const errors = validationResult(req)
          if(!errors.isEmpty()){
        // res.send('Invalid data')
        //but we dont send it like this instead
        res.status(400).json(
            {
                errors:errors.array(),
                message:"Invalid Data",
            }
        )
    }

    // if no error try to login the user
    const {username, password} = req.body;
    // look for it in the database
    const user = await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(400).json({
            message:'Incorrect username or password'
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            message:'Invalid username or password'
        })
    }
    // if password is correct then we generate a token
    // so that user needs only one log in
    // takes 2 parameters a sign which contains data and a secret key
    const token = jwt.sign({
        userid : user._id,
        email : user.email,
        username : user.username
    }, process.env.JWT_KEY)

    // we send the token on frontend with help of cookies
    // using cookie parser which is always set in app.js file
    res.cookie('token', token) 
    res.send('logged in')

    // after this we need to create home page and upload files to firebase
    


    }
)

module.exports = router;