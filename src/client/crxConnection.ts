

import { Connection } from 'playwright-core/lib/client/connection';
import { Crx, CrxApplication } from './crx';
import { CrxPlaywright } from './crxPlaywright';
import { findValidator } from 'playwright-core/lib/protocol/validatorPrimitives';

export class CrxConnection extends Connection {
  constructor() {
    super(undefined, undefined);
    this.useRawBuffers();
  }

  dispatch(message: object): void {
    const { guid: parentGuid, method, params } = message as any;

    if (method === '__create__') {
      const { type, guid } = params;
      let initializer = params.initializer;

      const parent = this._objects.get(parentGuid)!;
      const validator = findValidator(type, '', 'Initializer');
      initializer = validator(initializer, '', { tChannelImpl: (this as any)._tChannelImplFromWire.bind(this), binary: 'buffer' });

      switch (type) {
        case 'Playwright':
          new CrxPlaywright(parent, type, guid, initializer);
          return;
        case 'Crx':
          new Crx(parent, type, guid, initializer);
          return;
        case 'CrxApplication':
          new CrxApplication(parent, type, guid, initializer);
          return;
      }
    }

    return super.dispatch(message);
  }
}
