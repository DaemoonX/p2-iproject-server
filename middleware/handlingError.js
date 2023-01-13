async function errorHandler(err, req, res, next){
    console.log(err);

    switch(err.name){

        case "EmailOrPasswordRequired":
            res.status(400).json({message:"Email Or Password Required" })
            break;

        
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            let error = err.errors[0].message
            res.status(400).json({message: error})
            break;
        
        
        case "InvalidCredential":
            res.status(401).json({message: 'Invalid Email or Password' })
            break;

        case "Unauthenticated":
        case "JsonWebTokenError":
            res.status(401).json({message: "Unauthenticated"})
            break;

        case "Forbidden":
            res.status(403).json({message: "Forbidden"})
            break;
        
        case "NotFound":
            res.status(404).json({message: 'Data not Found'})
            break;

        default:
            res.status(500).json({message: 'Internal Server Error'})
            break;
    }
}

module.exports = errorHandler