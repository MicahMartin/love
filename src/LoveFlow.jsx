import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

const loveNotes = [
  { image: "/babygirl_01.png", text: "I love the way you brighten up my days, u have an angels energy and you know it. U know how to make me laugh and put me at peace" },
  { image: "/babygirl_03.jpg", text: "i love that you can go anywhere on earth and just be a loveable ass person. I love the fact that I can bring my shorty anywhere and not have to say shit cuz shes gonna get the vibe right just by being herself." },
  { image: "/babygirl_04.jpeg", text: "I love the way you dress and how you carry yourself, your sense of style dead ass inspired me to switch mine up, and I just want to spend all my money on buyin u shit cu u make it look so good" },
  { image: "/babygirl_05.jpg", text: "I love your creative spirit and how complex your soul is. I feel like every day is a new experience with you, because theres really no end to your depth. youre the opposite of simple in every way but i still like to call u simple feel me" },
  { image: "/nuttazz.jpeg", text: "I love the way you do little things for me like play with my hair, sit on my face when im sad, take out my ingrowns and cook for me, wash my clothes, clean my room, you even got me a pet cuz u knew how I was feeling at the time...damn" },
  { image: "/babygirl_07.jpeg", text: "u know i love that forhead baby its almost as big as my love for u. I love that u watch hentai every midnight at 3pm and everybody calls u Zavi the Tickler™. picked this picture cuz i love ya lips." },
  { image: "/babygirl_08.jpeg", text: "ur butthole tastes like straight water baby you turn me on more than anything i swear I cant go without u cuz no matter what u will always be my fantasy. I beat my dick thinking about you even the times when we werent talkin. this dick belongs to you and im so thirsty for u i dont give a fuck. I wanna fuck you for the rest of my life tie you up and do bad things to you" },
  { image: "/babygirl_09.jpeg", text: "that last one was a lil OD i gotta calm down but real talk im so fuckin passionate for you im damn near bouta cry tears of joy writing this stupid shit. you mean the world to me Zaviana, you push me to be a better man. Thank you so fucking much.." },
  { image: "https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg", text: "I pray for us, I want us to last a lifetime and create a legacy together." },
  { image: "https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg", text: "10 things I love about you... really makes no sense cuz i could write something new I love about you every day." },
  { image: "/babygirl_10.jpeg", text: "but hopefully I have 100 more valentines to make corny stuff like this for u" },
];

function LovePage({ image, text, onNext, index }) {
  // Adjusting transition speed and smoothness by tweaking tension and friction
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true, // Reset the animation every time the component is updated
    config: { tension: 35, friction: 70 }, // Lower tension for slower and smoother transitions
    duration: 3000, // Make the transition last 1 second (1000ms)
  });

  return (
    <Box sx={{ height: "100vh", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <animated.img
        src={image}
        alt={text}
        style={{
          maxHeight: "70vh",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          ...fadeIn, // Apply fade effect to the image
        }}
      />
      <animated.div style={fadeIn}>
        <Typography
          variant="h5"
          sx={{
            marginTop: "20px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "400",
            lineHeight: 1.6,
            fontSize: "1.25rem",
            color: "#333",
          }}
        >
          {text}
        </Typography>
      </animated.div>

      {index < loveNotes.length - 1 && (
        <Button variant="contained" color="primary" onClick={onNext} sx={{ marginTop: "20px" }}>
          Next
        </Button>
      )}
    </Box>
  );
}

function LoveFlow() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < loveNotes.length - 1) {
      setIndex(index + 1);
    }
  };

  return <LovePage image={loveNotes[index].image} text={loveNotes[index].text} onNext={handleNext} index={index} />;
}

export default LoveFlow;
