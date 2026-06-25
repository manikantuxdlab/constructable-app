import { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, ChevronLeft, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login, signUp, loginWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // States for Login Form
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      if (isSignUp) {
        const displayName = username || email.split('@')[0];
        await signUp(email, password, displayName);
      } else {
        await login(loginUser, loginPassword);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let message = "An error occurred during authentication.";
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
        message = "Incorrect username/email or password.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (err.code === "auth/email-already-in-use") {
        message = "This email address is already in use.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (err.code === "auth/weak-password") {
        message = "Password should be at least 6 characters long.";
      } else if (err.message) {
        message = err.message;
      }
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleHelpClick = () => {
    alert("Need help? Please contact support at support@sitesupply.com or visit our Help Center.");
  };

  const handleForgotPassword = () => {
    alert("Password reset instructions have been sent to your email address.");
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto no-scrollbar font-sans select-none animate-[fadeIn_0.3s_ease-out]">
      
      {/* Curved colored header (replaces green color in reference image with project's brand gold) */}
      <header className="h-44 bg-[var(--brand-gold)] dark:bg-[var(--brand-gold)] p-5 relative flex flex-col justify-between shrink-0 transition-colors duration-300">
        {/* Navigation line */}
        <div className="flex items-center justify-between w-full mt-1">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/20 hover:bg-white/30 text-white transition active-scale"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          
          {isSignUp ? (
            <button 
              type="button"
              onClick={handleHelpClick}
              className="text-[11px] font-bold text-white/90 hover:text-white transition active-scale hover:underline"
            >
              Need some help?
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-[11px] font-bold text-white/90 hover:text-white transition active-scale hover:underline"
            >
              Forgot your password?
            </button>
          )}
        </div>

        {/* Floating bottom curve spacer */}
        <div className="h-8 w-full" />
      </header>

      {/* Main Form Container - curves over the header with slanted slash corners */}
      <div className="relative -mt-8 px-6 pt-7 pb-6 flex-1 flex flex-col justify-between transition-colors duration-300 filter drop-shadow-md">
        {/* Slanted background container */}
        <div 
          className="absolute inset-0 bg-card transition-colors duration-300"
          style={{ clipPath: 'polygon(28px 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%, 0 28px)' }}
        />
        
        <form onSubmit={handleSubmit} className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Titles & Descriptions */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground tracking-tight">
                {isSignUp ? 'Getting started' : "Let's sign you in"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isSignUp ? 'Create account to continue!' : 'Good to see you back.'}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-bold rounded-none animate-[shake_0.4s_ease-in-out]">
                {authError}
              </div>
            )}

            {/* Social Logins */}
            <div className="flex items-center gap-3 pt-1">
              {/* Google */}
              <button
                type="button"
                disabled={authLoading}
                onClick={async () => {
                  setAuthError(null);
                  setAuthLoading(true);
                  try {
                    await loginWithGoogle();
                  } catch (err: any) {
                    console.error("Google login failed:", err);
                    setAuthError(err.message || "Google sign-in failed.");
                  } finally {
                    setAuthLoading(false);
                  }
                }}
                className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:border-[var(--brand-gold)]/40 transition active-scale disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.093-5.136 4.093-3.232 0-5.852-2.62-5.852-5.852s2.62-5.852 5.852-5.852c1.4 0 2.68.49 3.69 1.302l3.12-3.12C18.9 3.102 15.772 2 12.24 2 6.584 2 2 6.584 2 12.24s4.584 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.695-.08-1.355-.22-1.955H12.24z"/>
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                disabled={authLoading}
                onClick={() => setAuthError("Facebook Sign-In requires configuration. Please sign up with Email.")}
                className="w-11 h-11 rounded-full bg-facebook flex items-center justify-center shadow-sm hover:opacity-90 transition active-scale text-white disabled:opacity-50"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </button>

              {/* Twitter */}
              <button
                type="button"
                disabled={authLoading}
                onClick={() => setAuthError("Twitter Sign-In requires configuration. Please sign up with Email.")}
                className="w-11 h-11 rounded-full bg-twitter flex items-center justify-center shadow-sm hover:opacity-90 transition active-scale text-white disabled:opacity-50"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>


            {/* Inputs Section */}
            <div className="space-y-3 pt-2">
              {isSignUp ? (
                <>
                  {/* Email */}
                  <div className="relative flex items-center bg-muted/30 border border-border rounded-none px-4 py-3 focus-within:border-[var(--brand-gold)] focus-within:ring-1 focus-within:ring-[var(--brand-gold)]/20 transition-all duration-200">
                    <Mail className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-transparent border-0 p-0 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* Username */}
                  <div className="relative flex items-center bg-muted/30 border border-[var(--brand-gold)]/80 dark:border-[var(--brand-gold)]/80 rounded-none px-4 py-3 focus-within:ring-1 focus-within:ring-[var(--brand-gold)]/20 transition-all duration-200">
                    <User className="w-4 h-4 text-[var(--brand-gold)] mr-3 shrink-0" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full bg-transparent border-0 p-0 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                    />
                    <span className="ml-2 shrink-0 w-4 h-4 rounded-full bg-brand-gold-light flex items-center justify-center">
                      <Check className="w-3 h-3 text-[var(--brand-gold)]" />
                    </span>
                  </div>

                  {/* Password */}
                  <div className="relative flex items-center bg-muted/30 border border-border rounded-none px-4 py-3 focus-within:border-[var(--brand-gold)] focus-within:ring-1 focus-within:ring-[var(--brand-gold)]/20 transition-all duration-200">
                    <Lock className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent border-0 p-0 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground ml-2 focus:outline-none shrink-0"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Username or Email */}
                  <div className="relative flex items-center bg-muted/30 border border-border rounded-none px-4 py-3 focus-within:border-[var(--brand-gold)] focus-within:ring-1 focus-within:ring-[var(--brand-gold)]/20 transition-all duration-200">
                    <User className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                    <input
                      type="text"
                      required
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      placeholder="Username or Email"
                      className="w-full bg-transparent border-0 p-0 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative flex items-center bg-muted/30 border border-border rounded-none px-4 py-3 focus-within:border-[var(--brand-gold)] focus-within:ring-1 focus-within:ring-[var(--brand-gold)]/20 transition-all duration-200">
                    <Lock className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent border-0 p-0 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="text-muted-foreground hover:text-foreground ml-2 focus:outline-none shrink-0"
                    >
                      {showLoginPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Remember Me switch */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground">
                Remember me next time
              </span>
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                  rememberMe ? 'bg-brand-gold' : 'bg-dot-inactive'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                    rememberMe ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action button & redirect link */}
          <div className="space-y-4 pt-4">
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white text-xs font-black uppercase tracking-widest rounded-none shadow-sm hover:shadow transition-all duration-200 active-scale flex items-center justify-center disabled:opacity-50"
            >
              {authLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </button>

            <div className="text-center">
              {isSignUp ? (
                <p className="text-[11px] text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-[var(--brand-gold)] font-bold hover:underline ml-1 focus:outline-none"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p className="text-[11px] text-muted-foreground">
                  Don't have account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-[var(--brand-gold)] font-bold hover:underline ml-1 focus:outline-none"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
