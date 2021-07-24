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
        <>
            <Introduce userObj={userObj} refreshUser={refreshUser} />
            <div id="home__container">
                <div id="home__left__container">
                    각종 메뉴
                </div>
                <div id="home__middle__container">
                    <PostFactory userObj={userObj} />
                    {posts.map(post =>
                        <Post key={post.id} userObj={userObj} postObj={post} isOwner={userObj.uid === post.createId} />)}
                </div>
                <div id="home__right__container">
                    친구 목록
                </div>
            </div>
        </>
    )
}

export default Home;