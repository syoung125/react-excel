import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};

module.exports = config;
