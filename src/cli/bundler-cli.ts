#! /usr/bin/env node

import { readFileSync } from 'fs';
import minimist from 'minimist';

import { BundlerService } from '../bundler/BundlerService';
import { IBundlerService } from '../bundler/types';

const printHelp = () => {
  console.log('Usage: npx urscript-bundler [--config <config.json>]');
  console.log('Tool used to generate unique script bundles');
  console.log('Options:');
  console.log('--config  Bundle configuration');
};

const main = async () => {
  const args = minimist(process.argv.slice(2));

  const { config: configFilename } = args;

  if (!configFilename) {
    printHelp();
    process.exit(0);
  }

  const contents: string = readFileSync(configFilename).toString();

  try {
    const service: IBundlerService = new BundlerService(JSON.parse(contents));

    // TODO based on dimension filters execute single bundle or entire bundle
    service.bundleAll();
  } catch (err) {
    console.error(
      'invalid bundler configuration found. refer to sample config in dist directory'
    );
  }
};

main();
