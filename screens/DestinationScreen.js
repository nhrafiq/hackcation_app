import React from 'react'; 
import { Title } from 'react-native-paper';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export function DestinationScreen ({navigation, route}){ 
    const {location} = route.params;
    return( 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
            <Title style={styles.title}>{location.title}</Title>
        </View>
    )
}

const styles = StyleSheet.create({ 
    title: {
        position: 'absolute',
        top: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
})