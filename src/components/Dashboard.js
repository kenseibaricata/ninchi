import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  // モックデータ
  const alerts = [
    {
      id: 1,
      type: 'warning',
      client: '田中良子',
      message: 'MMSEスコアが前回より3ポイント低下しています',
      timestamp: '2時間前'
    },
    {
      id: 2,
      type: 'info',
      client: '山田太郎',
      message: '定期評価の時期です',
      timestamp: '5時間前'
    }
  ];

  const todaySchedule = [
    {
      id: 1,
      client: '田中良子',
      time: '10:00',
      type: '定期評価',
      status: 'scheduled'
    },
    {
      id: 2,
      client: '佐藤花子',
      time: '14:00',
      type: '初回面談',
      status: 'scheduled'
    },
    {
      id: 3,
      client: '鈴木一郎',
      time: '16:30',
      type: 'フォローアップ',
      status: 'completed'
    }
  ];

  const stats = [
    {
      name: '今月の評価数',
      value: '24',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'アクティブクライアント',
      value: '18',
      change: '+2',
      changeType: 'increase'
    },
    {
      name: '要注意クライアント',
      value: '3',
      change: '+1',
      changeType: 'warning'
    },
    {
      name: '平均評価時間',
      value: '8分',
      change: '-2分',
      changeType: 'decrease'
    }
  ];

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="mt-1 text-sm text-gray-600">
            {new Date().toLocaleDateString('ja-JP', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>
        <Link
          to="/session/new"
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>新規セッション</span>
        </Link>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-success' :
                stat.changeType === 'decrease' ? 'text-primary' :
                'text-warning'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* アラート・通知 */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-warning mr-2" />
              アラート・通知
            </h3>
          </div>
          <div className="p-6">
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-warning/10 border-warning' : 'bg-primary/10 border-primary'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{alert.client}</p>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">新しいアラートはありません</p>
              </div>
            )}
          </div>
        </div>

        {/* 今日の予定 */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ClockIcon className="h-5 w-5 text-primary mr-2" />
              今日の予定
            </h3>
          </div>
          <div className="p-6">
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        schedule.status === 'completed' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{schedule.time}</p>
                        <p className="text-sm text-gray-600">{schedule.client}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      schedule.status === 'completed' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {schedule.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">今日の予定はありません</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 最近のクライアント */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <UserGroupIcon className="h-5 w-5 text-primary mr-2" />
              最近の評価
            </h3>
            <Link to="/clients" className="text-sm text-primary hover:text-blue-700">
              すべて表示
            </Link>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  クライアント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最新スコア
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  リスクレベル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終評価日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: '田中良子', score: 22, risk: 'medium', date: '2024-01-15', id: 1 },
                { name: '山田太郎', score: 28, risk: 'low', date: '2024-01-14', id: 2 },
                { name: '佐藤花子', score: 18, risk: 'high', date: '2024-01-13', id: 3 }
              ].map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.score}/30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.risk === 'low' ? 'bg-success/20 text-success' :
                      client.risk === 'medium' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>
                      {client.risk === 'low' ? '低' : client.risk === 'medium' ? '中' : '高'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(client.date).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/client/${client.id}`}
                      className="text-primary hover:text-blue-700"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 