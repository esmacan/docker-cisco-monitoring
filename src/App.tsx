import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Activity, Cpu, Network, ThermometerSun } from 'lucide-react';
import { MetricsChart } from './components/MetricsChart';
import { ConfigForm } from './components/ConfigForm';
import { MetricData, Config } from './types';

const socket = io('http://localhost:3001');

function App() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [config, setConfig] = useState<Config>({
    host: '192.168.1.1',
    username: 'admin',
    authKey: 'authpassword',
    privKey: 'privpassword',
    authProtocol: 'SHA',
    privProtocol: 'AES'
  });
  const [isConfiguring, setIsConfiguring] = useState(true);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('metrics', (data: MetricData) => {
      setMetrics(prev => [...prev.slice(-30), data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('metrics');
    };
  }, []);

  const handleStartMonitoring = () => {
    socket.emit('startMonitoring', config);
    setIsConfiguring(false);
  };

  if (isConfiguring) {
    return (
      <ConfigForm 
        config={config}
        onConfigChange={setConfig}
        onStartMonitoring={handleStartMonitoring}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="w-6 h-6 text-indigo-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Cisco Switch Monitor</h1>
            </div>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricsChart
              title="CPU Usage"
              data={metrics}
              dataKey="cpuUsage"
              color="#4f46e5"
              unit="%"
              Icon={Cpu}
            />
            <MetricsChart
              title="Memory Usage"
              data={metrics}
              dataKey="memoryUsage"
              color="#2563eb"
              unit="%"
              Icon={Activity}
            />
            <MetricsChart
              title="Temperature"
              data={metrics}
              dataKey="temperature"
              color="#dc2626"
              unit="°C"
              Icon={ThermometerSun}
            />
            <MetricsChart
              title="Interface Utilization"
              data={metrics}
              dataKey="interfaceUtilization"
              color="#059669"
              unit="%"
              Icon={Network}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;