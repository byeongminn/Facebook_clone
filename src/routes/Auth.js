import React, { useState } from "react";
import ResetPassword from "../components/ResetPassword";
import { authService } from "../fbase";
import Join from "./Join";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.signInWithEmailAndPassword(email, password);
        } catch (error) {
            if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
                setError("입력하신 이메일 주소가 계정에 연결되지 않았습니다.");
            } else if (error.code === "auth/user-disabled") {
                setError("해당 계정은 정지된 계정입니다.");
            } else if (error.code === "auth/wrong-password") {
                setError("입력된 비밀번호가 올바르지 않습니다.");
            }
        }
    }

    return (
        <div id="auth__container">
            <div id="welcome">
                <span>jacebook</span>
                <span>Jacebook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠보세요.</span>
            </div>
            <div id="login__container">
                <form id="login__form" onSubmit={onSubmit}>
                    <input id="login__email" name="email" type="email" placeholder="이메일" required onChange={onChange} />
                    <input id="login__password" name="password" type="password" placeholder="비밀번호" required onChange={onChange} />
                    <input id="login__submit" type="submit" value="로그인" />
                </form>
                <div>{error}</div>
                <ResetPassword />
                <Join />
            </div>
        </div>
    )
}

export default Auth;