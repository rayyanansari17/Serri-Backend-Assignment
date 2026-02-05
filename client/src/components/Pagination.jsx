import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchVideos } from '../services/videoapi.js';

export default function PaginationRounded({setCurrentPage, setVideos, totalPages, currentPage}) {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={async (e) => {
        let data = await fetchVideos(currentPage + 1);
        console.log(e)
        setVideos(data.data);
        setCurrentPage(currentPage + 1);
      }}/>
    </Stack>
  );
}