import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Videos = ({ title, publishedAt, thumbnails, channelTitle, url }) => {
  const timeAgo = dayjs(publishedAt).fromNow();

  return (
    <div className="group w-64 rounded-xl bg-white shadow-sm transition hover:shadow-lg">

      {/* Thumbnail */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="relative h-36 w-full overflow-hidden rounded-t-xl">
          <img
            src={thumbnails?.high || thumbnails?.medium || thumbnails?.default}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-col gap-1 px-3 py-2">

        {/* Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-600"
        >
          {title}
        </a>

        {/* Channel */}
        <p className="truncate text-xs text-gray-600">
          {channelTitle}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{timeAgo}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span>YouTube</span>
        </div>
      </div>
    </div>
  );
};

export default Videos;
