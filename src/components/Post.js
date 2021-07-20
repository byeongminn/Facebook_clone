import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import Modal from "react-modal";

const Post = ( {userObj, postObj, isOwner} ) => {
    const [newPost, setNewPost] = useState(postObj.text);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    Modal.setAppElement("#root");

    const openEditModal = () => {
        setEditModalIsOpen(true);
    }

    const closeEditModal = () => {
        setNewPost(postObj.text);
        closeExitModal();
        setEditModalIsOpen(false);
    }

    const openExitModal = () => {
        setExitModalIsOpen(true);
    }

    const closeExitModal = () => {
        setExitModalIsOpen(false);
    }

    const openDeleteModal = () => {
        setDeleteModalIsOpen(true);
    }

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewPost(value);
    }

    const onPostEditSubmit = async (event) => {
        event.preventDefault();
        if (postObj.text !== newPost) {
            await dbService.collection("posts").doc(`${postObj.id}`).update({
                text: newPost
            });
            closeEditModal();
        }
    }

    const onDeleteClick = async () => {
        await dbService.collection("posts").doc(`${postObj.id}`).delete();
        if (postObj.attachmentURL) {
            await storageService.refFromURL(`${postObj.attachmentURL}`).delete();
        }
    }

    return (
        <>
            <Modal isOpen={editModalIsOpen}>
                <div>
                    <h2>게시물 수정</h2>
                    <button onClick={() => {
                        if (postObj.text !== newPost) {
                            openExitModal();
                        } else {
                            closeEditModal();
                        }
                    }}>취소</button>
                    <Modal isOpen={exitModalIsOpen} onRequestClose={closeExitModal}>
                        <h2>저장되지 않은 변경 사항</h2>
                        <span>변경 사항이 저장되지 않습니다.</span>
                        <button onClick={closeExitModal}>계속 수정</button>
                        <button onClick={closeEditModal}>삭제</button>
                    </Modal>
                </div>
                <form onSubmit={onPostEditSubmit}>
                    <input type="text" placeholder={`${userObj.displayName}님, 무슨 생각을 하고 계신가요?`} required value={newPost} onChange={onChange} />
                    <input type="submit" value="저장" />
                </form>
            </Modal>
            <Modal isOpen={deleteModalIsOpen} onRequestClose={closeDeleteModal} >
                <div>
                    <h2>게시물을 삭제하시겠어요?</h2>
                    <span>이 게시물을 삭제하시겠어요?</span>
                    <button onClick={closeDeleteModal}>취소</button>
                    <button onClick={onDeleteClick}>삭제</button>
                </div>
            </Modal>
            <h4>
                {postObj.text}
                {postObj.attachmentURL && <img src={postObj.attachmentURL} alt="사진" width="50px" height="50px" />}
            </h4>
            {isOwner &&
                <>
                    <button onClick={openEditModal}>게시물 수정</button>
                    <button onClick={openDeleteModal}>게시물 삭제</button>
                </>
            }
        </>
    )
}

export default Post;