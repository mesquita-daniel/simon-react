import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Color, GameManager } from "./types-def";
import { playColorSound } from "./reusable-funcs";

/**
 * Component whose only responsability is to whatch wheter a new game event has
 * been triggered.
 *
 * Returns an empty div.
 */
export const NewGameObserver = () => {
  const dispatch = useDispatch();
  document.addEventListener("keypress", () =>
    dispatch({ type: "startNewGame" })
  );
  return <div></div>;
};

const signalOrder = async (
  drawnOrder: Color[],
  dispatch: React.Dispatch<any>
) => {
  // Before signaling any order it is important to wait a litle while in order
  // to prevent overlapping with user click signaling.
  await new Promise((resolve) => setTimeout(() => resolve(), 750));
  for (let color of drawnOrder) {
    playColorSound(color);
    dispatch({ type: "brighten", color: color });
    const prom = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 700);
    });
    prom.then(() => dispatch({ type: "dim", color: color }));
    await prom;
    await new Promise((resolve) => setTimeout(() => resolve(), 200));
  }
  dispatch({ type: "wait4input" });
};

/**
 * Logical component whose responsability is to signal the order that has been
 * drawn.
 *
 * It will act after a new game event is triggered or after the player ace a
 * drawn order.
 *
 * It will for every element of the drawn order, sequentially, play its
 * corresponding sound, light it and dim it right afterwards.
 *
 * After the signaling it will prompt the game to wait for user input.
 *
 * Returns an empty div.
 */
export const DrawnOrderSignalizer = () => {
  const dispatch = useDispatch();
  const drawnOrder = useSelector(
    (state: GameManager) => state.currentGame.drawnOrder
  );
  if (drawnOrder.length > 0) {
    signalOrder(drawnOrder, dispatch);
  }

  return <div></div>;
};
