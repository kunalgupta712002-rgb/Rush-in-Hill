import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Sparkles, KeyRound, Loader2 } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const {
    authUser,
    isAdminUser,
    isAuthBusy,
    signInWithGoogle,
    setIsAdminLoggedIn,
    setActiveTab,
    showToast,
  } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  if (!isOpen) return null;

  const handleGoogleAdminLogin = async () => {
    try {
      const { isAdmin } = await signInWithGoogle();
      if (isAdmin) {
        setIsAdminLoggedIn(true);
        setActiveTab('admin');
        onClose();
      } else {
        showToast(
          'Signed in as customer. This Google account is not on the Cafe Owner allowlist.',
          'warning'
        );
        onClose();
      }
    } catch {
      // Toast handled by AppContext
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsAdminLoggedIn(true);
      setActiveTab('admin');
      showToast('Welcome to Rush in Hill Management Portal', 'success');
      onClose();
    } else {
      showToast('Please enter admin credentials', 'warning');
    }
  };

  const handleQuickDemoAccess = () => {
    setIsAdminLoggedIn(true);
    setActiveTab('admin');
    showToast('Signed in with Demo Admin role', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl text-left shadow-2xl overflow-hidden border border-slate-200 relative animate-in zoom-in-95 duration-150">
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">Cafe Owner & Kitchen Portal</h3>
                <p className="text-xs text-slate-400">Rush in Hill Restro and Cafe</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {/* Firebase Google Owner Sign-In */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleGoogleAdminLogin}
                disabled={isAuthBusy}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-amber-500 rounded-xl font-bold shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isAuthBusy ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-800" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                )}
                <span>
                  {authUser && isAdminUser
                    ? `Continue as ${authUser.email}`
                    : 'Sign In with Owner Google Account'}
                </span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-2 text-[10px] font-bold uppercase text-slate-400 shrink-0">
                Or Quick Portal Access
              </span>
              <div className="border-t border-slate-200 w-full"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xs transition"
                >
                  Sign In with Credentials
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoAccess}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-xl font-bold shadow-md shadow-amber-900/15 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>1-Click Demo Admin Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
