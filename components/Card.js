import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
const placeholderImage = require('../assets/images/placeholder.png')

//PropTypes are a mechanism to ensure that components use the correct data type and pass the right data, and that components use the right type of props, and that receiving components receive the right type ofdata
const propTypes = {
    item: PropTypes.object,
}
class Card extends React.PureComponent {
    
    render() {
        const {item} = this.props
        return (
            //touchable opacity is a wrapper for making views respond properly to touches
            //Image tag is also from the react native library. it is used to show image. if you want to show the image from the URI you have to add the uri tags. Also, images won't show up if you don't specify the width and the height. 
            <TouchableOpacity style = {styles.container}>
                <Image  style={styles.image} source ={
                    item.poster_path ?
                    {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}:
                     placeholderImage}/>
                {!item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 5,
        position: 'relative',
        height: 200
    }, 
    image : {
        height: 200,
        width:120,
        borderRadius: 20, 
    },
    movieName:{
        marginTop: 10,
        position: 'absolute',
        alignSelf: 'center'
    }
})
Card.propTypes = propTypes
export default Card;