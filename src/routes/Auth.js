import React, { useState } from "react";
import { authService } from "../fbase";
import { Link } from "react-router-dom";

const Auth = ( {userObj} ) => {
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
        <div>
            <div>
                <span>facebook</span>
                <div>
                    <span>Facebook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠보세요.</span>                   
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="이메일" required onChange={onChange} />
                <input name="password" type="password" placeholder="비밀번호" required onChange={onChange} />
                <input type="submit" value="로그인" />
            </form>
            <div>{error}</div>
            <Link to="/Join">새 계정 만들기</Link>
        </div>
    )
}

export default Auth;