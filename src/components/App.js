import React, { useEffect, useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./Route";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args)
        })
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => user.updateProfile(args)
    })
  }

  return (
    <div>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "잠시만 기다려주세요..."}
    </div>
  );
}

export default App;
