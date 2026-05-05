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

import FilterHeader from "@/components/chevron-back";
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
  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const usersignupInput: PostUserSignupInputDto = {
    emailInput,
    usernameInput,
    passwordInput,
    nameInput,
  };

  const validate = (): boolean => {
    const newErrors = { name: "", username: "", email: "", password: "" };
    let isValid = true;

    if (!nameInput.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!usernameInput.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    } else if (usernameInput.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      isValid = false;
    }

    if (!emailInput.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!passwordInput) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (passwordInput.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setFieldErrors(newErrors);
    return isValid;
  };


  const handleSignup = async () => {
    if (!validate()) return;

    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
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
          <FilterHeader />
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
    gap: 15,
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
