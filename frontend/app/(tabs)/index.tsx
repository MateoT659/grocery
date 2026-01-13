import React, { useContext } from 'react'
import {Redirect } from 'expo-router'
import { UserContext } from '@/contexts/user-context';

//Set the inital landing page here!

export default function index() {
  const { user } = useContext(UserContext)
  
  if (user) {
    return <Redirect href="/login"/>;  }
  else {
    return <Redirect href="/(tabs)/Feed/FeedIndex"/>;
  }

  /**
   * Later:
   if (!loggedIn) {
   *  return <Redirect href="/login"/>;
   * } else {
   * return <Redirect href="/{default_land ?? "Feed"}"/>;
   * }
   */
    
}