import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import firebase from 'firebase'
import { TextInput } from 'react-native-paper';
require('firebase/firestore')

export default function Comment(props) {

    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (props.route.params.postId !== postId) {
            firebase.firestore()
                    .collection('posts')
                    .doc(props.route.params.uid)
                    .collection('userPosts')
                    .doc(pprops.route.params.postId)
                    .collection('comments')
                    .get()
                    .then((snapshot) => {
                        let comments = snapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            return { id, ...data };
                        })
                        setComments(comments);
                    });
            setPostId(props.route.params.postId);
        }
    }, [props.route.params.postId]);

    const onCommentSend = () => {
        firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(pprops.route.params.postId)
                .collection('comments')
                .add({
                    creator: firebase.auth().currentUser.uid,
                    text: content,
                })
    }

    return (
        <View>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />

            <View>
                <TextInput 
                    placeholder='comment'
                    onChangeText={(text) => setContent(text)}
                />
                <Button 
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>
        </View>
    )
}
