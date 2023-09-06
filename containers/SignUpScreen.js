import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    // console.log("presss");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );

          console.log("data>>>", data);
          setToken(data.token);
        } catch (error) {
          console.log("catch sign up>>>", error.response);

          setErrorMessage("sorry something went wrong");
        }
      } else {
        setErrorMessage("Passwords are different");
      }
    } else {
      console.log("Missing informations");
      setErrorMessage("Missing informations");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}
    >
      <Text>Sign up</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          // -- Pour effecer le message d'erreu s'il y en avait un
          setErrorMessage("");
        }}
      />

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={(text) => {
          setErrorMessage("");
          setUsername(text);
        }}
      />

      <TextInput
        placeholder="Description"
        multiline
        style={styles.input}
        value={description}
        onChangeText={(text) => {
          setErrorMessage("");
          setDescription(text);
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(text) => {
          setErrorMessage("");
          setPassword(text);
        }}
      />

      <TextInput
        placeholder="Confirm password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => {
          setErrorMessage("");
          setConfirmPassword(text);
        }}
      />

      {/* -- Le message d'erreur s'affiche uniquement s'il y en a un */}
      {errorMessage && <Text>{errorMessage}</Text>}

      <TouchableOpacity onPress={handleSignUp}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    width: "100%",
    marginVertical: 20,
  },
});
