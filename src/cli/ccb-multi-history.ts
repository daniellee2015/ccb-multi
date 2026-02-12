#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { getProjectInfo } from '../lib/utils';

async function main() {
  try {
    const projectInfo = getProjectInfo();
    const historyDir = path.join(projectInfo.root, '.ccb', 'history');

    console.log('');
    console.log(chalk.cyan('    ██████╗ ██████╗██████╗       ███╗   ███╗██╗   ██╗██╗  ████████╗██╗'));
    console.log(chalk.cyan('   ██╔════╝██╔════╝██╔══██╗      ████╗ ████║██║   ██║██║  ╚══██╔══╝██║'));
    console.log(chalk.cyan('   ██║     ██║     ██████╔╝█████╗██╔████╔██║██║   ██║██║     ██║   ██║'));
    console.log(chalk.cyan('   ██║     ██║     ██╔══██╗╚════╝██║╚██╔╝██║██║   ██║██║     ██║   ██║'));
    console.log(chalk.cyan('   ╚██████╗╚██████╗██████╔╝      ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║'));
    console.log(chalk.cyan('    ╚═════╝ ╚═════╝╚═════╝       ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝'));
    console.log('');
    console.log('  Session History');
    console.log('');

    if (!fs.existsSync(historyDir)) {
      console.log(chalk.dim('  No history directory found'));
      return;
    }

    console.log(chalk.dim('  RECENT SESSIONS (shared across all instances)'));
    console.log('');

    // List recent history files
    const files = fs.readdirSync(historyDir)
      .filter(name => name.endsWith('.md'))
      .map(name => ({
        name,
        path: path.join(historyDir, name),
        stat: fs.statSync(path.join(historyDir, name))
      }))
      .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
      .slice(0, 10);

    if (files.length === 0) {
      console.log(chalk.dim('  No session history found'));
      return;
    }

    for (const file of files) {
      const provider = file.name.split('-')[0];
      const size = (file.stat.size / 1024).toFixed(1) + 'K';
      const time = file.stat.mtime.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(`    ${chalk.cyan(provider.padEnd(8))}  ${chalk.dim(size.padEnd(8))}  ${chalk.dim(time)}`);
    }

    console.log('');
    console.log(chalk.dim(`    History location: ${historyDir}`));
    console.log('');

  } catch (error) {
    console.error(chalk.red('  ✗ Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
