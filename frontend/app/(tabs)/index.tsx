import React from 'react'
import {Redirect } from 'expo-router'

//Set the inital landing page here!

export default function index() {

  /**
   * Later:
   * if (!loggedIn) {
   *  return <Redirect href="/login"/>;
   * } else {
   * return <Redirect href="/{default_land ?? "Feed"}"/>;
   * }
   */
    
    return <Redirect href="/Feed/FeedPage"/>;
}