import React, { useContext } from 'react'
import {Redirect } from 'expo-router'
import { UserContext } from '@/contexts/user-context';
import { ActivityIndicator } from 'react-native-paper';

//Set the inital landing page here!

export default function index() {
  const { user, loadingUser } = useContext(UserContext)
  
  if (loadingUser) {
    return <ActivityIndicator />;
  }

  if (!user) {
    return <Redirect href="/login"/>;  }
  else {
    return <Redirect href="/(tabs)/Feed/FeedIndex"/>;
  }
    
}