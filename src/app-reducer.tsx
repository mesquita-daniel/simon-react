import { ButtonAction, Color, Game, GameManager } from "./types-def";
import { createStore } from "redux";
import {
  startNewGame,
  brighten,
  dim,
  wait4input,
  rightHit,
  wrongHit,
} from "./dispatchable-actions";

const gerenciador = new GameManager();

const SimonReducer = (
  state: GameManager = gerenciador,
  action
): GameManager => {
  switch (action.type) {
    case "startNewGame":
      return startNewGame(state);
    case "brighten":
      return brighten(action.color)(state);
    case "dim":
      return dim(action.color)(state);
    case "wait4input":
      return wait4input(state);
    case "rightHit":
      return rightHit(action.color)(state);
    case "wrongHit":
      return wrongHit(state);
    default:
      return state;
  }
};

export const store = createStore(
  SimonReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);
