#!/usr/bin/env node
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const nova = spawn(join(dirname(fileURLToPath(import.meta.url)), 'nova'));
nova.stderr.pipe(process.stderr);
nova.stdout.pipe(process.stdout);
