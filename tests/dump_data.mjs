// Schrijft CASES als JSON naar stdout (voor tests/e2e.py).
import { CASES } from '../js/data.js';
process.stdout.write(JSON.stringify(CASES));
