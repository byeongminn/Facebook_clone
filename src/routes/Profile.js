import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Post from "../components/Post";
import PostFactory from "../components/PostFactory";
import { authService, dbService } from "../fbase";

const Profile = ( {userObj} ) => {
    const [posts, setPosts] = useState([]);

    const history = useHistory();

    const onLogoutClick = async () => {
        await authService.signOut();
        history.push("/");
    }

    useEffect(() => {
        dbService.collection("posts").where("createId", "==", userObj.uid).orderBy("createAt", "desc").onSnapshot(snapshot => {
            const postArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postArray);
        });
    }, [])

    return (
        <div>
            <div>
                <h1>{userObj.displayName}</h1>
                <button onClick={onLogoutClick}>로그아웃</button>
            </div>
            <PostFactory userObj={userObj} />
            {posts.map(post =>
                <Post key={post.id} userObj={userObj} postObj={post} isOwner={userObj.uid === post.createId} />)}
        </div>
    )
}

export default Profile;