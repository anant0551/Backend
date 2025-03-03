import { JsonWebTokenError } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model";


export const verifyJWT = asyncHandler(async(req, _, next) => {
   try {
    
     const token = req.cookies?.accessToken || req.header("Authentication")?.relplace("Bearer ", "")
     if(!token){
         throw new ApiError(401, "Unauthorized")
     }
     const deodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(deodedToken._id).select("-password -refreshToken")
 
     if(!user){
         throw new ApiError(401, "Unauthorized")
     
     }
     req.user = user
     next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token") 
   }

} )