#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { getProjectInfo, getInstancesDir } from '../utils';
import { Command } from 'commander';

const program = new Command();

program
  .name('ccb-multi-clean')
  .description('Clean up CCB multi-instance directories')
  .option('-f, --force', 'Force clean without confirmation')
  .action(async (options) => {
    try {
      const projectInfo = getProjectInfo();
      const instancesDir = getInstancesDir(projectInfo.root);

      console.log('');
      console.log(chalk.cyan('    ██████╗ ██████╗██████╗       ███╗   ███╗██╗   ██╗██╗  ████████╗██╗'));
      console.log(chalk.cyan('   ██╔════╝██╔════╝██╔══██╗      ████╗ ████║██║   ██║██║  ╚══██╔══╝██║'));
      console.log(chalk.cyan('   ██║     ██║     ██████╔╝█████╗██╔████╔██║██║   ██║██║     ██║   ██║'));
      console.log(chalk.cyan('   ██║     ██║     ██╔══██╗╚════╝██║╚██╔╝██║██║   ██║██║     ██║   ██║'));
      console.log(chalk.cyan('   ╚██████╗╚██████╗██████╔╝      ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║'));
      console.log(chalk.cyan('    ╚═════╝ ╚═════╝╚═════╝       ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝'));
      console.log('');
      console.log('  Multi-Instance Cleanup');
      console.log('');

      if (!fs.existsSync(instancesDir)) {
        console.log(chalk.dim('  No instances directory found'));
        return;
      }

      const instances = fs.readdirSync(instancesDir)
        .filter(name => name.startsWith('inst-') || name.startsWith('instance-'));

      if (instances.length === 0) {
        console.log(chalk.dim('  No instances to clean'));
        return;
      }

      console.log(chalk.dim(`  Found ${instances.length} instance(s) to remove:`));
      console.log('');
      instances.forEach(name => {
        console.log(chalk.dim(`    ${name}`));
      });
      console.log('');

      if (!options.force) {
        console.log(chalk.yellow('  Warning: This will delete all instance directories'));
        console.log(chalk.dim('  (shared history will be preserved)'));
        console.log('');
        console.log(chalk.dim('  Run with --force to confirm'));
        console.log('');
        return;
      }

      // Clean up instances
      for (const instance of instances) {
        const instancePath = path.join(instancesDir, instance);
        fs.rmSync(instancePath, { recursive: true, force: true });
        console.log(chalk.green(`  ✓ Removed ${instance}`));
      }

      console.log('');
      console.log(chalk.green('  Cleanup complete'));
      console.log('');

    } catch (error) {
      console.error(chalk.red('  ✗ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
