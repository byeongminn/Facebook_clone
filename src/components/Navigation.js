import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaHome, FaUserFriends, FaUsers, FaGamepad, FaUserCircle } from "react-icons/fa";
import { BsCollectionPlay } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

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
                    <Tippy content="홈" arrow={false}>
                        <Link to="/">
                            <FaHome />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="친구" arrow={false}>
                        <Link to="/">
                            <FaUserFriends />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="Watch" arrow={false}>
                        <Link to="/">
                            <BsCollectionPlay />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="그룹" arrow={false}>
                        <Link to="/">
                            <FaUsers />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="게이밍" arrow={false}>
                        <Link to="/">
                            <FaGamepad />
                        </Link>
                    </Tippy>
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