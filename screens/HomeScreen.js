import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton, Colors, Card } from 'react-native-paper';

const locations = [
    {
        key: "Paris",
        title: "Paris",
        url: "https://www.gpsmycity.com/img/gd_cover/1144.jpg",
        tours: [{ 
            title: "Le Louvre",
            image: "https://img.theweek.in/content/dam/week/webworld/feature/society/2016/august/images/Louvre-museum-paris.jpg",
            url: "https://petitegalerie.louvre.fr/visite-virtuelle/saison5/",
        },
    ]
    },
    {
        key: "Rome",
        title: "Rome",
        url: "https://mymodernmet.com/wp/wp-content/uploads/2019/05/colosseum-facts-3.jpg",
        tours: [],
    },
    { 
        key: "Cairo",
        title: "Cairo",
        url: "https://www.corinthiantravel.co.uk/blog/wp-content/uploads/2016/07/egypt-1024x680.jpg",
        tours: [{
            title: "Tomb of Queen Meresankh III",
            image: "",
            url: "https://my.matterport.com/show/?m=d42fuVA21To"
        }]
        
    }
]



export function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}>
            <Title style={styles.title}>Destinations Unlocked</Title>
            <View style={styles.cards}>
                {locations.map(location => 
                <Card key={location.key} style={styles.card} onPress={()=> navigation.navigate('Destination', {location:location})}>
                    <Card.Cover source={{ uri: location.url }} />
                    <Card.Title title={location.title}/>
                </Card>)}
            </View>
            <IconButton
                icon="navigation"
                color="#246A73"
                size={40}
                style={styles.button}
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cards: { 
        flex: 1, 
        flexDirection: "row", 
        justifyContent:"flex-start", 
        alignContent:"flex-start", 
        marginTop:50,
    },
    title: {
        position: 'absolute',
        top: 10,
    },
    button: {
        position: 'absolute',
        bottom: 10,
        borderRadius: 70,
        height: 70,
        width: 70,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "#246A73",
    },
    card: {
        height: "40%",
        width: "45%",
        alignSelf:"flex-start",
        marginRight:"2.5%"
    },
});