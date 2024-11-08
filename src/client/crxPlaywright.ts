

import type * as channels from '../protocol/channels';
import { ChannelOwner } from "playwright-core/lib/client/channelOwner";
import { Playwright } from "playwright-core/lib/client/playwright";
import { Crx } from './crx';

export class CrxPlaywright extends Playwright {

  readonly _crx: Crx;

  constructor(parent: ChannelOwner, type: string, guid: string, initializer: channels.CrxPlaywrightInitializer) {
    super(parent, type, guid, initializer);
    this._crx = Crx.from(initializer._crx);
  }
}
