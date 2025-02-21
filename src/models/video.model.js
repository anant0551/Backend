import mongoose , {Schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        views: {
            type: Number,
            default: 0
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        thumbnail: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        
         
    },
    {
        timestamps: true
    }
)
videoSchema.plugin(mongooseAggregatePaginate);  
export const Video = mongoose.model("Video", videoSchema);