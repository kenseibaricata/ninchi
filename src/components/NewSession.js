import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MicrophoneIcon,
  StopIcon,
  PlayIcon,
  PauseIcon,
  DocumentTextIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const NewSession = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('setup'); // 'setup' | 'recording' | 'processing' | 'results'
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const intervalRef = useRef(null);

  // モックデータ
  const clients = [
    { id: 1, name: '田中良子', age: 79, lastSession: '2024-01-10' },
    { id: 2, name: '山田太郎', age: 72, lastSession: '2024-01-08' },
    { id: 3, name: '佐藤花子', age: 85, lastSession: null }
  ];

  const sessionTypes = [
    { id: 'initial', name: '初回評価', duration: '15-20分' },
    { id: 'regular', name: '定期評価', duration: '10-15分' },
    { id: 'followup', name: 'フォローアップ', duration: '5-10分' },
    { id: 'emergency', name: '緊急評価', duration: '10分' }
  ];

  // タイマー処理
  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRecording, isPaused]);

  // 録音開始
  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setStep('recording');
    // モック文字起こし
    setTimeout(() => {
      setTranscript('今日の日付は覚えていますか？');
    }, 2000);
    setTimeout(() => {
      setTranscript(prev => prev + '\n\n今日は... えーっと... 1月の... 15日だったと思います。');
    }, 5000);
    setTimeout(() => {
      setTranscript(prev => prev + '\n\nありがとうございます。では、今いる場所はどこか分かりますか？');
    }, 8000);
  };

  // 録音停止
  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(intervalRef.current);
    setStep('processing');
    setProcessing(true);
    
    // モック処理時間
    setTimeout(() => {
      setProcessing(false);
      setStep('results');
    }, 3000);
  };

  // 録音一時停止/再開
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // 時間フォーマット
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // セットアップ画面
  if (step === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">新規セッション</h1>
          <p className="mt-2 text-gray-600">クライアント情報を選択してセッションを開始してください</p>
        </div>

        <div className="card p-6 space-y-6">
          {/* クライアント選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              クライアント選択
            </label>
            <div className="grid grid-cols-1 gap-3">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedClient === client.id.toString()
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedClient(client.id.toString())}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.age}歳</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {client.lastSession ? (
                        <p className="text-sm text-gray-500">
                          前回: {new Date(client.lastSession).toLocaleDateString('ja-JP')}
                        </p>
                      ) : (
                        <p className="text-sm text-warning">初回</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* セッションタイプ選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              セッションタイプ
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    sessionType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSessionType(type.id)}
                >
                  <p className="font-medium text-gray-900">{type.name}</p>
                  <p className="text-sm text-gray-500">目安時間: {type.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 開始ボタン */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              キャンセル
            </button>
            <button
              onClick={startRecording}
              disabled={!selectedClient || !sessionType}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <MicrophoneIcon className="h-5 w-5" />
              <span>録音開始</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 録音中画面
  if (step === 'recording') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">録音中</h1>
          <p className="mt-2 text-gray-600">
            {clients.find(c => c.id.toString() === selectedClient)?.name} さんとの対話を録音しています
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 録音コントロール */}
          <div className="card p-6">
            <div className="text-center space-y-6">
              {/* 録音状態表示 */}
              <div className="relative">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                  isPaused ? 'bg-warning/20' : 'bg-primary/20'
                }`}>
                  {isPaused ? (
                    <PauseIcon className="h-16 w-16 text-warning" />
                  ) : (
                    <div className="flex items-center justify-center">
                      <MicrophoneIcon className="h-16 w-16 text-primary" />
                      <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* タイマー */}
              <div className="text-4xl font-mono font-bold text-gray-900">
                {formatTime(duration)}
              </div>

              {/* コントロールボタン */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={togglePause}
                  className={`btn ${isPaused ? 'btn-primary' : 'btn-secondary'} flex items-center space-x-2`}
                >
                  {isPaused ? (
                    <>
                      <PlayIcon className="h-5 w-5" />
                      <span>再開</span>
                    </>
                  ) : (
                    <>
                      <PauseIcon className="h-5 w-5" />
                      <span>一時停止</span>
                    </>
                  )}
                </button>
                <button
                  onClick={stopRecording}
                  className="btn btn-danger flex items-center space-x-2"
                >
                  <StopIcon className="h-5 w-5" />
                  <span>終了</span>
                </button>
              </div>
            </div>
          </div>

          {/* リアルタイム文字起こし */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              リアルタイム文字起こし
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {transcript || '音声を認識しています...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 処理中画面
  if (step === 'processing') {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="card p-8">
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">処理中</h2>
              <p className="mt-2 text-gray-600">
                AIが音声を分析し、理解力/判断力の評価を行っています...
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 結果画面
  if (step === 'results') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-success" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">評価完了</h1>
          <p className="mt-2 text-gray-600">
            AIによ理解力/判断力の評価が完了しました
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MMSE スコア */}
          <div className="card p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">MMSE スコア</h3>
            <div className="mt-4">
              <div className="text-4xl font-bold text-primary">22</div>
              <div className="text-sm text-gray-500">/ 30</div>
            </div>
            <div className="mt-2">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-warning/20 text-warning">
                軽度判断力低下の疑い
              </span>
            </div>
          </div>

          {/* 信頼度 */}
          <div className="card p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">判断力信頼度</h3>
            <div className="mt-4">
              <div className="text-4xl font-bold text-success">85</div>
              <div className="text-sm text-gray-500">%</div>
            </div>
            <div className="mt-2">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success/20 text-success">
                高信頼度
              </span>
            </div>
          </div>

          {/* セッション時間 */}
          <div className="card p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">セッション時間</h3>
            <div className="mt-4">
              <div className="text-4xl font-bold text-gray-900">{formatTime(duration)}</div>
            </div>
            <div className="mt-2">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                標準時間内
              </span>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate(`/client/${selectedClient}`)}
            className="btn btn-primary"
          >
            詳細レポートを表示
          </button>
          <button
            onClick={() => {
              setStep('setup');
              setDuration(0);
              setTranscript('');
              setSelectedClient('');
              setSessionType('');
            }}
            className="btn btn-secondary"
          >
            新規セッション
          </button>
        </div>
      </div>
    );
  }
};

export default NewSession; 