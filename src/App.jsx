import { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./App.css";
import app from "./firebase/firebase.config";

const auth = getAuth(app);
// here we are using app inside of getAuth because we've exported app from firbase.congig.js
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
   signOut(auth) 
   .then(result=>{
    console.log('user signed out')
    setUser(null)
   })
   .catch(error=> {
    console.log(error)
   })
  }

  return (
    <div className="App">
      <h1>Firebase + React</h1>
      {/* user ? signout : sign in */}
      {
        user ? <button onClick={handleSignOut}>Sign out</button> :<div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div>
      }
      
      
      {user && (
        <div className="cart">
          <h4>User: {user.displayName}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
