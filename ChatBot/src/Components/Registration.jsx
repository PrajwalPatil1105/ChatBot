import React, { useState } from "react";
import { motion } from "framer-motion";
import Styles from "../Styles/Registration.module.css";

const Registration = ({ onNext, setUserData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showVerification) {
      await sendVerificationCode(formData.email);
      setShowVerification(true);
      return;
    }
    if (await verifyCode(formData.email, formData.verificationCode)) {
      setUserData(formData);
      onNext();
    }
  };

  // Here i will use Auth0 for google authication
  const handleGoogleAuth = async () => {
    try {
      const response = await initializeGoogleAuth();
      if (response.success) {
        setUserData({
          name: response.name,
          email: response.email,
          googleId: response.id,
        });
        onNext();
      }
    } catch (error) {
      console.error("Google auth failed:", error);
    }
  };

  const sendVerificationCode = async (email) => {
    console.log("Sending verification code to:", email);
    return true;
  };

  const verifyCode = async (email, code) => {
    console.log("Verifying code:", code, "for email:", email);
    return true;
  };

  const initializeGoogleAuth = async () => {
    return {
      success: true,
      name: "Test User",
      email: "test@example.com",
      id: "12345",
    };
  };

  return (
    <motion.div
      className={Styles.registration}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.h2
        className={Styles.registrationTitle}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Create Your Account
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className={Styles.registrationInput}
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <motion.input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className={Styles.registrationInput}
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className={Styles.registrationInput}
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />

        {showVerification && (
          <motion.div
            className={Styles["verification-section"]}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.input
              type="text"
              placeholder="Verification Code"
              value={formData.verificationCode}
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
              required
              className={Styles.registrationInput}
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <p className={Styles["verification-note"]}>
              Enter the verification code sent to your email
            </p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className={`${Styles["primary-button"]} ${Styles.registrationButton}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {showVerification ? "Verify & Continue" : "Send Verification Code"}
        </motion.button>
      </motion.form>

      <motion.div
        className={Styles.divider}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        or
      </motion.div>

      <motion.button
        className={`${Styles["google-auth"]} ${Styles.registrationButton}`}
        onClick={handleGoogleAuth}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="./Images/GoogleLogo.png"
          alt="Google"
          className={Styles["google-icon"]}
        />{" "}
        Continue with Google
      </motion.button>
    </motion.div>
  );
};

export default Registration;
