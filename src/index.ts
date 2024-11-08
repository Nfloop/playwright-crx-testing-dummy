

import './shims/global';

import './protocol/validator';

import { DispatcherConnection, RootDispatcher } from 'playwright-core/lib/server';
import { CrxConnection } from './client/crxConnection';
import type { CrxPlaywright as CrxPlaywrightAPI } from './client/crxPlaywright';
import { CrxPlaywright } from './server/crxPlaywright';
import { CrxPlaywrightDispatcher } from './server/dispatchers/crxPlaywrightDispatcher';
import { PageBinding } from 'playwright-core/lib/server/page';

export { debug as _debug } from 'debug';
export { setUnderTest as _setUnderTest } from 'playwright-core/lib/utils';


PageBinding.kPlaywrightBinding = '__crx__binding__';

const playwright = new CrxPlaywright();

const clientConnection = new CrxConnection();
const dispatcherConnection = new DispatcherConnection(true );


dispatcherConnection.onmessage = message => clientConnection.dispatch(message);
clientConnection.onmessage = message => dispatcherConnection.dispatch(message);

const rootScope = new RootDispatcher(dispatcherConnection);


new CrxPlaywrightDispatcher(rootScope, playwright);
const playwrightAPI = clientConnection.getObjectWithKnownName('Playwright') as CrxPlaywrightAPI;


dispatcherConnection.onmessage = message => setImmediate(() => clientConnection.dispatch(message));
clientConnection.onmessage = message => setImmediate(() => dispatcherConnection.dispatch(message));

clientConnection.toImpl = (x: any) => x ? dispatcherConnection._dispatchers.get(x._guid)!._object : dispatcherConnection._dispatchers.get('');
(playwrightAPI as any)._toImpl = clientConnection.toImpl;

export const { _crx: crx } = playwrightAPI;
export default playwrightAPI;
