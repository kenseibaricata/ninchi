import React, { useState } from 'react';
import {
  DocumentArrowDownIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // モックデータ
  const reports = [
    {
      id: 1,
      clientName: '田中良子',
      date: '2024-01-15',
      type: '定期評価',
      mmseScore: 22,
      riskLevel: 'medium',
      status: 'completed'
    },
    {
      id: 2,
      clientName: '山田太郎',
      date: '2024-01-14',
      type: '初回評価',
      mmseScore: 28,
      riskLevel: 'low',
      status: 'completed'
    },
    {
      id: 3,
      clientName: '佐藤花子',
      date: '2024-01-13',
      type: 'フォローアップ',
      mmseScore: 18,
      riskLevel: 'high',
      status: 'completed'
    }
  ];

  const stats = {
    totalSessions: 24,
    averageScore: 23.5,
    highRiskClients: 3,
    completionRate: 96
  };

  const handleExport = (format) => {
    // エクスポート処理のモック
    alert(`${format}形式でエクスポートを開始します...`);
  };

  const filteredReports = reports.filter(report => {
    return report.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           report.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">レポート</h1>
          <p className="mt-1 text-sm text-gray-600">
            評価データの分析とエクスポート
          </p>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">総セッション数</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalSessions}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">平均MMSEスコア</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageScore}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">要注意クライアント</p>
              <p className="text-2xl font-semibold text-warning">{stats.highRiskClients}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">完了率</p>
              <p className="text-2xl font-semibold text-success">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルターとエクスポート */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* 期間選択 */}
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="input-field w-auto"
              >
                <option value="week">今週</option>
                <option value="month">今月</option>
                <option value="quarter">今四半期</option>
                <option value="year">今年</option>
              </select>
            </div>

            {/* レポートタイプ */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">すべて</option>
                <option value="initial">初回評価</option>
                <option value="regular">定期評価</option>
                <option value="followup">フォローアップ</option>
              </select>
            </div>

            {/* 検索 */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="クライアント名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* エクスポートボタン */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleExport('CSV')}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="btn btn-primary flex items-center space-x-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* レポートテーブル */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">評価レポート一覧</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  クライアント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  評価日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MMSEスコア
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  リスクレベル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700">
                          {report.clientName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{report.clientName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.date).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.mmseScore}/30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.riskLevel === 'low' ? 'bg-success/20 text-success' :
                      report.riskLevel === 'medium' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>
                      {report.riskLevel === 'low' ? '低' : report.riskLevel === 'medium' ? '中' : '高'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success/20 text-success">
                      完了
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-blue-700 mr-3">
                      詳細
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      ダウンロード
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 一括操作 */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">選択した項目:</span>
            <button className="btn btn-secondary btn-sm">
              一括ダウンロード
            </button>
            <button className="btn btn-secondary btn-sm">
              一括削除
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {filteredReports.length}件中 {filteredReports.length}件を表示
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 