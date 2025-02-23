import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // Validation - not empty
    // check if user already exists: username , email
    // check for images
    // check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field form response
    // check for user creation
    // return response
    
    const {fullName, username, email, password} = req.body
    console.log("email", email);

    if (
        [fullName, username, email, password].some((value) => value?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }else if(!email.includes("@")){
        throw new ApiError(400, "Email is not valid");
    }
    
    const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(existedUser){
        throw new ApiError(409, "User already exists");
    } 

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath ) {
        throw new ApiError(400, "Avatar and cover image are required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar ) {
        throw new ApiError(500, "Error while uploading images");
    }

    const user = await User.create({
        fullName,
        username : username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    const userCreated = await User.findById(user._id)
    .select("-password -refreshToken")

    if(!userCreated){
        throw new ApiError(500, "Error while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, userCreated, "User created successfully")
    )

});

export { registerUser };