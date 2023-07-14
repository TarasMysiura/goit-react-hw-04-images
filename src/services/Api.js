import axios from 'axios';
import PropTypes from 'prop-types';


const API_KEY = '36597593-1cefdef63bc4854971fb7bc7c';
const per_page = 12;

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return data;
};

fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};