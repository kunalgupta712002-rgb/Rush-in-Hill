import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BLUEPRINT_LIMITS } from '../../firebase';
import { CustomerType } from '../../types';
import {
  X,
  User,
  Phone,
  GraduationCap,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Mail,
  Loader2,
  UserPlus,
  LogIn,
} from 'lucide-react';

export type AuthModalMode = 'login' | 'signup' | 'profile';

interface CustomerLoginModalProps {
  isOpen: boolean;
  initialMode?: AuthModalMode;
  onClose: () => void;
}

const GoogleIcon: React.FC = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

export const CustomerLoginModal: React.FC<CustomerLoginModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const {
    authUser,
    userProfile,
    isAdminUser,
    isAuthBusy,
    signInWithGoogle,
    logoutUser,
    updateUserProfile,
    setActiveTab,
    showToast,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'login'
  );

  // Sign-up pre-auth details & Profile edit state
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [customerType, setCustomerType] = useState<CustomerType>('DGU Student');
  const [phoneError, setPhoneError] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAuthError('');
      setPhoneError('');
      if (initialMode === 'signup') setTab('signup');
      else if (initialMode === 'login') setTab('login');

      if (userProfile) {
        setDisplayName(userProfile.displayName);
        setPhone(userProfile.phone || '');
        setCustomerType(userProfile.customerType || 'DGU Student');
      } else if (authUser) {
        setDisplayName(authUser.displayName || authUser.email?.split('@')[0] || '');
        setPhone('');
        setCustomerType('DGU Student');
      } else {
        setDisplayName('');
        setPhone('');
        setCustomerType('DGU Student');
      }
    }
  }, [isOpen, initialMode, userProfile, authUser]);

  if (!isOpen) return null;

  const validateOptionalPhone = (val: string): boolean => {
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) {
      setPhoneError('');
      return true;
    }
    if (!BLUEPRINT_LIMITS.REQUIRED_PHONE_REGEX.test(cleaned)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number (starting with 6-9)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
      onClose();
    } catch {
      setAuthError('Google sign-in was cancelled or blocked. Please try again.');
    }
  };

  const handleGoogleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!validateOptionalPhone(phone)) return;

    try {
      await signInWithGoogle({
        displayName: displayName.trim() || undefined,
        phone: phone.replace(/\D/g, '').slice(0, 10),
        customerType,
      });
      onClose();
    } catch {
      setAuthError('Could not complete Google sign-up. Please try again.');
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      showToast('Please enter your display name.', 'warning');
      return;
    }
    if (!validateOptionalPhone(phone)) return;

    try {
      await updateUserProfile({
        displayName: displayName.trim().slice(0, BLUEPRINT_LIMITS.DISPLAY_NAME_MAX),
        phone: phone.replace(/\D/g, '').slice(0, 10),
        customerType,
      });
      onClose();
    } catch {
      // Toast handled by AppContext
    }
  };

  const handleLogout = async () => {
    await logoutUser();
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
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">
                Rush in Hill Account
              </span>
              <h3 className="text-base font-extrabold mt-1">
                {authUser
                  ? 'Your Account & Profile'
                  : tab === 'signup'
                  ? 'Create Your Account'
                  : 'Welcome Back'}
              </h3>
              <p className="text-xs text-amber-200">
                {authUser
                  ? 'Synced across devices for fast pickup & Quick Reorder'
                  : tab === 'signup'
                  ? 'Sign up in seconds for 1-click checkout & saved orders'
                  : 'Log in to access your order history & saved details'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-amber-200 hover:text-white hover:bg-amber-700/60 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Authenticated Account Profile View */}
          {authUser ? (
            <div className="p-6 space-y-5 text-xs">
              {/* User Card */}
              <div className="flex items-center gap-3.5 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={userProfile?.displayName || 'Account avatar'}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                    {(userProfile?.displayName || authUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-extrabold text-slate-900 text-sm truncate">
                      {userProfile?.displayName || authUser.displayName || 'Rush in Hill Guest'}
                    </h4>
                    {isAdminUser && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3" /> Owner
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1 truncate mt-0.5">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{authUser.email}</span>
                    {authUser.emailVerified && (
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                        aria-label="Verified email"
                      />
                    )}
                  </p>
                </div>
              </div>

              {/* Editable Profile Form */}
              <form onSubmit={handleProfileSave} className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={BLUEPRINT_LIMITS.DISPLAY_NAME_MAX}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    WhatsApp / Mobile Number (10 digits)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setPhone(cleaned);
                        if (phoneError) validateOptionalPhone(cleaned);
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 ${
                        phoneError
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {phoneError && <p className="text-[10px] text-rose-600 mt-1">{phoneError}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Campus / Customer Category
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={customerType}
                      onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    >
                      <option value="DGU Student">DGU Student (Hostel / Resident)</option>
                      <option value="Day Scholar">Day Scholar (Commuting)</option>
                      <option value="Industrial Employee">Industrial Employee (Selaqui)</option>
                      <option value="Other">Other / Visitor</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthBusy}
                  className="w-full py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isAuthBusy ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Save Profile Changes</span>
                </button>
              </form>

              {isAdminUser && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('admin');
                    onClose();
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-200 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Open Cafe Owner Portal</span>
                </button>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Signed in with Google</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isAuthBusy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-700 hover:bg-rose-50 font-bold transition border border-rose-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated: Log In / Sign Up Tabs */
            <div className="p-6 space-y-5 text-xs">
              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setAuthError('');
                  }}
                  className={`py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                    tab === 'login'
                      ? 'bg-white text-amber-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('signup');
                    setAuthError('');
                  }}
                  className={`py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                    tab === 'signup'
                      ? 'bg-white text-amber-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-medium">
                  {authError}
                </div>
              )}

              {tab === 'login' ? (
                <div className="space-y-4">
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                    <p className="font-bold text-amber-950 text-xs">
                      Instant, secure access with your Google account
                    </p>
                    <ul className="space-y-1.5 text-[11px] text-amber-900/90">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Auto-fill your name, phone & campus category at checkout</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Sync your past orders & 1-click Quick Reorder across devices</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Track live kitchen order status in real time</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isAuthBusy}
                    className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-amber-400 rounded-2xl font-bold text-sm shadow-xs transition flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-60"
                  >
                    {isAuthBusy ? (
                      <Loader2 className="w-4 h-4 animate-spin text-amber-800" />
                    ) : (
                      <GoogleIcon />
                    )}
                    <span>{isAuthBusy ? 'Signing in...' : 'Log In with Google'}</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    New to Rush in Hill?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('signup')}
                      className="font-bold text-amber-800 hover:text-amber-950 underline"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGoogleSignUp} className="space-y-3.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Name (Optional)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        maxLength={BLUEPRINT_LIMITS.DISPLAY_NAME_MAX}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Defaults to your Google name"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      WhatsApp / Mobile Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(cleaned);
                          if (phoneError) validateOptionalPhone(cleaned);
                        }}
                        placeholder="10-digit mobile for order pickup alerts"
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 ${
                          phoneError
                            ? 'border-rose-300 focus:ring-rose-500'
                            : 'border-slate-200 focus:ring-amber-500'
                        }`}
                      />
                    </div>
                    {phoneError && <p className="text-[10px] text-rose-600 mt-1">{phoneError}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      I am a... *
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                      >
                        <option value="DGU Student">DGU Student (Hostel / Resident)</option>
                        <option value="Day Scholar">Day Scholar (Commuting)</option>
                        <option value="Industrial Employee">Industrial Employee (Selaqui)</option>
                        <option value="Other">Other / Visitor</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthBusy}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-2xl font-bold text-sm shadow-md shadow-amber-900/20 transition flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-60"
                  >
                    {isAuthBusy ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="bg-white rounded-full p-1">
                        <GoogleIcon />
                      </span>
                    )}
                    <span>{isAuthBusy ? 'Creating Account...' : 'Sign Up with Google'}</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('login')}
                      className="font-bold text-amber-800 hover:text-amber-950 underline"
                    >
                      Log In
                    </button>
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
