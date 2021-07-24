import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FaPhotoVideo } from "react-icons/fa";

const PostFactory = ( {userObj} ) => {
    const [post, setPost] = useState("");
    const [attachment, setAttachment] = useState();
    
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
            creator: userObj.displayName,
            createAt: Date.now(),
            attachmentURL: attachmentURL
        }
        await dbService.collection("posts").add(postObj);
        setPost("");
        setAttachment(null);
    }

    return (
        <div id="postFactory__container">
            <form id="postFactory__form" onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder={`${userObj.displayName}님, 무슨 생각을 하고 계신가요?`} value={post} required onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="postFactory__file" id="postFactory__file__label">
                        <FaPhotoVideo />
                        <span>사진/동영상</span>
                    </label>
                    <input id="postFactory__file" type="file" accept="image/*" onChange={onFileChange} />
                </div>
                {attachment && <img src={attachment} alt="사진" width="590px" />}
            </form>
        </div>
    )
}

export default PostFactory;