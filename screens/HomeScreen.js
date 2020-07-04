import * as React from 'react';
import { View } from 'react-native';
import { Title, Button } from 'react-native-paper';

export function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Title>Home Screen</Title>
            <View style={{}} >
                <Button mode="contained" onPress={() => navigation.navigate('Map')}>Explore</Button>
            </View>
        </View>
    );
}

