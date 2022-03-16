import React from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Card from './Card';

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
}
class List extends React.PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <View style = {styles.list}>
                <View><Text style = {styles.text}>{title}</Text></View>
                <View>
                    <FlatList data={content} horizontal = {true} renderItem={({item}) => <Card item={item}>{item.title}</Card>}>
                    
                    </FlatList>
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize:20,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    list:{
        marginTop: 25
    }
})
List.propTypes = propTypes;
export default List;