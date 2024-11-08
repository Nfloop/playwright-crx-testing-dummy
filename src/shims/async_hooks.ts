

export class AsyncLocalStorage<T extends { type: string; previous?: T }> {

  lastZoneId = 0;
  private _zones = new Map<number, T>();
  private _current: T | undefined;

  constructor() {}

  getStore() {
    return this._current;
  }

  run<R>(store: T, func: () => R): R  {
    let id: number | undefined;
    if (store) {
      id = this.lastZoneId++;
      this._zones.set(id, store);
      this._current = store;
      Object.defineProperty(func, 'name', { value: `__PWZONE__[${id}]-${store.type}` });
    }

    return runWithFinally(() => func(), () => {
      if (id) this._zones.delete(id);
      if (store) this._current = store.previous;
    });
  }
}

function runWithFinally<R>(func: () => R, finallyFunc: Function): R {
  try {
    const result = func();
    if (result instanceof Promise) {
      return result.then(r => {
        finallyFunc();
        return r;
      }).catch(e => {
        finallyFunc();
        throw e;
      }) as any;
    }
    finallyFunc();
    return result;
  } catch (e) {
    finallyFunc();
    throw e;
  }
}
