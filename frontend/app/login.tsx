import { Dimensions, StyleSheet, TextInput } from 'react-native';

import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedScrollView } from '@/components/themed/themed-scroll-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { UserContext } from '@/contexts/user-context';
import { useContext, useState } from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link, useRouter } from 'expo-router';
import LoginButton from '@/components/login/login-button';
import { PostUserLoginInputDto } from "@/build/api_types";
import { getUserPostLogin } from '@/requests/Users';

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [user, setUser] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const inputColor = useThemeColor({}, 'text');
  
  const userLoginInput: PostUserLoginInputDto = {
    usernameInput: usernameInput,
    passwordInput: passwordInput,
  };

  console.log("Name of User: " + userContext?.user?.name);


  const handleLogin = async () => {
    try {
      const userData = await getUserPostLogin(userLoginInput);
      userContext?.setUser(userData);
      setErrorMessage("");

      router.replace('/(tabs)/Feed/FeedIndex');
    }
    catch (err: any) {
      if (err.message === "401") {
        setErrorMessage("Invalid password. Please try again.");
      }
      else if (err.message === "500") {
        setErrorMessage("Invalid credentials. Please try again.");
      }
      else {
        setErrorMessage("An unexpected error occured. " + err);
      }
    }

    console.log("Name of User: " + userContext?.user?.name);

    
  }

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ThemedScrollView style={styles.scrollContainer}>
        
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Login</ThemedText>
        </ThemedView>

        <ThemedView style={styles.loginBody}>
          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Username"
            onChangeText={setUsernameInput}
            value={usernameInput}>  
          </TextInput>


          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Password"
            onChangeText={setPasswordInput}
            value={passwordInput}>  
          </TextInput>

          <ThemedView>
            <LoginButton
                title="Login"
                onPress={handleLogin}
            />

            <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>

            <ThemedView style={styles.noAccountMessage}>
              <Link style={{color: "#53a6ff", fontSize: 15, textAlignVertical: 'auto'}} href="/">Don't have an account? Sign Up!</Link>
            </ThemedView>
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