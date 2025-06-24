import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const ClientDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // モックデータ
  const client = {
    id: 1,
    name: '田中良子',
    age: 79,
    gender: '女性',
    phone: '090-1234-5678',
    address: '東京都渋谷区...',
    emergencyContact: '田中太郎（息子）',
    emergencyPhone: '090-9876-5432',
    condition: '軽度理解度低下の疑い',
    lastAssessment: '2024-01-15',
    riskLevel: 'medium'
  };

  const assessmentHistory = [
    { date: '2024-01-15', mmse: 22, moca: 20, confidence: 85, notes: '理解力スコアが前回より3ポイント低下' },
    { date: '2024-01-01', mmse: 25, moca: 23, confidence: 90, notes: '前回と同程度のスコア' },
    { date: '2023-12-15', mmse: 26, moca: 24, confidence: 88, notes: '初回評価、基準値設定' },
    { date: '2023-12-01', mmse: 28, moca: 26, confidence: 92, notes: '正常範囲内' }
  ];

  const intentHistory = [
    {
      category: '医療',
      question: '入院が必要になった場合の希望',
      answer: '可能な限り自宅での治療を希望。どうしても必要な場合のみ入院を検討。',
      confidence: 'high',
      date: '2024-01-15'
    },
    {
      category: '介護',
      question: 'デイサービス利用について',
      answer: '週2-3回程度なら利用してもよい。送迎があることが条件。',
      confidence: 'medium',
      date: '2024-01-10'
    },
    {
      category: '財産',
      question: '財産管理について',
      answer: '息子に任せたい。でも重要な判断は相談してほしい。',
      confidence: 'high',
      date: '2024-01-05'
    }
  ];

  const tabs = [
    { id: 'overview', name: '概要', icon: DocumentTextIcon },
    { id: 'assessment', name: '評価履歴', icon: ChartBarIcon },
    { id: 'intentions', name: '意思履歴', icon: CheckCircleIcon }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      '医療': 'bg-red-100 text-red-800',
      '介護': 'bg-blue-100 text-blue-800',
      '財産': 'bg-yellow-100 text-yellow-800',
      '生活': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence) => {
    const colors = {
      'high': 'text-success',
      'medium': 'text-warning',
      'low': 'text-danger'
    };
    return colors[confidence] || 'text-gray-500';
  };

  const ScoreChart = () => {
    const maxScore = 30;
    const chartData = assessmentHistory.slice().reverse();
    
    return (
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">スコア推移</h3>
        <div className="space-y-4">
          {chartData.map((assessment, index) => (
            <div key={assessment.date} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600">
                {new Date(assessment.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">理解力</span>
                  <span className="text-sm text-gray-600">{assessment.mmse}/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(assessment.mmse / maxScore) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">MoCA</span>
                  <span className="text-sm text-gray-600">{assessment.moca}/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(assessment.moca / maxScore) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right">
                <span className={`text-sm font-medium ${getConfidenceColor('high')}`}>
                  {assessment.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-sm text-gray-600">{client.age}歳 • {client.gender}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/session/new')}
            className="btn btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>新規セッション</span>
          </button>
        </div>
      </div>

      {/* アラート */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <p className="font-medium text-warning">要注意</p>
            <p className="text-sm text-gray-600 mt-1">
              理解力スコアが前回より3ポイント低下しています。追加評価を検討してください。
            </p>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* タブコンテンツ */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 基本情報 */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">基本情報</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-600">年齢</dt>
                  <dd className="text-sm text-gray-900">{client.age}歳</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">性別</dt>
                  <dd className="text-sm text-gray-900">{client.gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">電話番号</dt>
                  <dd className="text-sm text-gray-900">{client.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">住所</dt>
                  <dd className="text-sm text-gray-900">{client.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">緊急連絡先</dt>
                  <dd className="text-sm text-gray-900">
                    {client.emergencyContact}<br />
                    {client.emergencyPhone}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">現在の状態</dt>
                  <dd className="text-sm text-gray-900">{client.condition}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">リスクレベル</dt>
                  <dd>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.riskLevel === 'low' ? 'bg-success/20 text-success' :
                      client.riskLevel === 'medium' ? 'bg-warning/20 text-warning' :
                      'bg-danger/20 text-danger'
                    }`}>
                      {client.riskLevel === 'low' ? '低' : client.riskLevel === 'medium' ? '中' : '高'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* スコア推移 */}
          <div className="lg:col-span-2">
            <ScoreChart />
          </div>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="space-y-6">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">評価履歴</h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      評価日
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      理解力
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      MoCA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      信頼度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      備考
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assessmentHistory.map((assessment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(assessment.date).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{assessment.mmse}/30</span>
                          {index > 0 && (
                            <span className={`ml-2 text-xs ${
                              assessment.mmse < assessmentHistory[index-1].mmse ? 'text-danger' :
                              assessment.mmse > assessmentHistory[index-1].mmse ? 'text-success' :
                              'text-gray-500'
                            }`}>
                              {assessment.mmse < assessmentHistory[index-1].mmse ? '↓' :
                               assessment.mmse > assessmentHistory[index-1].mmse ? '↑' : '→'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.moca}/30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.confidence}%
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {assessment.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'intentions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">意思履歴</h3>
            <button className="btn btn-primary btn-sm">
              新規質問追加
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {intentHistory.map((intent, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(intent.category)}`}>
                      {intent.category}
                    </span>
                    <span className={`text-sm font-medium ${getConfidenceColor(intent.confidence)}`}>
                      {intent.confidence === 'high' ? '高確信度' : 
                       intent.confidence === 'medium' ? '中確信度' : '低確信度'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(intent.date).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">質問</p>
                    <p className="text-sm text-gray-900 mt-1">{intent.question}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">回答</p>
                    <p className="text-sm text-gray-900 mt-1">{intent.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetail; 