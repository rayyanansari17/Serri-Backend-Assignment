import express from "express";
import Video from "../models/video.js";

const router = express.Router();

// GET /videos?page=1&limit=20

router.get("/videos", async (req, res) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = Math.min(parseInt(limit), 50); // max limit of 50

    const skip = (page - 1) * limit;

    const total = await Video.countDocuments();
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: videos,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//Search videos by title or description

router.get("/videos/search", async (req, res) => {
  try {
    let { q, page = 1, limit = 20 } = req.query;
    if (!q) {
      return res.status(400).json({ msg: "Search Query is Required" });
    }

    page = parseInt(page);
    limit = Math.min(parseInt(limit));

    const skip = (page - 1) * limit;

    const total = await Video.countDocuments({
      $text: { $search: q },
    });

    const videos = await Video.find(
      {
        $text: { $search: q },
      },
      { score: { $meta: "textScore" } },
    )

      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: videos,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
