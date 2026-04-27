import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from '@/contexts/user-context';
import { getUserPostSignup } from '@/requests/Users';
import { PostUserSignupInputDto } from "@/build/api_types";
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { TextInput } from "react-native-paper";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedText } from "@/components/themed/themed-text";
import SignupButton from "@/components/signup/signup-button";
import EyePasswordIcon from '@/components/eye_password_icon_signup.tsx';

export default function SingupScreen() {

  const userContext = useContext(UserContext);
  const router = useRouter();
  const inputColor = useThemeColor({}, 'text');

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
    nameInput
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

      router.replace('/login');
    }
    catch (err: any) {
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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

          <ThemedView>
            <ThemedView style={styles.loginBody}>
              <ThemedView>
                <TextInput
                  style={[styles.textInput, { color: inputColor }]}
                  placeholder="Name"
                  onChangeText={(val) => {
                    setnameInput(val);
                    setFieldErrors(e => ({ ...e, name: "" }));
                  }}
                  value={nameInput}
                />
                {fieldErrors.name ? <ThemedText style={styles.fieldError}>{fieldErrors.name}</ThemedText> : null}
              </ThemedView>

              <ThemedView>
                <TextInput
                  style={[styles.textInput, { color: inputColor }]}
                  placeholder="Username"
                  onChangeText={(val) => {
                    setUsernameInput(val);
                    setFieldErrors(e => ({ ...e, username: "" }));
                  }}
                  value={usernameInput}
                />
                {fieldErrors.username ? <ThemedText style={styles.fieldError}>{fieldErrors.username}</ThemedText> : null}
                </ThemedView>

              <ThemedView>
                <TextInput
                  style={[styles.textInput, { color: inputColor }]}
                  placeholder="Email Address"
                  onChangeText={(val) => {
                    setEmailInput(val);
                    setFieldErrors(e => ({ ...e, email: "" }));
                  }}
                  value={emailInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {fieldErrors.email ? <ThemedText style={styles.fieldError}>{fieldErrors.email}</ThemedText> : null}
              </ThemedView>

              <ThemedView>
                <ThemedView style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.textInput, { color: inputColor }]}
                    placeholder="Password"
                    onChangeText={(val) => {
                      setPasswordInput(val);
                      setFieldErrors(e => ({ ...e, password: "" }));
                    }}
                    value={passwordInput}
                    secureTextEntry={showPassword}
                  />
                  <EyePasswordIcon
                    onPress={() => setShowPassword(prev => !prev)}
                    showPassword={showPassword}
                  />
                </ThemedView>
                {fieldErrors.password ? <ThemedText style={styles.fieldError}>{fieldErrors.password}</ThemedText> : null}
              </ThemedView>

                <SignupButton
                  title="Sign Up"
                  onPress={handleSignup}
                />

                <ThemedText style={styles.errorMessage}>
                  {errorMessage}
                </ThemedText>

              </ThemedView>
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
  textInput: {
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1.5,
  },
  fieldError: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  }
});
