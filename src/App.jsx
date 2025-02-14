import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useSpring, animated, config } from "@react-spring/web";
import ValentineQuestion from "./ValentineQuestion";
import LoveFlow from "./LoveFlow";
import Gif from "./Gif";

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
  const [loveIndex, setLoveIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showLoveFlow, setShowLoveFlow] = useState(false);

  const message = "Okay, since you said yes to be my valentine, let me tell you 10 things I love about you...";

  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (showMessage && typingIndex < message.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + message[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timeoutId);
    } else if (typingIndex === message.length) {
      setShowCTA(true);
    }
  }, [showMessage, typingIndex]);

  const handleYesClick = () => {
    setResponse("true");
    setShowMessage(true);
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

  const transitionMessage = useSpring({
    opacity: showMessage ? 1 : 0,
    transform: showMessage ? "scale(1)" : "scale(1.5)",
    config: config.slow,
  });

  const ctaButtonAnimation = useSpring({
    opacity: showCTA ? 1 : 0,
    transform: showCTA ? "translateY(0)" : "translateY(20px)",
    config: { tension: 220, friction: 120 },
  });

  const handleCTA = () => {
    setShowMessage(false);
    setShowCTA(false);
    setShowLoveFlow(true);
    setLoveIndex(0);
  };

  return (
    <Container maxWidth={false} sx={rootSx}>
      <Box sx={containerSx}>
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

        {response === "true" && showMessage && (
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

        {response === "true" && showCTA && !showLoveFlow && (
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

        {response === "true" && showLoveFlow && (
          <LoveFlow index={loveIndex} onNext={handleNextLove} />
        )}
      </Box>
    </Container>
  );
}

export default App;
