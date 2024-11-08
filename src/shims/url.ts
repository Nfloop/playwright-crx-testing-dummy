

// @ts-nocheck
import _url from '_url';

export function pathToFileURL(s: string) {
  return s;
}

export * from '_url';

const url = { ..._url, pathToFileURL };

export default url;
