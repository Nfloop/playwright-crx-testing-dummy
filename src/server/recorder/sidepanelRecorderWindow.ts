

import { RecorderEventData, RecorderMessage, RecorderWindow } from "./crxRecorderApp";

export class SidepanelRecorderWindow implements RecorderWindow {
    private _recorderUrl: string;
    private _portPromise: Promise<chrome.runtime.Port>;
    private _closed = true;
    onMessage?: (({ type, event, params }: RecorderEventData) => void) | undefined;
    hideApp?: (() => any) | undefined;
  
    constructor(recorderUrl?: string) {
      this._recorderUrl = recorderUrl ?? 'index.html';
      this._portPromise = this._waitConnect();
    }
  
    isClosed(): boolean {
      return this._closed;
    }
    
    postMessage(msg: RecorderMessage) {
      this._portPromise.then(port => port.postMessage({ ...msg })).catch(() => {});
    }
  
    async open() {
      await chrome.sidePanel.setOptions({ path: this._recorderUrl });
      await this._portPromise;
      this._closed = false;
    }
  
    async focus() {
    }
  
    async close() {
      if (this._closed)
        return;
      this._closed = true;
      this._portPromise.then(port => port.disconnect());
      this._portPromise = this._waitConnect();
      this.hideApp?.();
    }
  
    private _waitConnect(): Promise<chrome.runtime.Port> {
      return new Promise(resolve => {
        const onConnect = (port: chrome.runtime.Port) => {
          chrome.runtime.onConnect.removeListener(onConnect);
          port.onDisconnect.addListener(this.close.bind(this));
          if (this.onMessage)
            port.onMessage.addListener(this.onMessage.bind(this));
          resolve(port);
        };
        chrome.runtime.onConnect.addListener(onConnect);
      });
    }
  }