import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

function getDirection(
  player: Position,
  target: Position,
): Direction | undefined {
  const x = target.x - player.x;
  const y = target.y - player.y;

  if (x === 0 && y === -1) {
    return "up";
  }
  if (x === 0 && y === 1) {
    return "down";
  }
  if (x === -1 && y === 0) {
    return "left";
  }
  if (x === 1 && y === 0) {
    return "right";
  }

  return undefined;
}

export const clickToMove: Controller = {
  label: "Click To Move",
  attach(session, board) {
    const stop = board.onTileClick((at) => {
      const player = session.getState().puzzle.player;
      const direction = getDirection(player, at);
      if (direction) {
        session.dispatch({ kind: "move", direction });
      }
    });
    return stop;
  },
};
