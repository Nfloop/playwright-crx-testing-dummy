

window.addEventListener('load', () => {
  // if not running as a chrome extension, skip this...
  if (typeof chrome === 'undefined' || !chrome.runtime)
    return;

  const wnd: any = window;
  const port = chrome.runtime.connect();

  const dispatch = async (data: any) => {
    port.postMessage({ type: 'recorderEvent', ...data });
  };

  wnd.dispatch = dispatch;

  const onMessage = (msg: any) => {
    if (!('type' in msg) || msg.type !== 'recorder') return;

    switch (msg.method) {
      case 'setPaused': wnd.playwrightSetPaused(msg.paused); break;
      case 'setMode': wnd.playwrightSetMode(msg.mode); break;
      case 'setSources': wnd.playwrightSetSources(msg.sources); break;
      case 'updateCallLogs': wnd.playwrightUpdateLogs(msg.callLogs); break;
      case 'setSelector': wnd.playwrightSetSelector(msg.selector, msg.userGesture); break;
      case 'setFile': wnd.playwrightSetFile(msg.file); break;
    }
  };

  port.onMessage.addListener(onMessage);
});
