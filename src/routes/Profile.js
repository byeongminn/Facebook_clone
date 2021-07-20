import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

const Profile = () => {
    const history = useHistory();

    const onLogoutClick = async () => {
        await authService.signOut();
        history.push("/");
    }

    return (
        <div>
            Profile
            <button onClick={onLogoutClick}>로그아웃</button>
        </div>
    )
}

export default Profile;