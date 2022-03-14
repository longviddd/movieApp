import { react } from '@babel/types';
import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {SliderBox} from "react-native-image-slider-box";
import { getPopularMovies, getUpcomingMovies } from '../services/service';
//to import a pure component you don't need brackets around the name. For other components, you need the bracket.
import List from '../components/List';
const dimensions = Dimensions.get('screen');
//using the dimension library of react native to get the screen size in order to make responsive interface
const Home = () => {
    console.log(dimensions.height);
    //useState is used to update variable since react loads every components at the beginning. 
    //for this example, you use setMovie to change the variable movie everytime you need it. In this case, after the async function, you will use setMovie to change the value of movie and the change will be reflected in the view.
    //You also have to use useEffect to avoid infinite loop from the useState. you can also add how often you want useEffect to run with the second parameter. an empty array would only run one time, 1000 would run every second
    //you will have to use useEffect everytime to manage the state of your DOM and the state of your application.
    //after then you can have a catch callback method
    const [error, setError] = useState(false);
    const [movieImages, setMoviesImages] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        getUpcomingMovies().then(movies =>{
            const moviesImagesArray = [];
            movies.forEach(movie =>{
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
                
            })
            setMoviesImages(moviesImagesArray);
            console.log(movieImages)
        }).catch(err =>{
            setError(err);
        })
        getPopularMovies().then(movies => {
            setPopularMovies(movies);
        }).catch(err => {
        setError(err);
        });
    }, [])
    //in the return, you can't put two different components. Therefore, if you have more than one view, you have to put it in the container element
    return (
        <React.Fragment>
            <View
            style={styles.sliderContainer}>
            <SliderBox images={movieImages} autoplay ={true} circleLoop={true} sliderBoxHeight = {dimensions.height / 1.5} dotStyle={styles.sliderStyle}/>
            {error && <Text style={{color: 'red'}}>Error in the server</Text>}
            </View>
            <View style={styles.carousel}>
                <List content={popularMovies} title="Popular Movies"></List>
            </View>
            <View style={styles.carousel}>
                <List content={popularMovies} title="Popular movies list"></List>
            </View>
        </React.Fragment>
        
    );
}
//in order to have style outside of your components. you use stylesheet from react native library. It is similar to css
const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderStyle: {
        height: 0
    },
    carousel:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home;