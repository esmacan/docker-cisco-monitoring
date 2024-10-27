import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { LucideIcon } from 'lucide-react';

interface MetricsChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color: string;
  unit: string;
  Icon: LucideIcon;
}

export function MetricsChart({ title, data, dataKey, color, unit, Icon }: MetricsChartProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <Icon className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(timestamp, 'HH:mm:ss')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(timestamp) => format(timestamp, 'HH:mm:ss')}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              name={`${title} ${unit}`} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}