import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import chalk from 'chalk';
import { ProjectInfo } from './types';

export async function startInstance(
  instanceId: string,
  providers: string[],
  projectInfo: ProjectInfo
): Promise<void> {
  const instanceDir = path.join(projectInfo.root, '.ccb-instances', `instance-${instanceId}`);
  const ccbDir = path.join(instanceDir, '.ccb');

  // Create instance directory
  fs.mkdirSync(instanceDir, { recursive: true });
  fs.mkdirSync(ccbDir, { recursive: true });

  // Ensure main project .ccb directory exists
  const mainCcbDir = path.join(projectInfo.root, '.ccb');
  const mainHistoryDir = path.join(mainCcbDir, 'history');
  fs.mkdirSync(mainHistoryDir, { recursive: true });

  console.log(chalk.dim('    Creating symlinks...'));

  // Create symlinks for project files (excluding .ccb-instances and .ccb)
  const excludeDirs = ['.ccb-instances', '.ccb', '.claude', '.opencode', 'node_modules', '.git'];
  const items = fs.readdirSync(projectInfo.root);

  for (const item of items) {
    if (excludeDirs.includes(item)) continue;

    const sourcePath = path.join(projectInfo.root, item);
    const targetPath = path.join(instanceDir, item);

    try {
      // Remove existing symlink if exists
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      fs.symlinkSync(sourcePath, targetPath);
    } catch (error) {
      // Ignore symlink errors
    }
  }

  // Create symlinks for shared history and config
  const historySymlink = path.join(ccbDir, 'history');
  const configSymlink = path.join(ccbDir, 'ccb.config');

  if (fs.existsSync(historySymlink)) {
    fs.unlinkSync(historySymlink);
  }
  fs.symlinkSync(mainHistoryDir, historySymlink);

  const mainConfigPath = path.join(mainCcbDir, 'ccb.config');
  if (fs.existsSync(mainConfigPath)) {
    if (fs.existsSync(configSymlink)) {
      fs.unlinkSync(configSymlink);
    }
    fs.symlinkSync(mainConfigPath, configSymlink);
  }

  // Write config if providers specified
  if (providers.length > 0) {
    const configContent = providers.join(',');
    fs.writeFileSync(path.join(ccbDir, 'ccb.config'), configContent);
  }

  // Set environment variables
  process.env.CCB_INSTANCE_ID = instanceId;
  process.env.CCB_PROJECT_ROOT = projectInfo.root;

  console.log(chalk.green('  ✓ Instance ready'));
  console.log('');
  console.log(chalk.dim('    Launching CCB...'));
  console.log('');

  const ccb = spawn('ccb', [], {
    cwd: instanceDir,
    stdio: 'inherit',
    env: process.env
  });

  ccb.on('error', (error) => {
    console.error(chalk.red('  ✗ Failed to launch CCB:'), error.message);
    process.exit(1);
  });

  ccb.on('exit', (code) => {
    if (code !== 0) {
      console.error(chalk.red(`  ✗ CCB exited with code ${code}`));
      process.exit(code || 1);
    }
  });
}
