import React, { useEffect, useState } from 'react'
import {DEV_API_HOSTURL} from '@/.apiconfig.json';
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GetExampleClassDto, PutExampleClassDto, PutResponseExampleClassDto } from '@/build/api_types';

export default function ExampleApiView() {
    const [exampleApiData, setExampleApiData] = useState<GetExampleClassDto>();

    useEffect(()=>{
      //whenever the page loads, fetch the data from the api
      getRequest();
    }, []);

    async function getRequest() {
      const apiHost = DEV_API_HOSTURL;
      try{
        const response = await fetch(`${apiHost}/example-api/get`)
        const data = await response.json()
        setExampleApiData(data)
      }
      catch(error){
        console.error("Error fetching example API:", error)
      }
    }

    async function putRequest(data: PutExampleClassDto) {
      //send a PUT request with some data, and recieve the response
      const apiHost = DEV_API_HOSTURL;
      try {
        const response = await fetch(`${apiHost}/example-api/put`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData: PutResponseExampleClassDto = await response.json();
        if(responseData.success === false){
          console.warn("Error updating example API: ", responseData.message);

        }
      }
      catch(error){
        console.error("Error updating example API:", error);
      }
      getRequest(); //refresh the data after updating
    }

    async function addBlueberry() {
      if (!exampleApiData) return;

      const data: PutExampleClassDto = {
        numBlueBerries: exampleApiData.numBlueBerries + 1,
      }
      await putRequest(data);
    }

    async function removeBlueberry() {
      if (!exampleApiData) return;
      const data: PutExampleClassDto = {
        numBlueBerries: exampleApiData.numBlueBerries - 1,
      }
      await putRequest(data);
    }

  return (
    <>
      {exampleApiData ? (
        <ThemedView style={{marginBottom: 16, backgroundColor: `rgb(${exampleApiData.color.red}, ${exampleApiData.color.green}, ${exampleApiData.color.blue})`, padding: 8, borderRadius: 8}}>
          <ThemedText type="subtitle">Example API Data:</ThemedText>
          <ThemedText>{exampleApiData.message}</ThemedText>

          <View style={styles.blueberryContainer}>
            <ThemedText>
              {
                Array.from({length: exampleApiData.numBlueBerries}, () => (
                  "🫐"
                ))
              }
            </ThemedText>

          </View>
            <View style={styles.blueberryContainer}>
              <Ionicons name="add-circle" size={20} color="black" onPress={addBlueberry}/>
              <Ionicons name="remove-circle" size={20} color="black" onPress={removeBlueberry}/>
            </View>
        </ThemedView>
      ) : (
        <ThemedView style={{marginBottom: 16, backgroundColor: "#8f83b2ff", padding: 8, borderRadius: 8}}>
          <ThemedText type="subtitle" style={{color:'black'}}>Example API Data:</ThemedText>
          <ThemedText style={{color:'black'}}>Data not found (yet...)</ThemedText>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  blueberryContainer: {
    flexDirection: 'row',
  },
})