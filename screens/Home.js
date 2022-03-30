import { react } from '@babel/types';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {SliderBox} from "react-native-image-slider-box";
import { getPopularMovies, getUpcomingMovies, getPopularTv, getFamilyMovies, getDocumentaries} from '../services/service';
//to import a pure component you don't need brackets around the name. For other components, you need the bracket.
import List from '../components/List';
import Error from '../components/Error';
const dimensions = Dimensions.get('screen');
//using the dimension library of react native to get the screen size in order to make responsive interface
const Home = () => {
    //useState is used to update variable since react loads every components at the beginning. 
    //for this example, you use setMovie to change the variable movie everytime you need it. In this case, after the async function, you will use setMovie to change the value of movie and the change will be reflected in the view.
    //You also have to use useEffect to avoid infinite loop from the useState. you can also add how often you want useEffect to run with the second parameter. an empty array would only run one time, 1000 would run every second
    //you will have to use useEffect everytime to manage the state of your DOM and the state of your application.
    //after then you can have a catch callback method
    const [error, setError] = useState(false);
    //when initializing an useState, make sure to initialize it with the default value you want. for example, the error default value should be false. 
    const [loaded, setLoaded] = useState(false);
    const [movieImages, setMoviesImages] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [documentaries, setDocumentaries] = useState();
    //refactoring: getData call all the async functions that return a promise (async function returns promises) so we don't have to rewrite the code many times.
    const getData = () => {
        return Promise.all([
            getUpcomingMovies(), getPopularMovies(), getPopularTv(), getFamilyMovies(),
            getDocumentaries()
        ])
    }
    //useEffect and call getData. in the callback function parameter, remember to keep the order of the array the same as the return of the function getData
    useEffect(() => {
        getData().then(([upcomingMoviesData, popularMoviesData,popularTvData, familyMoviesData, documentariesData ]) => {
            const moviesImagesArray = [];
            upcomingMoviesData.forEach(movie =>{
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
                
            })
            setMoviesImages(moviesImagesArray);
            setPopularMovies(popularMoviesData);
            setPopularTv(popularTvData);
            setFamilyMovies(familyMoviesData);
            setDocumentaries(documentariesData);
        }).catch( () => {
            setError(true);
        }).finally(() => {
            setLoaded(true);
        })
        
    }, [])
    //in the return, you can't put two different components. Therefore, if you have more than one view, you have to put it in the container element
    //in order for your app to have many elements and is scroll-able, you have to add scrollview from the react-native library.
    return (
        <React.Fragment>
            {loaded && !error && (<ScrollView>
                {movieImages && (<View
                style={styles.sliderContainer}>
                <SliderBox images={movieImages} autoplay ={true} circleLoop={true} sliderBoxHeight = {dimensions.height / 1.5} dotStyle={styles.sliderStyle}/>
                {error && <Text style={{color: 'red'}}>Error in the server</Text>}
                </View>)}
                {/* check if movieImages exists. if yes, show sliderbox */}
                {popularMovies && (<View style={styles.carousel}>
                    <List content={popularMovies} title="Popular Movies"/>
                </View>)}
                {/* check if popularMovies exist. if yes, show List */}
                {popularTv && (<View style={styles.carousel}>
                    <List content ={popularTv} title="Popular TV Shows"/>
                </View>)}
                {/* check if popularTv exist. if yes, show List */}
                {familyMovies && (<View style={styles.carousel}>
                    <List content ={familyMovies} title="Family Movies"/>
                </View>)}
                {/* check if familyMovies exist. if yes, show List */}
                {documentaries && (<View style={styles.carousel}>
                    <List content={documentaries} title="Documentaries"/>
                </View>)}
            </ScrollView>)}
            {!loaded && <ActivityIndicator/>}
            {error && <Error />}
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