import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
class Card extends React.PureComponent {
    
    render() {
        const {item} = this.props
        return (
            //touchable opacity is a wrapper for making views respond properly to touches
            //Image tag is also from the react native library. it is used to show image. if you want to show the image from the URI you have to add the uri tags. Also, images won't show up if you don't specify the width and the height. 
            <TouchableOpacity style = {styles.container}>
                <Image  style={styles.image} source ={{uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}}/>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 5,
        position: 'relative',
    }, 
    image : {
        height: 200,
        width:120,
        borderRadius: 20, 
    }
})
export default Card;