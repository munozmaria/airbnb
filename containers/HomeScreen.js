import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, TouchableOpacity, FlatList } from "react-native";
import axios from "axios";
import { useEffect } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useEffect(true);
  const [data, setData] = useEffect({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        )
        console.log(response.data);
        // setData(data);
        // setLoading(false);
       
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return loading? <Text>No data</Text> : (
    <View>
      <FlatList data={data} keyExtractor={item => String(item.id)}
  renderItem={({ item }) => <Text>{item.name}</Text>}> </FlatList>
      <TouchableOpacity>
        <Text>GetRoomsp</Text>
      </TouchableOpacity>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
