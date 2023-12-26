const authMiddleware = require("./auth-middleware");

const adminMiddleware = async (req ,res, next) => {
    try {
       console.log(req.user) ;
       const adminRole = req.user.isAdmin;
       if(!adminRole){
         return  res.status(403).json({ message: "Access denied. User is not an admin." });
       }
       //If the user is admin,proceed to the next middleware
        next();
    } catch (error) {
       next(error); 
    }
};


module.exports = authMiddleware;