export interface ProjectInfo {
  root: string;
  name: string;
}

export interface InstanceInfo {
  id: string;
  dir: string;
  running: boolean;
}

export interface HistoryFile {
  filename: string;
  provider: string;
  size: string;
  time: string;
  path: string;
}
