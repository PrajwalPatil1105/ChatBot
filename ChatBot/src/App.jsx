import React, { useState } from "react";
import { motion } from "framer-motion";
import Styles from "./App.module.css";
import Registration from "./Components/Registration";
import OrganizationSetup from "./Components/OrganizationSetup";
import Integration from "./Components/Integration";
import Success from "./Components/Success";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});

  const handleStart = () => {
    setShowIntro(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <motion.div
      className={Styles.app}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showIntro ? (
        <motion.div
          className={Styles.intro}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={Styles["intro-container"]}>
            <div className={Styles["image-content"]}>
              <img
                src="./Images/CompanyLogo.png"
                className={Styles["company-logo"]}
                alt="Company Logo"
              />
              <h1>BeyondChats</h1>
            </div>
            <div className={Styles["text-content"]}>
              <h1 className={Styles["main-heading"]}>
                Make AI your <span>brand manager</span>
              </h1>
              <p className={Styles["description"]}>
                Don’t let your brand lose customers. Qualify your leads to 3X
                your sales with our intelligent AI chatbot. It’s like hiring a
                sales manager who knows your business in and out and works 24/7.
              </p>
              <ul className={Styles["features-list"]}>
                <li>✅ Advanced Reporting</li>
                <li>✅ Intelligent Analytics</li>
                <li>✅ Business Actions</li>
                <li>✅ Language Support: 70+</li>
              </ul>
              <motion.button
                className={Styles["start-button"]}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
              >
                Get Started →
              </motion.button>
              <div className={Styles["rating"]}>
                ⭐⭐⭐⭐⭐ <span>4.7 (Trusted)</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={Styles["setup-container"]}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={Styles["steps-indicator"]}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`${Styles.step} ${
                currentStep >= 1 ? Styles.active : ""
              }`}
            >
              Registrationsss
            </div>
            <div
              className={`${Styles.step} ${
                currentStep >= 2 ? Styles.active : ""
              }`}
            >
              Organization
            </div>
            <div
              className={`${Styles.step} ${
                currentStep >= 3 ? Styles.active : ""
              }`}
            >
              Integration
            </div>
            <div
              className={`${Styles.step} ${
                currentStep >= 4 ? Styles.active : ""
              }`}
            >
              Success
            </div>
          </motion.div>
          {currentStep === 1 && (
            <Registration onNext={nextStep} setUserData={setUserData} />
          )}
          {currentStep === 2 && (
            <OrganizationSetup onNext={nextStep} setUserData={setUserData} />
          )}
          {currentStep === 3 && (
            <Integration onNext={nextStep} userData={userData} />
          )}
          {currentStep === 4 && <Success userData={userData} />}
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;
