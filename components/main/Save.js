import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Button, Image } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')

export default function Save(props) {

    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
                        .storage()
                        .ref()
                        .child(`posts/${firebase.auth.currentUser.uid}/${Math.random().toString(36)}`)
                        .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    console.log(props.route.params.image)
    return (
        <View style={{flex: 1}}>
            <Image source={{uri:props.route.params.image}} />
            <TextInput 
                placeholder="Write a Caption"
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button 
                title="Save"
                onPress={() => uploadImage()}
            />
        </View>
    )
}
