import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { dbService } from "../fbase";
import Introduce from "../components/Introduce";
import PostFactory from "../components/PostFactory";

const Home = ( {userObj, refreshUser} ) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbService.collection("posts").orderBy("createAt", "desc").onSnapshot(snapshot => {
            const postArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postArray);
        })
    }, [])

    return (
        <div>
            <Introduce userObj={userObj} refreshUser={refreshUser} />
            <PostFactory userObj={userObj} />
            {posts.map(post =>
                <Post key={post.id} userObj={userObj} postObj={post} isOwner={userObj.uid === post.createId} />)}
        </div>
    )
}

export default Home;