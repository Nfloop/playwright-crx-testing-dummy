

function noop() {}

export const spawn = noop;
export const spawnSync = noop;
export const execSync = noop;

export default {
  spawn,
  spawnSync,
  execSync,
};
