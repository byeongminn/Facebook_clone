import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Join from "../routes/Join";
import Profile from "../routes/Profile";

const AppRouter = ( {isLoggedIn, userObj} ) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/Profile">
                            <Profile />
                        </Route>
                    </>
                    :
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Route exact path="/Join">
                            <Join />
                        </Route>
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;