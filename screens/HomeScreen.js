import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Title, IconButton, Colors, Card } from "react-native-paper";

const locations = [
  {
    key: "Paris",
    title: "Paris",
    url: "https://www.gpsmycity.com/img/gd_cover/1144.jpg",
    tours: [
      {
        title: "Le Louvre",
        image:
          "https://img.theweek.in/content/dam/week/webworld/feature/society/2016/august/images/Louvre-museum-paris.jpg",
        url: "https://petitegalerie.louvre.fr/visite-virtuelle/saison5/",
      },
      {
        title: "Eiffel Tower",
        image:
          "https://cdn.theculturetrip.com/wp-content/uploads/2018/05/eiffel-tower-3349075_1280-1.jpg",
        url: "https://www.youtube.com/watch?v=nbD8XYTw23Y",
      },
    ],
  },
  {
    key: "Rome",
    title: "Rome",
    url:
      "https://mymodernmet.com/wp/wp-content/uploads/2019/05/colosseum-facts-3.jpg",
    tours: [
      {
        title: "Colosseum",
        image:
          "https://www.planetware.com/wpimages/2019/05/italy-rome-colosseum-visiting-highlights-tips-tours.jpg",
        url: "https://www.youtube.com/watch?v=eJeF7hDB0UA",
      },

      {
        title: "Pantheon",
        image: "https://resize.hswstatic.com/w_907/gif/pantheon-parthenon.jpg",
        url: "https://www.360cities.net/image/pantheon-rome",
      },
    ],
  },
  {
    key: "Cairo",
    title: "Cairo",
    url:
      "https://www.corinthiantravel.co.uk/blog/wp-content/uploads/2016/07/egypt-1024x680.jpg",
    tours: [
      {
        title: "Tomb of Queen Meresankh III",
        image:
          "https://lh3.googleusercontent.com/proxy/Qn25iFdMEYCicmXg8kncPefiv_E0BGXViSBXyQ1YfeQOBy0LjvfGNWRWYLWOqY8KSYV7VftuoxOvsfJJie5OPWToCPyH_sdlUidXAdMLlETBIydys4e9bQBpzH0EYBCQ5_H2WZgoVe5XnIhrhPpUrzcr7T9f5g",
        url: "https://my.matterport.com/show/?m=d42fuVA21To",
      },
      {
        title: "The Great Pyramids of Giza",
        image:
          "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555389938/shape/mentalfloss/istock_000020293157_small_0.jpg?itok=l_HzbeIQ",
        url: "https://www.youtube.com/watch?v=TMzouTzim0o",
      },
    ],
  },
  {
    key: "Tokyo",
    title: "Tokyo",
    url:
      "https://i.insider.com/5d26280921a86107bb51bd92?width=1067&format=jpeg",
    tours: [
      {
        title: "Senso-ji",
        image:
          "https://i.pinimg.com/originals/53/ba/28/53ba28fceab59b99632f771b7e63d42a.jpg",
        url: "https://www.youtube.com/watch?v=VreIzj9WRtk",
      },
      {
        title: "Tokyo Sky Tree",
        image:
          "https://cdn.theculturetrip.com/wp-content/uploads/2018/05/eiffel-tower-3349075_1280-1.jpg",
        url: "https://www.360cities.net/image/view-from-tokyo-skytree",
      },
    ],
  },
  {
    key: "Berlin",
    title: "Berlin",
    url:
      "https://media.globalchampionstour.com/cache/750x429/assets/berlin.jpg",
    tours: [
      {
        title: "Brandenburg Gate",
        image:
          "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3OTIzNTc4ODAwMjUyNTYy/brandenburg-gate-a-brief-historys-featured-photo.jpg",
        url: "https://www.youtube.com/watch?v=URG8eIhqL6M",
      },
      {
        title: "Berlin Wall Memorial",
        image:
          "https://cdn.theculturetrip.com/wp-content/uploads/2018/05/eiffel-tower-3349075_1280-1.jpg",
        url: "https://www.youtube.com/watch?v=GXIYp8YX5M4",
      },
    ],
  },
];

export function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Title style={styles.title}>Destinations Unlocked</Title>

      <ScrollView horizontal={true} contentContainerStyle={styles.cards}>
        {locations.map((location) => (
          <Card
            key={location.key}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Destination", { location: location })
            }
          >
            <Card.Cover source={{ uri: location.url }} />
            <Card.Title title={location.title} />
          </Card>
        ))}
      </ScrollView>
      <IconButton
        icon="navigation"
        color="#246A73"
        size={40}
        style={styles.button}
        onPress={() => navigation.navigate("Map")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    marginTop: 50,
    flexWrap: "wrap",
  },
  title: {
    position: "absolute",
    top: 10,
  },
  button: {
    position: "absolute",
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
    alignSelf: "flex-start",
    margin: "2.5%",
  },
});
