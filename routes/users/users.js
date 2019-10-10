const router = require('express').Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const validateLoginInput = require('../../utility/validation/login');
const validateRegisterInput = require('../../utility/validation/register');
const User = require('../../models/User');

router.post('/register',(req,res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    User.findOne({ email:req.body.email })
    .then(user=>{
        if(user)
        {
            return res.status(400).json({ email:'Email already exists'});
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user =>res.json(user.name))
                    .catch(err=>console.log(err));
                    res.status(201);

                })
            });
            
        }
    })
});

router.post('/login',(req,res)=>{
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid)
    {
        res.json(errors).status(400);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(400).json({ emailnotfound:'Email not found'})
        }
        console.log(user);
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch){
                const payload ={
                    id:user.id,
                    name: user.email
                };

                jwt.sign(
                    payload,
                    keys.secretKey,
                    {
                        expiresIn: 31556926
                    },
                    (err,token)=>{
                        res.json({
                            success:true,
                            token: 'Bearer' +token
                        });
                    }
                )
            }
            else{
                return res.status(404).json({passwordincorrect:"Password incorrect"})
            }
        });

    })
})


module.exports = router;
