import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RegisterStyles from "../Styles/RegisterStyles";
import axios from "axios";
import DropdownComponent from "../components/DropdownMenu";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonScale = new Animated.Value(1);
  const [serverMessage, setServerMessage] = useState("server not found");

  const [wakeHour, setWakeHour] = useState("");
  const [wakeMinute, setWakeMinute] = useState("");
  const [sleepHour, setSleepHour] = useState("");
  const [sleepMinute, setSleepMinute] = useState("");

  const API_URL = "http://127.0.0.1:5001";

  const api = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    if (Number(wakeHour) > 23) {
      setServerMessage("Please Input Hours Between 0 and 23");
      setWakeHour("");
    } else if (Number(wakeMinute) > 59) {
      setServerMessage("Please Input Minutes Between 0 and 59");
      setWakeMinute("");
    } else if (Number(sleepHour) > 23) {
      setServerMessage("Please Input Hours Between 0 and 23");
      setSleepHour("");
    } else if (Number(sleepMinute) > 59) {
      setServerMessage("Please Input Minutes Between 0 and 59");
      setSleepMinute("");
    } else{
    }
  }, [wakeHour, wakeMinute, sleepHour, sleepMinute]);

  const handleLogin = async () => {
    if (
      !email ||
      !password ||
      !wakeHour ||
      !wakeMinute ||
      !sleepHour ||
      !sleepMinute
    ) {
      setServerMessage("Please fill out all input fields!");
    }

    setIsLoading(true);
    try {
      const response = await api.post("/register", { email, password });

      if (response.status == 200) {
      } else {
        setServerMessage("Email already exists!");
      }
    } catch (err) {
      console.error("Error Registering User")
      setServerMessage("Server Failed, please try again")
      
    }
    setIsLoading(false);
  };

  const handleWakeHour = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setWakeHour(numericValue);
  };

  const handleWakeMinute = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setWakeMinute(numericValue);
  };

  const handleSleepHour = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setSleepHour(numericValue);
  };

  const handleSleepMinute = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setSleepMinute(numericValue);
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={RegisterStyles.container}
    >
      <LinearGradient
        colors={["#19191a", "#454545"]}
        style={RegisterStyles.gradient}
      >
        <View style={RegisterStyles.loginContainer}>
          <Text style={RegisterStyles.title}>Register</Text>

          <View style={RegisterStyles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#666"
              style={RegisterStyles.inputIcon}
            />
            <TextInput
              style={RegisterStyles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={RegisterStyles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={RegisterStyles.inputIcon}
            />
            <TextInput
              style={RegisterStyles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={RegisterStyles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={RegisterStyles.inputContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#666"
              style={RegisterStyles.inputIcon}
            />
            <View style={RegisterStyles.timeTextContainer}>
              <Text style={RegisterStyles.timeText}>Time You Wake Up</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              value={wakeHour}
              onChangeText={handleWakeHour}
              placeholder="0"
            />

            <Text> : </Text>
            <TextInput
              keyboardType="numeric"
              value={wakeMinute}
              onChangeText={handleWakeMinute}
              placeholder="0"
            />
          </View>

          <View style={RegisterStyles.inputContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#666"
              style={RegisterStyles.inputIcon}
            />
            <View style={RegisterStyles.timeTextContainer}>
              <Text style={RegisterStyles.timeText}>Time You Sleep</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              value={sleepHour}
              onChangeText={handleSleepHour}
              placeholder="0"
            />

            <Text> : </Text>
            <TextInput
              keyboardType="numeric"
              value={sleepMinute}
              onChangeText={handleSleepMinute}
              placeholder="0"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              animateButton();
              handleLogin();
            }}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                RegisterStyles.loginButton,
                { transform: [{ scale: buttonScale }] },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={RegisterStyles.loginButtonText}>Register</Text>
              )}
            </Animated.View>
          </TouchableOpacity>

          <View style={RegisterStyles.signupContainer}>
            <Text style={RegisterStyles.signupText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text style={RegisterStyles.signupLink}>Login</Text>
            </TouchableOpacity>
          </View>
          {serverMessage && (
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Text style={RegisterStyles.serverMessage}>{serverMessage}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
