import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from "./firebase";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  }, []);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,  // Only email/password
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          <h1>Project Remy</h1>
          <p>Welcome! You are now signed-in!</p>
        </div>
      ) : (
        <div>
          <h1>Project Remy</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      )}
    </div>
  );
}

export default App;
