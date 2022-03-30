import axios from "axios";
//create variable to reuse apiURL
const apiUrl = "https://api.themoviedb.org/3"
const apiKey = "api_key=94521603514044d897db51b0f6b9487d"

//in react native, you always have to export a function to use them in another file
//get popular movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return resp.data.results;
}
//get upcoming movie
export const getUpcomingMovies = async () =>{
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return resp.data.results;
}
//get popular tv show
export const getPopularTv = async () =>{
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return resp.data.results;
}
export const getFamilyMovies = async () =>{
    const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=10751`)
    return resp.data.results;
}
export const getDocumentaries = async () =>{
    const resp = await axios.get(`${apiUrl}/discover/movie?${apiKey}&with_genres=99`)
    return resp.data.results;
}