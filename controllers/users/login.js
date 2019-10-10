const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateLoginInput = require('../../utility/validation/login');
const keys = require('../../config/keys');
const User = require('../../models/User');

const login = (req,res)=>{
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

                jwt.sign(payload, keys.secretKey,{ expiresIn: 31556926 },(err,token)=>{
                        res.json({
                            success:true,
                            token:token
                        });
                    }
                );
            }
            else{
                return res.status(404).json({passwordincorrect:"Password incorrect"})
            }
        });

    })
}

module.exports = login;