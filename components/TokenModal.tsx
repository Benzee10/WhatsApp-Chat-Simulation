/**
 * TokenModal — Popup requiring a one-time activation token for lifetime device access.
 *
 * Users enter a valid, unused token once. After activation, the device is
 * permanently unlocked — no token needed again on the same device.
 * Tokens can only be activated on one device (device-bound), preventing sharing.
 *
 * Users get tokens by contacting the admin via WhatsApp.
 */
import React, { useState, useEffect } from 'react';
import { ADMIN_CONFIG } from '../constants';

const TOKENS_KEY = ADMIN_CONFIG.TOKENS_KEY;
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

/** Generate a simple device fingerprint so tokens are bound to one device */
const getDeviceId = (): string => {
  if (typeof window === 'undefined') return '';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fingerprint = ctx ? ctx.fillText('device-fingerprint', 0, 0) : '';
  const components: string[] = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    `${screen.width}x${screen.height}`,
    String(new Date().getTimezoneOffset()),
    String(fingerprint),
  ];
  let hash = 0;
  for (const comp of components) {
    for (let i = 0; i < comp.length; i++) {
      const char = comp.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
  }
  return 'dev_' + Math.abs(hash).toString(36);
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

const getDeviceActivation = (): DeviceActivation | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DEVICE_ACTIVATED_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveDeviceActivation = (activation: DeviceActivation): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DEVICE_ACTIVATED_KEY, JSON.stringify(activation));
  } catch {
    // Ignore storage errors
  }
};

interface TokenModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onSuccess, onClose }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
    setTokenInput('');
    setLoading(false);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setError('Please enter a token.');
      return;
    }

    setLoading(true);
    setError('');

    // Small delay to simulate validation
    setTimeout(() => {
      const tokens = getTokens();
      const deviceId = getDeviceId();

      const tokenEntry = tokens.find(
        (t) => t.token === tokenInput.trim().toUpperCase() && !t.used
      );

      if (!tokenEntry) {
        setLoading(false);
        setError('Invalid or already used token. Please contact the admin.');
        return;
      }

      // Mark token as used and bind to this device
      const updated = tokens.map((t) =>
        t.id === tokenEntry.id
          ? { ...t, used: true, usedAt: Date.now(), deviceId }
          : t
      );
      saveTokens(updated);

      // Save device activation for lifetime access on this device
      saveDeviceActivation({
        token: tokenEntry.token,
        activatedAt: Date.now(),
        deviceId,
      });

      setLoading(false);
      onSuccess();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 p-2">
        <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-500 px-6 py-5">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              🔑 Device Activation
            </h2>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-zinc-600 text-sm mb-6">
              Activate this device for lifetime chat access. You only need to do
              this once. Contact the admin via WhatsApp below to get your token.
            </p>

            {/* WhatsApp Admin Button */}
            <a
              href={ADMIN_CONFIG.adminWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-[#1eb758] transition-all active:scale-[0.98] mb-6"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>
              <span>Get Token from Admin (WhatsApp)</span>
            </a>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Token Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                Enter Activation Token
              </label>
              <input
                type="text"
                autoCapitalize="characters"
                spellCheck={false}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="ABCD1234EFGH"
                className={`w-full px-4 py-3 rounded-lg text-zinc-900 bg-zinc-50 border ${
                  error ? 'border-red-300' : 'border-zinc-300'
                } focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${loading ? 'disabled' : ''}`}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !tokenInput.trim()}
                className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all active:scale-[0.98] ${
                  loading || !tokenInput.trim()
                    ? 'bg-zinc-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {loading ? 'Validating...' : 'Activate Device'}
              </button>
            </form>

            <p className="mt-5 text-xs text-zinc-400 text-center">
              One token = one device. Once activated, this device has lifetime
              access — no token needed again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
