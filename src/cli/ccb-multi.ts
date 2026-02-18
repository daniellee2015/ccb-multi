#!/usr/bin/env node

import * as path from 'path';
import { Command } from 'commander';
import { startInstance } from '../instance';
import { getProjectInfo } from '../utils';
import chalk from 'chalk';

// Read version from package.json at runtime
const pkg = require(path.join(__dirname, '..', '..', 'package.json'));

const program = new Command();

program
  .name('ccb-multi')
  .description('Multi-instance manager for CCB (Claude Code Bridge)')
  .version(pkg.version)
  .argument('<instance-id>', 'Instance ID (1, 2, 3, ...)')
  .argument('[providers...]', 'AI providers (e.g., codex gemini claude)')
  .action(async (instanceId: string, providers: string[]) => {
    try {
      const projectInfo = getProjectInfo();

      console.log('');
      console.log(chalk.cyan('    ██████╗ ██████╗██████╗       ███╗   ███╗██╗   ██╗██╗  ████████╗██╗'));
      console.log(chalk.cyan('   ██╔════╝██╔════╝██╔══██╗      ████╗ ████║██║   ██║██║  ╚══██╔══╝██║'));
      console.log(chalk.cyan('   ██║     ██║     ██████╔╝█████╗██╔████╔██║██║   ██║██║     ██║   ██║'));
      console.log(chalk.cyan('   ██║     ██║     ██╔══██╗╚════╝██║╚██╔╝██║██║   ██║██║     ██║   ██║'));
      console.log(chalk.cyan('   ╚██████╗╚██████╗██████╔╝      ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║'));
      console.log(chalk.cyan('    ╚═════╝ ╚═════╝╚═════╝       ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝'));
      console.log('');
      console.log('  Multi-Instance Manager for Claude Code Bridge');
      console.log('');
      console.log(chalk.dim(`    Project     ${projectInfo.name}`));
      console.log(chalk.dim(`    Instance    ${instanceId}`));

      if (providers.length > 0) {
        console.log(chalk.dim(`    Providers   ${providers.join(', ')}`));
      }

      console.log('');

      await startInstance(instanceId, providers, projectInfo);

    } catch (error) {
      console.error(chalk.red('  ✗ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
