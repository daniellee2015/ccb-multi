import * as path from 'path';
import * as fs from 'fs';

export interface ProjectInfo {
  root: string;
  name: string;
}

export function getProjectInfo(): ProjectInfo {
  const root = process.cwd();
  const name = path.basename(root);

  return { root, name };
}

export function getInstancesDir(projectRoot: string): string {
  return path.join(projectRoot, '.ccb-instances');
}

export function getInstanceDir(projectRoot: string, instanceId: string): string {
  return path.join(getInstancesDir(projectRoot), `instance-${instanceId}`);
}

export function listInstances(projectRoot: string): string[] {
  const instancesDir = getInstancesDir(projectRoot);

  if (!fs.existsSync(instancesDir)) {
    return [];
  }

  return fs.readdirSync(instancesDir)
    .filter(name => name.startsWith('instance-'))
    .map(name => name.replace('instance-', ''))
    .sort((a, b) => parseInt(a) - parseInt(b));
}

export function isInstanceRunning(projectRoot: string, instanceId: string): boolean {
  const instanceDir = getInstanceDir(projectRoot, instanceId);
  const ccbDir = path.join(instanceDir, '.ccb');

  if (!fs.existsSync(ccbDir)) {
    return false;
  }

  // Check for session files
  const sessionFiles = fs.readdirSync(ccbDir)
    .filter(name => name.endsWith('-session'));

  return sessionFiles.length > 0;
}
