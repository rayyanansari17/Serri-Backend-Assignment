import { useState } from "react";
import { searchVideos, fetchVideos } from "../services/videoapi.js";

const Searching = ({ videos, setVideos }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-xl">
        <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
          />

          {/* Search Button */}
          <button
            onClick={async () => {
              if (!query.trim()) return;
              const searchResult = await searchVideos(query, 1);
              setVideos(searchResult);
            }}
            className="bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Search
          </button>

          {/* Reset Button */}
          <button
            onClick={async () => {
              const resetResult = await fetchVideos(1);
              setVideos(resetResult.data);
              setQuery("");
            }}
            className="bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Helper text */}
        <p className="mt-2 text-center text-xs text-gray-500">
          Search by title or description
        </p>
      </div>
    </div>
  );
};

export default Searching;
