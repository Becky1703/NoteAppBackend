const jwt = require("jsonwebtoken");

// Middleware function for authenticating incoming requests based on the provided JWT token
function authenticator(req,res,next){
    // Extracts the JWT token from the Authorization in request headers and verifies it using the secret key
    const token = req.headers.authorization
    jwt.verify(token,"Becky1703",(err,decode)=>{
        // if there is an error during token verification
        if(err) return  res.send({
            message:"Token is not valid, please login.",
            status:2
        })
        // if token is valid, sets the user ID from the token to the request body and call the next middleware function or route handler. 
        if(decode){
            req.body.user= decode.userId
            next()
        }else{
            // if decoding is unsuccessful, sends an error response
            res.send({
                message:"Token is not valid, please login.",
                status:2
            })
        }
    })


    
}

module.exports={
    authenticator
}