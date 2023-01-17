#!/usr/bin/env node

import { execFile } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

execFile(
  join(dirname(fileURLToPath(import.meta.url)), 'nova'),
  [],
  (error, stdout, stderr) => {
    if (error) {
      console.log(' * Nova exited please, check your config');
      return;
    }
    console.log(stdout);
    console.error(stderr);
  }
);
