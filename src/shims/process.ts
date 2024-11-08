

// @ts-ignore
import process from 'process/browser';

// https://github.com/cabinjs/browser-hrtime/blob/cb6b7c336e93726a302e04a5ac4755e7e353edaf/src/index.ts#L22
process.hrtime = (previousTimestamp?: [number, number]): [number, number] => {
  const baseNow = Math.floor((Date.now() - performance.now()) * 1e-3);
  const clocktime = performance.now() * 1e-3;
  let seconds = Math.floor(clocktime) + baseNow;
  let nanoseconds = Math.floor((clocktime % 1) * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
};
process.platform = 'linux';
process.versions.node = '18.16';
process.stdout = { isTTY: 'false' };
process.geteuid = () => "";

process.env['PLAYWRIGHT_BROWSERS_PATH'] = '.';

self.process = process;
