import axios from 'axios'

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '1a75738acec9514b11e04afb65ee71a1',
        language: 'es-ES'
    }
});

export default movieDB;