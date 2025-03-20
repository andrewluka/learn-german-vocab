import React from "react";
import Confetti from "react-dom-confetti";

const Celebration = ({active}) => {
  const confettiConfig = {
    angle: "90",
    spread: 90,
    startVelocity: 45,
    elementCount: 50,
    dragFriction: 0.1,
    duration: 2000,
    stagger: 0,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return (
    <Confetti active={active} config={confettiConfig} />
  );
}

export default Celebration;
