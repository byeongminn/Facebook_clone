import React, { useState } from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [error, setError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const history = useHistory();

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "checkPassword") {
            setCheckPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password === checkPassword) {
                await authService.createUserWithEmailAndPassword(email, password);
                history.push("/Introduce");
            } else {
                setError("비밀번호가 서로 일치하지 않습니다.");
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("이미 사용중인 이메일입니다.");
            } else if (error.code === "auth/weak-password") {
                setError("비밀번호는 최소 6자 이상이어야 합니다.");
            } else {
                setError("양식에 맞게 입력해주십시오.");
            }
        }
    }

    Modal.setAppElement("#root");

    const openModal= () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>새 계정 만들기</button>
            <Modal isOpen={modalIsOpen}>
                <div>
                    <span>가입하기</span>
                    <span>빠르고 쉽습니다.</span>
                </div>
                <form onSubmit={onSubmit}>
                    <input name="email" type="email" placeholder="이메일" required onChange={onChange} />
                    <input name="password" type="password" placeholder="새 비밀번호" required onChange={onChange} />
                    <input name="checkPassword" type="password" placeholder="비밀번호 확인" required onChange={onChange} />
                    <input type="submit" value="가입하기" />
                </form>
                <div>{error}</div>
                <button onClick={closeModal}>취소</button>
            </Modal>
        </div>
    )
}

export default Join;