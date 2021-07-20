import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import Introduce from "./Introduce";

const Home = ( {userObj, refreshUser} ) => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        dbService.collection("posts").orderBy("createAt", "desc").onSnapshot(snapshot => {
            const postArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postArray);
        })
    }, [])

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setPost(value);
    }

    const onFileChange = (event) => {
        const {
            target: { files }
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        if (theFile) {
            reader.onloadend = (finishedEvent) => {
                const {
                    target: { result }
                } = finishedEvent;
                setAttachment(result);
            }
            reader.readAsDataURL(theFile);
        } else {
            setAttachment(null);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment != null) {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const postObj = {
            text: post,
            createId: userObj.uid,
            createAt: Date.now(),
            attachmentURL: attachmentURL
        }
        await dbService.collection("posts").add(postObj);
        setPost("");
        setAttachment(null);
    }

    return (
        <div>
            <Introduce userObj={userObj} refreshUser={refreshUser} />
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={`${userObj.displayName}님, 무슨 생각을 하고 계신가요?`} value={post} required onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange} />
            </form>
            {posts.map(post =>
                <Post key={post.id} userObj={userObj} postObj={post} isOwner={userObj.uid === post.createId} />)}
        </div>
    )
}

export default Home;