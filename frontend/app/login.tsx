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

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");


  const inputColor = useThemeColor({}, 'text');
  
  const handleLogin = async () => {
    const result = await fetch
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
            onChangeText={setUsernameInput}
            value={usernameInput}>  
          </TextInput>

          <ThemedView>
            <LoginButton
                title="Login"
                onPress={handleLogin}
            />

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
  }

});