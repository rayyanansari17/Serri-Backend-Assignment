import express from "express";
import axios from "axios";
import Video from "../models/video.js";

const Youtube_Search_URL = "https://www.googleapis.com/youtube/v3/search";

let isfetching = false;

export async function fetchLatestVideos() {
  if (isfetching) {
    console.log("Fetch already in progress. Skipping this cycle.");
    return;
  }
  isfetching = true;

  try {
    const apiKey = process.env.YouTube_API_Key;
    const query = process.env.SEARCH_QUERY || "ice cream";

    if (!apiKey || !query) {
      console.log("missing api key or search query");
      return;
    }

    const { data } = await axios.get(Youtube_Search_URL, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        order: "date",
        maxResults: 20,
        key: apiKey,
      },
    });

    const items = data?.items || [];

    for (const item of items) {
      const videoId = item?.id.videoId;
      const snippet = item?.snippet;

      if (!videoId || !snippet) continue;

      // const doc = {
      //   videoId,
      //   title: snippet.title,
      //   description: snippet.description,
      //   publishedAt: new Date(snippet.publishedAt),
      //   thumbnails: {
      //     default: snippet.thumbnails?.default?.url || "",
      //     medium: snippet.thumbnails?.medium?.url || "",
      //     high: snippet.thumbnails?.high?.url || "",
      //     url: `https://www.youtube.com/watch?v=${videoId}`,
      //       fetchedAt: new Date()
      //   },
      //   channelTitle: snippet.channelTitle || "",
      // };

      const doc = {
        videoId,
        title: snippet.title,
        description: snippet.description,
        publishedAt: new Date(snippet.publishedAt),
        thumbnails: {
          default: snippet.thumbnails?.default?.url || "",
          medium: snippet.thumbnails?.medium?.url || "",
          high: snippet.thumbnails?.high?.url || "",
        },
        channelTitle: snippet.channelTitle || "",
        url: `https://www.youtube.com/watch?v=${videoId}`, // Adding URL field to the document
      };

      // upsert = insert if not exists, else update
      await Video.updateOne({ videoId }, { $set: doc }, { upsert: true });
    }

    console.log(
      `[YouTube Poll] Stored/Updated ${items.length} videos for "${query}"`,
    );
  } catch (error) {
    const status = error?.response?.status;
    const msg = error?.response?.data?.error?.message || err.message;
    console.log("[YouTube Poll] Error:", status, msg);
  } finally {
    isfetching = false;
  }
}

function startVideoFetchInterval(intervalMs = 1800000) {   // Default to 30 minutes
  fetchLatestVideos(); // Initial fetch
  setInterval(fetchLatestVideos, intervalMs);
}

export default startVideoFetchInterval;
