

import './process';
import './setImmediate';
import './buffer';
import { fs } from 'memfs';

fs.mkdirSync('/tmp');
fs.mkdirSync('/crx');

self.global = self;
self.__dirname = '/crx';
