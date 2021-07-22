import React, { useState } from "react";
import Modal from "react-modal";
import { authService } from "../fbase";

const ResetPassword = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [okModalIsOpen, setOkModalIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [displayError, setDisplayError] = useState(false);
    const [error, setError] = useState("");

    Modal.setAppElement("#root");

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setError("");
        setDisplayError(false);
        setModalIsOpen(false);
        setOkModalIsOpen(false);
    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setEmail(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.sendPasswordResetEmail(email);
            setDisplayError(false);
            setOkModalIsOpen(true);
        } catch (error) {
            setDisplayError(true);
            if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
                setError("존재하지 않는 이메일입니다.");
            }
        }
    }

    return (
        <>
            <div id="reset__btn__container">
                <button id="reset__btn" onClick={openModal}>비밀번호를 잊으셨나요?</button>
            </div>
            <div id="reset__modal__container">
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <div>
                        <span>비밀번호 초기화</span>
                    </div>
                    <div>
                        {displayError && <div>
                            <span>비밀번호 초기화 실패</span>
                            <span>{error}</span>
                        </div>}
                        <span>비밀번호를 초기화하려면 이메일 주소를 입력하세요.</span>
                        <form onSubmit={onSubmit}>
                            <input type="email" placeholder="이메일" required onChange={onChange} />
                        </form>
                    </div>
                    <div>
                        <button onClick={closeModal}>취소</button>
                        <button onClick={onSubmit}>확인</button>
                    </div>
                </Modal>
                <Modal isOpen={okModalIsOpen}>
                    <span>해당 이메일을 확인해 주세요.</span>
                    <button onClick={closeModal}>닫기</button>
                </Modal>
            </div>
        </>
    )
}

export default ResetPassword;