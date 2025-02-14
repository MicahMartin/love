import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useSpring, animated, config } from "@react-spring/web"; // Import react-spring hooks
import ValentineQuestion from "./ValentineQuestion";
import LoveFlow from "./LoveFlow";
import Gif from "./Gif"; // Import the Gif component

const rootSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const containerSx = {
  padding: "40px",
  borderRadius: "10px",
  textAlign: "center",
};

function App() {
  const [response, setResponse] = useState(null);
  const [noCount, setNoCount] = useState(0);
  const [loveIndex, setLoveIndex] = useState(0); // Track love flow index
  const [showMessage, setShowMessage] = useState(false); // Control when the message appears
  const [showCTA, setShowCTA] = useState(false); // Control when the CTA button appears
  const [typedText, setTypedText] = useState(""); // Track the typed text

  const message = "Okay, since you said yes to be my valentine, let me tell you 10 things I love about you...";

  // Counter to manually control typing progress
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (showMessage && typingIndex < message.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + message[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 100); // Control the speed of typing (100ms per character)

      return () => clearTimeout(timeoutId);
    } else if (typingIndex === message.length) {
      setShowCTA(true); // Show CTA after message is fully typed
    }
  }, [showMessage, typingIndex]);

  const handleYesClick = () => {
    setResponse("true");
    setShowMessage(true); // Show the "valentine reveal" message after Yes is clicked
  };

  const handleNoClick = () => {
    setResponse("false");
    setNoCount((prevIndex) => prevIndex + 1);
  };

  const handleNextLove = () => {
    if (loveIndex < loveContent.length - 1) {
      setLoveIndex((prev) => prev + 1);
    }
  };

  // Animation for the transition message
  const transitionMessage = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? "scale(1)" : "scale(1.5)",
    config: config.slow, // Use a slow transition for a smooth reveal
  });

  // Animation for the CTA button
  const ctaButtonAnimation = useSpring({
    opacity: showCTA ? 1 : 0,
    transform: showCTA ? "translateY(0)" : "translateY(20px)",
    config: { tension: 220, friction: 120 },
  });

  const handleCTA = () => {
    // Hide the CTA and show LoveFlow
    setShowCTA(false);
    setShowMessage(false);
  };

  return (
    <Container maxWidth={false} sx={rootSx}>
      <Box sx={containerSx}>
        {response === "true" && showMessage && (
          // Animated transition message
          <animated.div style={transitionMessage}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                color: "#d32f2f",
                textAlign: "center",
                paddingBottom: "20px",
              }}
            >
              {typedText}
            </Typography>
          </animated.div>
        )}

        {response === "true" && showCTA && (
          // Animated CTA button to proceed to LoveFlow
          <animated.div style={ctaButtonAnimation}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              onClick={handleCTA}
            >
              Okay, I'm ready!
            </Button>
          </animated.div>
        )}

        {response === "true" && !showMessage && !showCTA && (
          // Show LoveFlow after the message and CTA
          <LoveFlow index={loveIndex} onNext={handleNextLove} />
        )}

        {/* Show ValentineQuestion if no response yet */}
        {response !== "true" && (
          <>
            <Gif response={response} noCount={noCount} />
            <ValentineQuestion
              onYesClick={handleYesClick}
              onNoClick={handleNoClick}
              noCount={noCount}
            />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
