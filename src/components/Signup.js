import React, { useRef, useState } from "react";
import "./signup.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyA5XvQ3xDY5KdxiInrSPu4U-DBFHEkKiNY",
  authDomain: "signup-app-5c3b7.firebaseapp.com",
  projectId: "signup-app-5c3b7",
  storageBucket: "signup-app-5c3b7.appspot.com",
  messagingSenderId: "68269670423",
  appId: "1:68269670423:web:655887d32dd14c1993dc52",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const generateCaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha_verifier",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("captcha varified!");
      },
    },
    auth
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const phoneRef = useRef();
  const otpRef = useRef();
  const [expand, setExpand] = useState(false);
  const countryCode = "+91";

  const requestOtp = (e) => {
    e.preventDefault();

    if (phoneRef.current.value.length === 10) {
      setExpand((prev) => !prev);
      generateCaptcha();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = countryCode + phoneRef.current.value;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log("OTP Sent");
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otpRef.current.value.length === 6) {
      setExpand((prev) => !prev);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otpRef.current.value)
        .then((result) => {
          const user = result.user;
          navigate("/home");
          console.log(user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="signin">
      <form>
        <h1 className="signin_heading">Sign In</h1>
        <input
          type={"tel"}
          placeholder="+91"
          className="signin_input"
          ref={phoneRef}
        />
        {expand && (
          <input
            type={"bumber"}
            placeholder="OTP"
            className="signin_input"
            ref={otpRef}
          />
        )}
        {!expand && (
          <button className="btn" onClick={requestOtp}>
            Request OTP
          </button>
        )}
        {expand && (
          <button className="btn" onClick={verifyOtp}>
            Submit OTP
          </button>
        )}

        <div id="recaptcha_verifier"></div>
      </form>
    </div>
  );
};

export default Signup;
