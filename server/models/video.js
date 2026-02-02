import mongoose from "mongoose";


const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    publishedAt: {
      type: Date,
      required: true,
      index: true
    },

    thumbnails: {
      default: String,
      medium: String,
      high: String
    },

    channelTitle: String
  },
  { timestamps: true }
);

/* Create text index for title and description for full-text search */

videoSchema.index({
  title: "text",
  description: "text"
});


const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;