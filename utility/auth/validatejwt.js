const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateToken=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    let result;
    if(authHeader)
    {
        const token = req.headers.authorization.split(' ')[1];
        const opts = {
            expiresIn: '2d',
            issuer:'www.venomwolf.com'
        };
    
        try{
            result =jwt.verify(token, keys.secretKey, opts);
            req.decoded = result;
            next();
        }
        catch(err)
        {
            throw new Error(err);
        }
    }
    else{
        result = {
            error:'Access Denied',
            status:401
        };
        res.status(result.status).send(result);
    }

}
module.exports=validateToken;