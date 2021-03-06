const validateRegisterInput = require('../../utility/validation/register');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const register=(req,res)=>{
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
}
module.exports=register;