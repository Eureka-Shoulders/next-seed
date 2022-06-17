/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const nextEnv = require('@next/env');
const { pipe, map, split, difference, keys, filter } = require('ramda');

const getExampleEnvNames = pipe(
  split('\n'),
  map((env) => env.split('=')[0]),
  filter(Boolean)
);

const exampleFilePath = path.join(__dirname, '.env.example');
const isDevelopment = process.env.NODE_ENV === 'development';
const exampleFileExists = fs.existsSync(exampleFilePath);

if (!exampleFileExists) {
  throw new Error(
    `envcheck - A .env.example is missing. If you don't wanna check for environments, please remove the checkEnvironmentVars.js snippet from next.config.js`
  );
}

const exampleVariablesFile = fs.readFileSync(exampleFilePath, 'utf8');
const loadedEnvsByNext = nextEnv.loadEnvConfig(__dirname, isDevelopment);
const exampleVariables = getExampleEnvNames(exampleVariablesFile);
const declaredVariables = keys(loadedEnvsByNext.combinedEnv);
const missingVariables = difference(exampleVariables, declaredVariables);

if (loadedEnvsByNext.combinedEnv.NODE_ENV !== 'test') {
  if (missingVariables.length === 0) {
    console.log('envcheck - All needed variables in .env.example are declared in an .env file :)');
  } else {
    console.error(
      `envcheck - The following variables are declared in .env.example, but missing in a .env file: ${missingVariables.join(
        ', '
      )}`
    );

    process.exit(1);
  }
}
