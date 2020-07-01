import { ButtonAction, Color, Game, GameManager } from "./types-def";
import { playColorSound } from "./reusable-funcs";

/**
 * Starts a new game
 * @param state
 */
export const startNewGame = (state: GameManager): GameManager => {
  // If a game starts when there is an ongoing game, a new game must be put
  // into the stack.
  if (state.currentGame.drawnOrder.length > 0) {
    state.currentGame = new Game();
  }
  state.currentGame.drawnOrder = [Math.floor(Math.random() * 4)];
  return state;
};

/**
 * Makes the button with the selected color to brighten
 * @param color
 */
export const brighten = (color: Color) => {
  return (state: GameManager): GameManager => {
    // will tell the corresponding button to brighten.
    state.gameIO.brightButtons[color] = true;
    return state;
  };
};

/**
 * Makes the button with the selected color to dim
 * @param color
 */
export const dim = (color: Color) => {
  return (state: GameManager): GameManager => {
    // will tell the corresponding button to brighten.
    state.gameIO.brightButtons[color] = false;
    return state;
  };
};

/**
 * Starts waiting for the user to click on the buttons
 * @param state
 */
export const wait4input = (state: GameManager): GameManager => {
  // tell the buttons what to do if the user clicks on it
  state.gameIO.buttonActions = Array(4).fill(ButtonAction.wrong);
  state.gameIO.buttonActions[
    state.currentGame.drawnOrder[state.gameIO.rightOrderCounter]
  ] = ButtonAction.right;
  return state;
};

/**
 * The user clicked on the right button.
 *
 * if he still haven't aced the full order yet, the reducer should tell the
 * buttons the new action that will be triggered should the user clicks on
 * it.
 *
 * if he got the full order right a new random button will be appended
 * to the new order list, the current score will be updated and nothing
 * will happen should the the user click in any button before the
 * signaling is over.
 *
 * @param color
 */
export const rightHit = (color: Color) => {
  return (state: GameManager): GameManager => {
    playColorSound(color);
    state.gameIO.rightOrderCounter += 1;
    if (state.gameIO.rightOrderCounter < state.currentGame.drawnOrder.length) {
      state.gameIO.buttonActions = Array(4).fill(ButtonAction.wrong);
      state.gameIO.buttonActions[
        state.currentGame.drawnOrder[state.gameIO.rightOrderCounter]
      ] = ButtonAction.right;
    } else {
      state.gameIO.rightOrderCounter = 0;
      state.gameIO.buttonActions = Array(4).fill(ButtonAction.nothing);
      state.currentGame.drawnOrder = [
        ...state.currentGame.drawnOrder,
        Math.floor(Math.random() * 4),
      ];
      state.currentGame.score += 1;
    }
    return state;
  };
};

/**
 * The user missed the right button to click.
 *
 * A new, non started game, is set as the current.
 *
 * @param state
 */
export const wrongHit = (state: GameManager): GameManager => {
  const audio = new Audio(`./sounds/wrong.mp3`);
  audio.play();
  state.currentGame = new Game();
  return state;
};
