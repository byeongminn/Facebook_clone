import React from "react";

const Post = ( {postObj, isOwner} ) => {
    return (
        <>
            <h4>
                {postObj.text}
                {postObj.attachmentURL && <img src={postObj.attachmentURL} alt="사진" width="50px" height="50px" />}
            </h4>
            {isOwner &&
                <>
                    <button>게시물 수정</button>
                    <button>게시물 삭제</button>
                </>
            }
        </>
    )
}

export default Post;