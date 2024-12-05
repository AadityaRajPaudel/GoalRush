import React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [recoveryCode, setRecoveryCode] = React.useState(null);
  const [error, setError] = React.useState(false);
  const recoveryCodeRef = React.useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendCode = async () => {
    const recoveryCode = Math.floor(Math.random() * 9000 + 1000);
    // send email
    // then just check if code=recoverycode, if true navigate to reset pw
    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          recoveryCode,
        }),
      });
      if (res.success === false) {
        setError("Failed to send code. Please retry.");
        return;
      }
      setIsCodeSent(true);
      setRecoveryCode(recoveryCode);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const submitRecoveryCode = () => {
    if (recoveryCode == recoveryCodeRef.current.value) {
      // send the email to the backend, generate complex random token in backend and save it to database, return that token and navigate to the route
      // check if user with that token exists, if not return invalid
      navigate("/changePassword");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Enter your account's email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          onChange={handleEmailChange}
          required
        />
        <button onClick={sendCode}>Send Code</button>
        {isCodeSent && (
          <div>
            <label htmlFor="recoveryCode">
              Enter the code from your email:
            </label>
            <input
              type="number"
              id="recoveryCode"
              useRef={recoveryCodeRef}
              required
            />
            <button onClick={submitRecoveryCode}>Recover Account</button>
          </div>
        )}
      </div>
    </div>
  );
}
