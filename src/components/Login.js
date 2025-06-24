import React, { useState } from 'react';
import { LockClosedIcon, UserIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const Login = ({ onLogin }) => {
  const [step, setStep] = useState('credentials'); // 'credentials' | '2fa'
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (step === 'credentials') {
      setStep('2fa');
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
          理解力/判断力測定AIシステム
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            {step === 'credentials' ? 'サインインしてください' : '2段階認証コードを入力してください'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          {step === 'credentials' ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  メールアドレス
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input-field pl-10"
                    placeholder="email@example.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  />
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input-field pl-10"
                    placeholder="パスワード"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                  <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    ログイン状態を保持
                  </label>
                </div>

                <div className="text-sm">
                  <button type="button" className="font-medium text-primary hover:text-blue-700">
                    パスワードを忘れましたか？
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 text-base"
              >
                次へ
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="text-center">
                <DevicePhoneMobileIcon className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  2段階認証
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  認証アプリまたはSMSで受信したコードを入力してください
                </p>
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  認証コード
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  maxLength="6"
                  className="input-field text-center text-2xl tracking-widest"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="flex-1 btn btn-secondary"
                >
                  戻る
                </button>
                <button
                  type="submit"
                  className="flex-1 btn btn-primary"
                >
                  ログイン
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 