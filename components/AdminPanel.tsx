/**
 * AdminPanel — Hidden admin interface for managing activation tokens.
 *
 * Accessible only via a unique URL: ?admin=<ADMIN_CONFIG.accessKey>
 *
 * Features:
 *   - Generate one-time activation tokens (device-bound, lifetime access)
 *   - View all tokens (active / used) with device IDs
 *   - View activated devices with lifetime access
 *   - Delete tokens
 *   - View daily chat usage stats
 *   - Reset daily chat counter
 *   - Clear seen phone numbers cache
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  ADMIN_CONFIG,
  FREE_DAILY_GENERATIONS,
} from '../constants';

const TOKENS_KEY = ADMIN_CONFIG.TOKENS_KEY;
const DAILY_CHAT_KEY = 'quickchat_daily_chat_usage';
const SEEN_NUMBERS_KEY = 'quickchat_seen_phone_numbers';
const DEVICE_ACTIVATED_KEY = 'quickchat_device_activated';

interface TokenEntry {
  id: string;
  token: string;
  createdAt: number;
  used: boolean;
  usedAt?: number;
  deviceId?: string;
}

interface DeviceActivation {
  token: string;
  activatedAt: number;
  deviceId: string;
}

interface DailyChatData {
  date: string;
  count: number;
}

const generateToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getTokens = (): TokenEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveTokens = (tokens: TokenEntry[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } catch {
    // Ignore storage errors
  }
};

const getTodayDateStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getDailyChatsUsed = (): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(DAILY_CHAT_KEY);
    if (!raw) return 0;
    const data: DailyChatData = JSON.parse(raw);
    const today = getTodayDateStr();
    if (data.date === today) {
      return data.count || 0;
    }
    return 0;
  } catch {
    return 0;
  }
};

const AdminPanel: React.FC = () => {
  const [tokens, setTokens] = useState<TokenEntry[]>([]);
  const [newTokenCount, setNewTokenCount] = useState(1);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [dailyChats, setDailyChats] = useState(0);
  const [seenNumbersCount, setSeenNumbersCount] = useState(0);
  const [deviceActivations, setDeviceActivations] = useState<DeviceActivation[]>([]);

  useEffect(() => {
    setTokens(getTokens());
    setDailyChats(getDailyChatsUsed());
    try {
      const raw = localStorage.getItem(SEEN_NUMBERS_KEY);
      if (!raw) {
        setSeenNumbersCount(0);
      } else {
        const records = JSON.parse(raw);
        setSeenNumbersCount(Array.isArray(records) ? records.length : 0);
      }
    } catch {
      setSeenNumbersCount(0);
    }
    try {
      const raw = localStorage.getItem(DEVICE_ACTIVATED_KEY);
      if (raw) {
        const activation = JSON.parse(raw);
        setDeviceActivations(activation ? [activation] : []);
      } else {
        setDeviceActivations([]);
      }
    } catch {
      setDeviceActivations([]);
    }
  }, []);

  const clearStatus = () => setTimeout(() => setStatus(null), 3000);

  const handleGenerateTokens = () => {
    const current = getTokens();
    const created: TokenEntry[] = [];
    for (let i = 0; i < newTokenCount; i++) {
      created.push({
        id: crypto.randomUUID(),
        token: generateToken(),
        createdAt: Date.now(),
        used: false,
      });
    }
    const updated = [...current, ...created];
    saveTokens(updated);
    setTokens(updated);
    setStatus({ type: 'success', message: `Generated ${created.length} token(s) successfully.` });
    clearStatus();
  };

  const handleDeleteToken = (id: string) => {
    const updated = tokens.filter((t) => t.id !== id);
    saveTokens(updated);
    setTokens(updated);
    setStatus({ type: 'success', message: 'Token deleted.' });
    clearStatus();
  };

  const handleResetDailyChats = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(DAILY_CHAT_KEY, JSON.stringify({ date: getTodayDateStr(), count: 0 }));
      setDailyChats(0);
      setStatus({ type: 'success', message: 'Daily chat counter reset.' });
      clearStatus();
    } catch {
      setStatus({ type: 'error', message: 'Failed to reset daily chats.' });
      clearStatus();
    }
  };

  const handleClearSeenNumbers = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(SEEN_NUMBERS_KEY);
      setSeenNumbersCount(0);
      setStatus({ type: 'success', message: 'Seen numbers cache cleared.' });
      clearStatus();
    } catch {
      setStatus({ type: 'error', message: 'Failed to clear seen numbers.' });
      clearStatus();
    }
  };

  const activeTokens = tokens.filter((t) => !t.used);
  const usedTokens = tokens.filter((t) => t.used);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400 mb-1">🔐 QuickChat Admin</h1>
            <p className="text-zinc-400 text-sm">
              Activation Token Management &bull; One-time use tokens for chat access
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-medium border border-emerald-700">
              ADMIN ACCESS
            </span>
            <button
              onClick={() => (window.location.href = window.location.pathname)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-600 transition-colors text-sm font-medium"
            >
              Exit Admin
            </button>
          </div>
        </div>

        {/* Status Alert */}
        {status && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              status.type === 'success'
                ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/50'
                : 'bg-red-900/20 text-red-300 border-red-500/50'
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Tokens</div>
            <div className="text-2xl font-bold text-emerald-400">{activeTokens.length}</div>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Used Tokens</div>
            <div className="text-2xl font-bold text-zinc-400">{usedTokens.length}</div>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Activated Devices</div>
            <div className="text-2xl font-bold text-blue-400">{deviceActivations.length}</div>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Daily Chats Used</div>
            <div className="text-2xl font-bold text-blue-400">{dailyChats} / {FREE_DAILY_GENERATIONS}</div>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Seen Numbers Cache</div>
            <div className="text-2xl font-bold text-purple-400">{seenNumbersCount}</div>
          </div>
        </div>

        {/* Generate Token Section */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-8">
          <h2 className="text-xl font-bold mb-4 text-zinc-100">Generate Activation Tokens</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm text-zinc-400 mb-1">Number of tokens to generate</label>
              <input
                type="number"
                min="1"
                max="100"
                value={newTokenCount}
                onChange={(e) => setNewTokenCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-zinc-100 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={handleGenerateTokens}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all active:scale-95"
            >
              Generate Tokens
            </button>
          </div>
        </div>

        {/* Tokens List */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-100">All Tokens</h2>
            <span className="text-xs text-zinc-500">{tokens.length} total</span>
          </div>

          {tokens.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              No tokens yet. Generate your first token above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Token</th>
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Status</th>
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Created</th>
                    {tokens.some((t) => t.used) && (
                      <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Used At</th>
                    )}
                    {tokens.some((t) => t.deviceId) && (
                      <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Device ID</th>
                    )}
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((t) => (
                    <tr key={t.id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                      <td className="py-4 text-zinc-200 font-mono text-sm">{t.token}</td>
                      <td className="py-4">
                        {t.used ? (
                          <span className="px-2 py-1 rounded bg-red-900/30 text-red-400 text-xs border border-red-500/30">
                            Used
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 text-xs border border-emerald-500/30">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-zinc-400 text-sm">
                        {new Date(t.createdAt).toLocaleString()}
                      </td>
                      {tokens.some((t) => t.used) && (
                        <td className="py-4 text-zinc-400 text-sm">
                          {t.used ? new Date(t.usedAt!).toLocaleString() : '-'}
                        </td>
                      )}
                      {tokens.some((t) => t.deviceId) && (
                        <td className="py-4 text-zinc-400 text-xs font-mono">
                          {t.deviceId || '-'}
                        </td>
                      )}
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDeleteToken(t.id)}
                          className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded border border-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Device Activations */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-100">Activated Devices</h2>
            <span className="text-xs text-zinc-500">{deviceActivations.length} device(s) with lifetime access</span>
          </div>

          {deviceActivations.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              No devices activated yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Token</th>
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Device ID</th>
                    <th className="pb-3 text-xs font-semibold text-zinc-400 uppercase">Activated At</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceActivations.map((a) => (
                    <tr key={a.deviceId} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                      <td className="py-4 text-zinc-200 font-mono text-sm">{a.token}</td>
                      <td className="py-4 text-zinc-400 text-xs font-mono">{a.deviceId}</td>
                      <td className="py-4 text-zinc-400 text-sm">{new Date(a.activatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleResetDailyChats}
            className="px-6 py-4 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 rounded-xl border border-blue-500/30 transition-colors text-sm font-medium"
          >
            🔄 Reset Daily Chat Counter
          </button>
          <button
            onClick={handleClearSeenNumbers}
            className="px-6 py-4 bg-purple-900/30 hover:bg-purple-900/50 text-purple-400 rounded-xl border border-purple-500/30 transition-colors text-sm font-medium"
          >
            🗑️ Clear Seen Numbers Cache
          </button>
        </div>

        {/* Admin Access Info */}
        <div className="mt-8 bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50">
          <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Admin Access URL</h3>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}${window.location.pathname}?admin=${ADMIN_CONFIG.accessKey}`}
              className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-600 text-zinc-100 text-sm font-mono focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?admin=${ADMIN_CONFIG.accessKey}`);
                setStatus({ type: 'success', message: 'Admin URL copied to clipboard.' });
                clearStatus();
              }}
              className="px-4 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-lg border border-zinc-600 transition-colors text-sm font-medium"
            >
              Copy
            </button>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Share this URL only with trusted admins. Access requires the secret key in the URL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
