import * as path from 'path';
import * as fs from 'fs';
import { createHash } from 'crypto';

export interface ProjectInfo {
  root: string;
  name: string;
}

function _shortProjectHash(projectRoot: string): string {
  return createHash('sha256').update(projectRoot).digest('hex').slice(0, 8);
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
  const hash = _shortProjectHash(projectRoot);
  const newDir = path.join(getInstancesDir(projectRoot), `inst-${hash}-${instanceId}`);

  // Backward compat: if new dir doesn't exist but old format does, use old
  if (!fs.existsSync(newDir)) {
    const oldDir = path.join(getInstancesDir(projectRoot), `instance-${instanceId}`);
    if (fs.existsSync(oldDir)) {
      return oldDir;
    }
  }

  return newDir;
}

export function listInstances(projectRoot: string): string[] {
  const instancesDir = getInstancesDir(projectRoot);

  if (!fs.existsSync(instancesDir)) {
    return [];
  }

  const hash = _shortProjectHash(projectRoot);
  const newPrefix = `inst-${hash}-`;

  return fs.readdirSync(instancesDir)
    .filter(name => name.startsWith(newPrefix) || name.startsWith('instance-'))
    .map(name => {
      if (name.startsWith(newPrefix)) return name.slice(newPrefix.length);
      return name.replace('instance-', '');
    })
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
