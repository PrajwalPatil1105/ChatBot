import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Styles from "../Styles/Success.module.css";
import ConfettiExplosion from "react-confetti-explosion";

const Success = ({ userData }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  useEffect(() => {
    setShowCelebration(true);
  }, []);

  // Added celebration animations
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 3000);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const shareOnSocial = (platform) => {
    const text = `Just integrated an AI chatbot on ${userData.organization?.companyName}'s website! 🤖✨`;
    const url = window.location.origin;

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className={Styles.success}>
      {showCelebration && (
        <>
          <Confetti recycle={false} numberOfPieces={800} gravity={0.4} />
        </>
      )}
      {showExplosion && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1010,
            }}
          >
            <ConfettiExplosion
              width={window.innerWidth / 2}
              height={window.innerHeight}
              numberOfPieces={1500}
              recycle={false}
              gravity={0.3}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 1010,
            }}
          >
            <ConfettiExplosion
              width={window.innerWidth / 2}
              height={window.innerHeight}
              numberOfPieces={500}
              recycle={false}
              gravity={0.3}
            />
          </div>
        </>
      )}
      <div className={Styles["confetti-container"]}></div>{" "}
      <div className={Styles["success-content"]}>
        <div className={Styles["success-icon"]}>✨</div>
        <h2 className={Styles["success-title"]}>Congratulations!</h2>
        <p className={Styles["success-message"]}>
          Your chatbot has been successfully integrated
        </p>
        <div className={Styles["success-buttons"]}>
          <button
            className={`${Styles["primary-button"]} ${Styles["success-button"]}`}
            onClick={() => (window.location.href = "/admin")}
          >
            Explore Admin Panel
          </button>
          <button
            className={`${Styles["secondary-button"]} ${Styles["success-button"]}`}
            onClick={() => (window.location.href = "/chat")}
          >
            Start Talking to Your Chatbot
          </button>
        </div>
        <div className={Styles["social-sharing"]}>
          <p className={Styles["share-text"]}>Share your success</p>{" "}
          <div className={Styles["social-buttons"]}>
            <button
              className={`${Styles["share-button"]} ${Styles.twitter}`}
              onClick={() => shareOnSocial("twitter")}
            >
              Share on Twitter
            </button>
            <button
              className={`${Styles["share-button"]} ${Styles.linkedin}`}
              onClick={() => shareOnSocial("linkedin")}
            >
              Share on LinkedIn
            </button>
            <button
              className={`${Styles["share-button"]} ${Styles.facebook}`}
              onClick={() => shareOnSocial("facebook")}
            >
              Share on Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
