/**
 * Module for type definition.
 */

/**
 * Allowed colors
 */
export enum Color {
  green = 0,
  red = 1,
  yellow = 2,
  blue = 3,
}

/**
 * Allowed actions on a GameButton click
 */
export enum ButtonAction {
  right = 0,
  wrong = 1,
  nothing = 3,
}

export class Game {
  score = 0;

  drawnOrder: Color[] = [];
}

/**
 * Class responsible for having the states and methods required to
 *
 */
export class GameIO {
  buttonActions: ButtonAction[] = Array(4).fill(ButtonAction.nothing);
  brightButtons: boolean[] = Array(4).fill(false);
  rightOrderCounter: number = 0;
}

export class GameManager {
  gamesPlayed: Game[] = [new Game()];
  gameIO = new GameIO();

  get currentGame() {
    return this.gamesPlayed[this.gamesPlayed.length - 1];
  }

  set currentGame(Game: Game) {
    this.gameIO = new GameIO();
    this.gamesPlayed = [...this.gamesPlayed, Game];
  }
}
