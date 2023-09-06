import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    if(email && password) {
    
      try{
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data)
        setToken(response.data.token)
        if (response.data.token) {
         console.log('no existe')
        } else {
          alert("Une erreur est survenue, veuillez réssayer.");
        }


      } catch (error) {
        console.log(error.response.data)
        setErrorMessage(error.response.data)
      }
    
    } else{
      setErrorMessage('Please fill all fields')
    }
  };



  return (
    <ScrollView style={styles.contentContainerStyler}>
      <View style={styles.container}>
        <View style={styles.logoBloc}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={[styles.greyText, styles.title]}>Sign In</Text>
        </View>
        <View style={styles.blocForm}>
          <KeyboardAwareScrollView>
            <TextInput
              style={styles.underlineRed}
              placeholder="Username"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.underlineRed}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={true}
            />
          </KeyboardAwareScrollView>
        </View>
        <Text style={{color: "red"}}>{errorMessage}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{fetchData()}}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
        
            navigation.navigate("SignUp");
          }}>
          <Text
            style={styles.greyText}
            onPress={() => {
              navigation.navigate("SignUp");
            }}>
            No account ? Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyler: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
  },

  greyText: {
    color: "#848484",
  },

  title: {
    fontSize: 32,
  },

  underlineRed: {
    borderColor: "red",
    borderBottomWidth: 2,
    opacity: 0.5,
    paddingBottom: 10,
  },

  logoBloc: {
    height: 300,
    paddingBottom: 50,
    alignItems: "center",
  },
  logo: {
    height: "100%",
    width: 100,
    resizeMode: "contain",
  },
  blocForm: {
    height: 200,
    paddingTop: 40,
    width: 300,
    gap: 20,
  },
  button: {
    borderColor: "red",
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 60,
   
    marginBottom: 20,
  },
});
