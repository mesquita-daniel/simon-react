import * as React from "react";
import { Col, Button } from "react-bootstrap";
import { GameManager, Color, ButtonAction } from "./types-def";
import { useSelector, useDispatch } from "react-redux";

/**
 * Display level title.
 */
const LevelTitle = () => {
  return <h1 id="level-title"> Press any key to start </h1>;
};

/**
 * Decorator to be used when useSelector hook results in bug due to undefined
 * state.
 *
 * @param func function to be placed before useSelector
 */
const treatUndefState = (func, defaultValue) => {
  return (...args) => {
    if (typeof args[0] == "undefined") {
      return defaultValue;
    } else {
      return func(...args);
    }
  };
};

/**
 * A button in the game.
 *
 * @param props: {color: Color}
 */
const GameButton = (props: { color: Color }) => {
  const dispatch = useDispatch();

  /**
   * Check whether the button must me bright or off
   *
   * @param state store state of parent provider Component
   */
  const checkIfLit = (state: GameManager) => {
    return state.gameIO.brightButtons[props.color];
  };

  const isBright: boolean = useSelector(treatUndefState(checkIfLit, false));

  /**
   * Check what to do should the button be clicker
   *
   * @param state  store state of parent provider Component
   */
  const checkButtonAction = (state: GameManager) => {
    return ButtonAction[state.gameIO.buttonActions[props.color]];
  };

  const buttonAction = useSelector(
    treatUndefState(checkButtonAction, "nothing")
  );

  /**
   * Will dispatch action to reducer.
   *
   * If it is the right button will also play the corresponding sound and briefly
   * light the button.
   *
   * If it is the wrong button will just play the wrong sound
   */
  const onClick = () => {
    if (buttonAction == "right") {
      dispatch({ type: "rightHit", color: props.color });
      dispatch({ type: "brighten", color: props.color });
      const prom = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
      prom.then(() => dispatch({ type: "dim", color: props.color }));
    } else if (buttonAction == "wrong") {
      dispatch({ type: "wrongHit" });
    }
  };

  return (
    <Col>
      <Button
        id={Color[props.color]}
        className={`btn ${Color[props.color]} ${isBright ? "bright" : "dim"}`}
        onClick={onClick}
      />
    </Col>
  );
};

/**
 * Display the score of current game.
 */
const CurrentScore = () => {
  const score = useSelector((state: GameManager) => state.currentGame.score);

  return <h1 id="result">{`Score on current game: ${score}`}</h1>;
};

/**
 * Display the last game score.
 */
export const LastScore = () => {
  const lastGameScore = useSelector((state: GameManager) => {
    try {
      return state.gamesPlayed[state.gamesPlayed.length - 2].score;
    } catch (error) {
      return -1;
    }
  });

  if (lastGameScore == -1) {
    return <h1></h1>;
  } else {
    return <h1 id="result">{`Score on last game: ${lastGameScore}`}</h1>;
  }
};

/**
 * Display the best score among the played games.
 */
export const BestScore = () => {
  const lastGameScore = useSelector((state: GameManager) => {
    if (state.gamesPlayed.length < 2) {
      return -1;
    } else {
      return Math.max(...state.gamesPlayed.map((game) => game.score));
    }
  });

  if (lastGameScore == -1) {
    return <h1></h1>;
  } else {
    return <h1 id="result">{`Best score so far: ${lastGameScore}`}</h1>;
  }
};

export { LevelTitle, GameButton, CurrentScore };
