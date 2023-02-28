import axios from 'axios';

export const getImages = (query = '', page = 1) => {
    const response = `https://pixabay.com/api/?key=32216625-6f7cdca1cd8ffe8b3abf6c6b4&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
    return axios.get(response).then(res => res.data);
};

