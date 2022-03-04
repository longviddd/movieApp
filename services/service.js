import axios from "axios";
//create variable to reuse apiURL
const apiUrl = "https://api.themoviedb.org/3"
const apiKey = "api_key=94521603514044d897db51b0f6b9487d"

//in react native, you always have to export a function to use them in another file
//get popular movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}&language=en-US&page=1`);
    return resp.data.results;
}
//get upcoming movie
export const getUpcomingMovies = async () =>{
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}&language=en-US&page=1`);
    return resp.data.results;
}