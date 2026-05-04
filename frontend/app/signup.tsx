import { PostUserSignupInputDto } from "@/build/api_types";
import { UserContext } from "@/contexts/user-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { getUserPostSignup } from "@/requests/Users";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";

import EyePasswordIcon from "@/components/eye_password_icon";
import SignupButton from "@/components/signup/signup-button";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { useThemePalette } from "@/hooks/get-theme-color";

export default function SingupScreen() {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const theme = useThemePalette();
  const inputColor = useThemeColor({}, "text");

  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setnameInput] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const usersignupInput: PostUserSignupInputDto = {
    emailInput,
    usernameInput,
    passwordInput,
    nameInput,
  };

  const handleSignup = async () => {
    try {
      const userData = await getUserPostSignup(usersignupInput);
      userContext?.setUser(userData);
      setErrorMessage("");

      router.replace("/login");
    } catch (err: any) {
      if (err.message === "400") {
        setErrorMessage("Invalid email format. Please try again.");
      } else if (err.message === "409") {
        setErrorMessage("Username or email already exists.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Create Account</ThemedText>
          </ThemedView>

          <ThemedView style={styles.loginBody}>
            <ThemedTextInput
              style={[{ color: inputColor }]}
              placeholder="Name"
              onChangeText={setnameInput}
              value={nameInput}
            />

            <ThemedTextInput
              style={[{ color: inputColor }]}
              placeholder="Username"
              onChangeText={setUsernameInput}
              value={usernameInput}
            />

            <ThemedTextInput
              style={[{ color: inputColor }]}
              placeholder="Email Address"
              onChangeText={setEmailInput}
              value={emailInput}
              keyboardType="email-address"
            />

            <ThemedView style={styles.passwordContainer}>
              <ThemedTextInput
                style={[{ color: inputColor }]}
                placeholder="Password"
                onChangeText={setPasswordInput}
                value={passwordInput}
                secureTextEntry={showPassword}
              />
              <EyePasswordIcon
                onPress={() => setShowPassword((prev) => !prev)}
                showPassword={showPassword}
              />
            </ThemedView>

            <SignupButton title="Sign Up" onPress={handleSignup} />

            <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  loginBody: {
    gap: 30,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
});
