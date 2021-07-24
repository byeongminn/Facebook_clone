import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import Modal from "react-modal";
import { FaPen, FaTrash } from "react-icons/fa";

const Post = ( {userObj, postObj, isOwner} ) => {
    const [newPost, setNewPost] = useState("");
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    Modal.setAppElement("#root");

    const openEditModal = () => {
        setNewPost(postObj.text);
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
            <Modal isOpen={editModalIsOpen} overlayClassName="post__editModal__overlay" className="post__editModal__content" >
                <div id="post__edit__container">
                    <div id="post__edit__top">게시물 수정</div>
                    <form id="post__edit__middle" onSubmit={onPostEditSubmit}>
                        <input type="text" placeholder={`${userObj.displayName}님, 무슨 생각을 하고 계신가요?`} required value={newPost} onChange={onChange} />
                    </form>
                    <div id="post__edit__bottom">
                        <button onClick={() => {
                            if (postObj.text !== newPost) {
                                openExitModal();
                            } else {
                                closeEditModal();
                            }
                        }}>취소</button>
                        <button onClick={onPostEditSubmit}>저장</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={exitModalIsOpen} onRequestClose={closeExitModal} overlayClassName="post__editModal__overlay" className="post__editModal__content" >
                <div id="post__edit__cancel__container">
                    <div id="post__edit__cancel__top">저장되지 않은 변경 사항</div>
                    <div id="post__edit__cancel__middle">변경 사항이 저장되지 않습니다.</div>
                    <div id="post__edit__cancel__bottom">
                        <button onClick={closeExitModal}>계속 수정</button>
                        <button onClick={closeEditModal}>삭제</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={deleteModalIsOpen} onRequestClose={closeDeleteModal} overlayClassName="post__delModal__overlay" className="post__delModal__content" >
                <div id="post__del__container">
                    <div id="post__del__title">게시물을 삭제하시겠어요?</div>
                    <div id="post__del__content" >이 게시물을 삭제하시겠어요?</div>
                    <div id="post__del__btn">
                        <button onClick={onDeleteClick}>삭제</button>
                        <button onClick={closeDeleteModal}>취소</button>
                    </div>
                </div>
            </Modal>
            <div id="post__container">
                <div id="post__top">
                    <div>
                        <div id="post__creator">{postObj.creator}</div>
                    </div>
                    {isOwner &&
                        <div id="post__top__btn">
                            <button onClick={openEditModal}><FaPen /></button>
                            <button onClick={openDeleteModal}><FaTrash /></button>
                        </div>
                    }
                </div>
                <div id="post__middle">
                    <div id="post__content">{postObj.text}</div>
                    {postObj.attachmentURL && <img src={postObj.attachmentURL} id="post__image" alt="사진" width="626px" />}
                </div>
            </div>
        </>
    )
}

export default Post;