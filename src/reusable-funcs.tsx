/**
 * Module to define helper functions that maight be used in more than one module.
 */

import { Color } from "./types-def";

/**
 * Play the sound corresponding to a color
 *
 * @param color
 */
export const playColorSound = (color: Color) => {
  const audio = new Audio(`./sounds/${Color[color]}.mp3`);
  audio.play();
};
