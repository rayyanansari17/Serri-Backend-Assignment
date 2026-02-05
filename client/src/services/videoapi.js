import axios from "axios";

export const fetchVideos = async (page) => {
      try {
            let baseURL = import.meta.env.VITE_BASE_URL;
            let response = await axios.get(`${baseURL}`, {
                  params: {
                        page,
                        limit: 20,
                  },
            });
            return response.data;
      } catch (error) {
            console.log(error.message);
      }
};

export const searchVideos = async (searchQuery, page) => {
      try {
            let baseURL = import.meta.env.VITE_BASE_URL;
            let response = await axios.get(`${baseURL}/search`, {
                  params: {
                        q: searchQuery,
                        page,
                  },
            });
            return response.data.data;
      } catch (error) {
            console.log(error.message);
      }
};