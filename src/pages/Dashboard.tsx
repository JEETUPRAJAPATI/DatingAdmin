import React from 'react';
import { BarChart3, Users, Crown, UserCheck, UserX, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import Chart from 'react-apexcharts';

const summaryCards = [
  { title: 'Total Users', value: '24,850', icon: Users, change: '+12%' },
  { title: 'Premium Users', value: '3,650', icon: Crown, change: '+8%' },
  { title: 'Active Users', value: '18,200', icon: UserCheck, change: '+15%' },
  { title: 'Banned Users', value: '245', icon: UserX, change: '-2%' },
  { title: 'Reported Users', value: '182', icon: AlertTriangle, change: '-5%' },
  { title: 'Total Payments', value: '$128,250', icon: CreditCard, change: '+18%' },
  { title: 'Monthly Revenue', value: '$32,800', icon: TrendingUp, change: '+22%' },
  { title: 'Active Chats', value: '1,250', icon: BarChart3, change: '+10%' },
];

const recentActivity = [
  { id: 1, action: 'New user registration', user: 'Sarah Parker', time: '2 minutes ago' },
  { id: 2, action: 'Premium subscription purchased', user: 'John Smith', time: '15 minutes ago' },
  { id: 3, action: 'Profile reported', user: 'Mike Johnson', time: '1 hour ago' },
  { id: 4, action: 'Chat message flagged', user: 'Emily Brown', time: '2 hours ago' },
  { id: 5, action: 'Account verified', user: 'David Wilson', time: '3 hours ago' },
];

const userGrowthOptions = {
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
};

const userGrowthSeries = [
  {
    name: 'New Users',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
];

const revenueOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};

const revenueSeries = [
  {
    name: 'Revenue',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-200 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                <h3 className="text-2xl font-semibold">{card.value}</h3>
              </div>
              <card.icon className="h-8 w-8 text-blue-500" />
            </div>
            <p className={`mt-2 text-sm ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {card.change} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">User Growth</h2>
          <Chart options={userGrowthOptions} series={userGrowthSeries} type="area" height={350} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Revenue</h2>
          <Chart options={revenueOptions} series={revenueSeries} type="bar" height={350} />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}