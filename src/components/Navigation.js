import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaHome, FaUserFriends, FaUsers, FaGamepad, FaUserCircle } from "react-icons/fa";
import { BsCollectionPlay } from "react-icons/bs";

const Navigation = ( {userObj} ) => {
    return (
        <ul>
            <div>
                <li>
                    <Link to="/">
                        <FaFacebook />
                    </Link>
                </li>
                <li>
                    <form>
                        <input type="text" placeholder="Facebook 검색" />
                    </form>
            </li>
            </div>
            <div>
                <li>
                    <Link to="/">
                        <FaHome />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FaUserFriends />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <BsCollectionPlay />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FaUsers />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <FaGamepad />
                    </Link>
                </li>
            </div>
            <div>
                <li>
                    <Link to="/Profile">
                        <FaUserCircle />
                        <span>{userObj.displayName}</span>
                    </Link>
                </li>
            </div>
        </ul>
    )
}

export default Navigation;