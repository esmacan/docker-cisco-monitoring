export interface MetricData {
  timestamp: number;
  cpuUsage: number;
  memoryUsage: number;
  temperature: number;
  interfaceUtilization: number;
}

export interface Config {
  host: string;
  username: string;
  authKey: string;
  privKey: string;
  authProtocol: string;
  privProtocol: string;
}