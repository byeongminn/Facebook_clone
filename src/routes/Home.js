import React from "react";
import { useHistory } from "react-router-dom";

const Home = ( {userObj} ) => {
    const history = useHistory();

    return (
        <div>
            {!userObj.displayName ? history.push("/Introduce") : <span>Home</span>}
        </div>
        
    )
}

export default Home;