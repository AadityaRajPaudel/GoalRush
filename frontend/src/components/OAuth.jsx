import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../../firebase.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    console.log("Button clicked");
    dispatch(signInStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure("Failed to sign in with google"));
        return;
      }
      dispatch(signInSuccess(data.message));
      navigate("/");
    } catch (err) {
      console.log("Hi" + err);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Google</button>
    </div>
  );
}