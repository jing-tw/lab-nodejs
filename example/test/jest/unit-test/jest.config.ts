// module.exports = {
//     "roots": [
//       "<rootDir>/src"
//     ],
//     "testMatch": [
//       "**/__tests__/**/*.+(ts|tsx|js)",
//       "**/?(*.)+(spec|test).+(ts|tsx|js)"
//     ],
//     "transform": {
//       "^.+\\.(ts|tsx)$": "ts-jest"
//     },
//   }

// // jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
};
export default config;