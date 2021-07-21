import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaHome, FaUserFriends, FaUsers, FaGamepad, FaUserCircle, FaSearch } from "react-icons/fa";
import { BsCollectionPlay } from "react-icons/bs";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Navigation = ( {userObj} ) => {
    return (
        <ul id="nav__container">
            <div id="nav__left">
                <li>
                    <Link to="/">
                        <FaFacebook id="logo__icon" />
                    </Link>
                </li>
                <li>
                    <form id="search__container">
                        <FaSearch />
                        <input id="search__input" type="text" placeholder="Facebook 검색" />
                    </form>
                </li>
            </div>
            <div id="nav__middle">
                <li>
                    <Tippy content="홈" arrow={false}>
                        <Link to="/" id="option">
                            <FaHome />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="친구" arrow={false}>
                        <Link to="/" id="option">
                            <FaUserFriends />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="Watch" arrow={false}>
                        <Link to="/" id="option">
                            <BsCollectionPlay />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="그룹" arrow={false}>
                        <Link to="/" id="option">
                            <FaUsers />
                        </Link>
                    </Tippy>
                </li>
                <li>
                    <Tippy content="게이밍" arrow={false}>
                        <Link to="/" id="option">
                            <FaGamepad />
                        </Link>
                    </Tippy>
                </li>
            </div>
            <div id="nav__right">
                <li>
                    <Link to="/Profile" id="profile">
                        <FaUserCircle />
                        <span>{userObj.displayName}</span>
                    </Link>
                </li>
            </div>
        </ul>
    )
}

export default Navigation;