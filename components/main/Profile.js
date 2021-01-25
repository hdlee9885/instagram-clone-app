import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
 
function Profile(props) {
    
    const { currentUser, posts } = props;
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    console.log(currentUser, posts)

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser);
            setUserPosts(posts);
        } else {
            firebase.firestore()
                    .collection('users')
                    .doc(props.route.params.uid)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.exists) {
                            setUser(snapshot.data());
                        } else {
                            console.log('User does not exist')
                        }
                    });
            firebase.firestore()
                    .collection('posts')
                    .doc(props.route.params.uid)
                    .collection('userPosts')
                    .orderBy('creation', 'asc')
                    .get()
                    .then((snapshot) => {
                        let posts = snapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            return { id, ...data };
                        })
                        setUserPosts(posts);
                    });
        }
    }, [props.route.params.uid]);

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return (
            <View />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>

            <Button
                title="Logout"
                onPress={() => onLogout()}
            />
            
            <View style={styles.containerGallery}>
                <FlatList 
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={(item) => (
                        <Image 
                            style={styles.postImage}
                            source={{uri: item.downloadURL}}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },

    containerInfo: {
        margin: 20
    },

    containerGallery: {
        flex: 1
    },

    postImage: {
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStatesToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
})

export default connect(mapStatesToProps, null)(Profile);
