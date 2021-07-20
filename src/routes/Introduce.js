import React, { useState } from "react";
import Modal from "react-modal";

const Introduce = ( {userObj, refreshUser} ) => {
    const [name, setName] = useState("");

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await userObj.updateProfile({
            displayName: name,
        })
        refreshUser();
    }

    return (
        <div>
            <Modal isOpen={!userObj.displayName}>
                <span>나를 소개해주세요.</span>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="이름" required onChange={onChange} />
                    <input type="submit" value="저장하기" />
                </form>
            </Modal>
        </div>
    )
}

export default Introduce;