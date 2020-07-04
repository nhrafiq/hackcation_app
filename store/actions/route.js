import AsyncStorage from '@react-native-community/async-storage';

getData = async () => {
    try {
      const dist = await AsyncStorage.getItem('distance')
      const time = await AsyncStorage.getItem('startTime')
      if (dist !== null && time !== null) {
        // value previously stored
        console.log(dist);
        console.log(time);
      }
      
    } catch (e) {
      // error reading value
    }
  }