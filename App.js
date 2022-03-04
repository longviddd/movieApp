import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getPopularMovies } from './services/service';

const App = () => {
  //useState is used to update variable since react loads every components at the beginning. 
  //for this example, you use setMovie to change the variable movie everytime you need it. In this case, after the async function, you will use setMovie to change the value of movie and the change will be reflected in the view.
  //You also have to use useEffect to avoid infinite loop from the useState. you can also add how often you want useEffect to run with the second parameter. an empty array would only run one time, 1000 would run every second
  //you will have to use useEffect everytime to manage the state of your DOM and the state of your application.
  //after then you can have a catch callback method
  const [movie, setMovie] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    getPopularMovies().then(movies => {
      setMovie(movies[0]);
    }).catch(err => {
      setError(err);
    });
  }, [])
  
  let title = 'Movie Name';
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Movie Name: {movie.original_title}</Text>
      <Text>Movie Language: {movie.original_language}</Text>
      <Text>Release Date: {movie.release_date}</Text>
      {error && <Text style={{color: 'red'}}>Error in the server</Text>}
    </View>
  )
}
export default App;