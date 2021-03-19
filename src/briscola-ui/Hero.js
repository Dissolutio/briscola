import React from "react";
import { useTransition, animated } from "react-spring";
import DemoGameoverButtons from "./DemoGameoverButtons.js";
import RematchOrLeaveButtons from "./RematchOrLeaveButtons.js";

export default function Hero({ demo, gameData, handID }) {
  const isDemo = demo;
  const { turn } = gameData.ctx;
  const { currentPlayer } = gameData.ctx;
  const hero = handID;
  const { moves } = gameData;

  const cardsToRender = gameData.G["player_" + (handID || "0")].cards;
  const transitions = useTransition(cardsToRender, (item) => item.alt, {
    from: { opacity: 0, transform: "translate3d(100px, 0px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)" },
    leave: { opacity: 0.5, transform: "translate3d(0, -30px, 0)" },
  });

  if (turn < 41) {
    return (
      <>
        <div
          className={currentPlayer === hero ? "hero-hand-green" : "hero-hand"}
          id={
            cardsToRender.length === 2 ? "hero-two-cards" : "hero-other-cards"
          }
        >
          {transitions.map((x, index) => (
            <div
              className="card-wrapper"
              id={"wrapped-card-" + index}
              key={x.item.alt}
            >
              <div className="transform-wrapper">
                <animated.img
                  className="hero-playing-card"
                  src={x.item.imagePath}
                  alt={x.item.alt}
                  key={x.item.alt}
                  style={x.props}
                  onClick={() => {
                    moves.playCard(index);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    if (isDemo) {
      return <DemoGameoverButtons delay={3000} />;
    } else {
      return (
        <RematchOrLeaveButtons delay={3000} gameData={gameData} handID={hero} />
      );
    }
  }
}
