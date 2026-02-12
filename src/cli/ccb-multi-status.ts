#!/usr/bin/env node

import chalk from 'chalk';
import { getProjectInfo, listInstances, isInstanceRunning } from '../lib/utils';

async function main() {
  try {
    const projectInfo = getProjectInfo();
    const instances = listInstances(projectInfo.root);

    console.log('');
    console.log(chalk.cyan('    ██████╗ ██████╗██████╗       ███╗   ███╗██╗   ██╗██╗  ████████╗██╗'));
    console.log(chalk.cyan('   ██╔════╝██╔════╝██╔══██╗      ████╗ ████║██║   ██║██║  ╚══██╔══╝██║'));
    console.log(chalk.cyan('   ██║     ██║     ██████╔╝█████╗██╔████╔██║██║   ██║██║     ██║   ██║'));
    console.log(chalk.cyan('   ██║     ██║     ██╔══██╗╚════╝██║╚██╔╝██║██║   ██║██║     ██║   ██║'));
    console.log(chalk.cyan('   ╚██████╗╚██████╗██████╔╝      ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║'));
    console.log(chalk.cyan('    ╚═════╝ ╚═════╝╚═════╝       ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝'));
    console.log('');
    console.log('  Multi-Instance Status');
    console.log('');

    if (instances.length === 0) {
      console.log(chalk.dim('    No instances found'));
      return;
    }

    let runningCount = 0;
    let stoppedCount = 0;

    console.log(chalk.dim('  INSTANCES'));
    console.log('');

    for (const instanceId of instances) {
      const running = isInstanceRunning(projectInfo.root, instanceId);

      if (running) {
        console.log(`  ${chalk.green('●')} Instance ${instanceId}  ${chalk.dim('running')}`);
        runningCount++;
      } else {
        console.log(`  ${chalk.dim('○')} Instance ${instanceId}  ${chalk.dim('stopped')}`);
        stoppedCount++;
      }
    }

    console.log('');
    console.log(chalk.dim('  SUMMARY'));
    console.log('');
    console.log(`    Total      ${instances.length}`);
    console.log(`    Running    ${chalk.green(runningCount.toString())}`);
    console.log(`    Stopped    ${chalk.dim(stoppedCount.toString())}`);
    console.log('');

  } catch (error) {
    console.error(chalk.red('  ✗ Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
