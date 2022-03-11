import React from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
class List extends React.PureComponent {
    render() {
        const {title, content} = this.props
        return (
            <View style = {styles.list}>
                <View><Text style = {styles.text}>{title}</Text></View>
                <View>
                    <FlatList data={content} horizontal = {true} renderItem={({item}) => <Text>{item.title}</Text>}>
                    
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

export default List;