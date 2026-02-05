import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
      {
            videoId: {
                  type: String,
                  required: true,
                  unique: true,
                  index: true,
            },

            title: {
                  type: String,
                  required: true,
                  trim: true,
            },

            description: {
                  type: String,
                  default: "",
                  trim: true,
            },

            publishedAt: {
                  type: Date,
                  required: true,
                  index: true,
            },

            thumbnails: {
                  type: Object,
                  default: {},
            },

            channelTitle: {
                  type: String,
                  default: "",
            },

            tags: {
                  type: [String],
                  default: [],
            },

            url: {
                  type: String,
                  default: "",
            },

            fetchedAt: {
                  type: Date,
                  default: Date.now,
            },
      },
      { timestamps: true },
);

videoSchema.index({ title: "text", description: "text" }); // Creating a text index for easy and partial searches

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;