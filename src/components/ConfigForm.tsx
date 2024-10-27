import React from 'react';
import { Settings } from 'lucide-react';
import { Config } from '../types';

interface ConfigFormProps {
  config: Config;
  onConfigChange: (config: Config) => void;
  onStartMonitoring: () => void;
}

export function ConfigForm({ config, onConfigChange, onStartMonitoring }: ConfigFormProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Settings className="w-6 h-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Switch Configuration</h1>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Switch IP Address</label>
            <input
              type="text"
              value={config.host}
              onChange={e => onConfigChange({ ...config, host: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={config.username}
              onChange={e => onConfigChange({ ...config, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Auth Key</label>
            <input
              type="password"
              value={config.authKey}
              onChange={e => onConfigChange({ ...config, authKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Priv Key</label>
            <input
              type="password"
              value={config.privKey}
              onChange={e => onConfigChange({ ...config, privKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            onClick={onStartMonitoring}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Monitoring
          </button>
        </div>
      </div>
    </div>
  );
}