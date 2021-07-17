import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const AppRouter = ( {isLoggedIn, userObj} ) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route path="/">
                            <Home />
                        </Route>
                        <Route path="/Profile">
                            <Profile />
                        </Route>
                    </>
                    :
                    <>
                        <Route path="/">
                            <Auth />
                        </Route>
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;