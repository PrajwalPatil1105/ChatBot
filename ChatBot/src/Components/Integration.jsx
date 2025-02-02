import React, { useState } from "react";
import Styles from "../Styles/Integration.module.css";

const Integration = ({ onNext, userData }) => {
  const [showTestChat, setShowTestChat] = useState(false);
  const [showIntegrationCode, setShowIntegrationCode] = useState(false);
  const [isTestingIntegration, setIsTestingIntegration] = useState(false);
  const [chatFeedback, setShowChatFeedback] = useState(false);

  const testChatbot = () => {
    setShowTestChat(true);
    setShowIntegrationCode(false);
  };

  const showIntegration = () => {
    setShowIntegrationCode(true);
    setShowTestChat(false);
  };

  // Testing of Intergration part
  const testIntegration = async () => {
    setIsTestingIntegration(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onNext();
    } catch (error) {
    } finally {
      setIsTestingIntegration(false);
    }
  };

  const sendInstructions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Instructions sent to developer!");
  };

  const toggleFeedback = () => {
    setShowChatFeedback(!chatFeedback);
  };

  return (
    <div className={Styles.integration}>
      <h2 className={Styles.integrationTitle}>Chatbot Integration</h2>{" "}
      <div className={Styles["integration-buttons"]}>
        <button className={Styles.integrationButton} onClick={testChatbot}>
          Test Chatbot
        </button>
        <button className={Styles.integrationButton} onClick={showIntegration}>
          Integrate on Website
        </button>
        <button
          className={Styles.integrationButton}
          onClick={testIntegration}
          disabled={isTestingIntegration}
        >
          {isTestingIntegration ? "Testing..." : "Test Integration"}
        </button>
      </div>
      {showTestChat && (
        <div className={Styles["test-chat-window"]}>
          <div className={Styles.topbar}>
            <span>Preview Mode</span>
            <button
              className={Styles["feedback-button"]}
              onClick={toggleFeedback}
            >
              Chatbot not working as intended? Share feedback
            </button>
          </div>
          {chatFeedback ? (
            <div className={Styles["feedback-form"]}>
              <textarea
                className={Styles.feedbackTextarea}
                placeholder="Please describe the issue you're experiencing..."
              />
              <button className={Styles.feedbackSubmit}>Submit Feedback</button>
            </div>
          ) : (
            <div className={Styles["chat-interface"]}>
              <div className={Styles["chat-messages"]}>
                <div className={`${Styles.message} ${Styles.bot}`}>
                  Hello! How can I help you today?
                </div>
                <div className={`${Styles.message} ${Styles.user}`}>
                  What services do you offer?
                </div>
                <div className={`${Styles.message} ${Styles.bot}`}>
                  Based on {userData.organization.companyName}'s website, we
                  offer the following services...
                </div>
              </div>
              <div className={Styles["chat-input"]}>
                <input
                  type="text"
                  className={Styles.chatInput}
                  placeholder="Type your message..."
                />
                <button className={Styles.chatSend}>Send</button>{" "}
              </div>
            </div>
          )}
        </div>
      )}
      {showIntegrationCode && (
        <div className={Styles["integration-options"]}>
          {" "}
          <div className={Styles["code-snippet"]}>
            <h3>Add this code to your website</h3>
            <div className={Styles["code-container"]}>
              <pre className={Styles.code}>
                {`<script src="https://chatbot.example.com/widget.js"></script>
<script>
  window.ChatbotConfig = {
    organizationId: "${userData.organization?.id || "YOUR_ORG_ID"}",
    theme: "light"
  };
</script>`}
              </pre>
              <button
                className={Styles["copy-button"]}
                onClick={() =>
                  navigator.clipboard.writeText(
                    document.querySelector("pre").textContent
                  )
                }
              >
                Copy Code
              </button>
            </div>
          </div>
          <div className={Styles["email-option"]}>
            <h3>Or send instructions to your developer</h3>
            <input
              type="email"
              className={Styles.developerEmail}
              required
              placeholder="Developer's email address"
            />
            <button
              className={Styles.sendInstructions}
              onClick={sendInstructions}
            >
              Send Instructions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integration;
