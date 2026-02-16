import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from '@/contexts/user-context';
import { getUserPostSignup } from '@/requests/Users';
import { PostUserSignupInputDto } from "@/build/api_types";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedText } from "@/components/themed/themed-text";
import { TextInput } from "react-native-paper";
import { Dimensions,StyleSheet } from "react-native";
import SignupButton from "@/components/signup/signup-button";

export default function SingupScreen(){
    const userContext = useContext(UserContext);
    const router = useRouter();
    const inputColor = useThemeColor({}, 'text');
    

    const [nameInput, setnameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const usersignupInput: PostUserSignupInputDto = {
      emailInput: emailInput,
      usernameInput: usernameInput,
      passwordInput: passwordInput,
      nameInput: ""
    };

    console.log("Name of User: " + userContext?.user?.name)

    const handleSignup = async () => {
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
                setErrorMessage("An unexpected error occurred. " + err);
            }
        }
    }

    return(
        <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ThemedScrollView style={styles.scrollContainer}>
        
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Create Account</ThemedText>
        </ThemedView>

        <ThemedView style={styles.loginBody}>
          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Email Address"
            onChangeText={setEmailInput}
            value={emailInput}
            keyboardType="email-address"
          />

          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Name"
            onChangeText={setnameInput}
            value={passwordInput}
          />

          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Username"
            onChangeText={setUsernameInput}
            value={usernameInput}
          />

          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Password"
            onChangeText={setPasswordInput}
            value={passwordInput}
            secureTextEntry={true}
          />

          <ThemedView>
            <SignupButton
                title="Sign Up"
                onPress={handleSignup} 
            />
            <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
            <ThemedView style={styles.noAccountMessage}></ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    margin: 15,
  },
  loginBody: {
    display: 'flex',
    gap: 30
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 50
  },
  textInput: {
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    fontSize: 18
  },
  inputTitle: {
    marginBottom: 5
  },
  noAccountMessage: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  }
});


