
import { Playwright } from 'playwright-core/lib/server/playwright';
import { Crx } from './crx';

export class CrxPlaywright extends Playwright {

  readonly _crx: Crx;

  constructor() {
    super({ sdkLanguage: 'javascript' });
    this._crx = new Crx(this);
  }
}
