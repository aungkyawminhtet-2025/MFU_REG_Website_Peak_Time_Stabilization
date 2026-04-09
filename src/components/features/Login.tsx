import React from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import logo from '../../assets/logo.png';

interface LoginProps {
  handleLogin: (e: React.FormEvent) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export function Login({ handleLogin, showPassword, setShowPassword }: LoginProps) {
  return (
    <div className="min-h-screen flex flex-col bg-mfu-bg">
      <header className="h-16 bg-white border-b border-mfu-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="MFU" className="h-14" referrerPolicy="no-referrer" />
          <div className="h-10 w-[1px] bg-slate-200" />
          <div>
            <h1 className="text-xl font-bold text-mfu-text-main leading-none tracking-tight">PORTAL.MFU</h1>
            <p className="text-[10px] text-mfu-text-muted uppercase tracking-[0.2em] font-medium mt-1">Registrar System</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-mfu-red">
          <button className="hover:underline">EN</button>
          <span className="text-mfu-border">|</span>
          <button className="text-mfu-text-muted hover:underline">TH</button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white p-12 border border-mfu-border shadow-sm text-center"
        >
          <h2 className="text-4xl font-medium text-mfu-text-main mb-12">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Username" 
                className="mfu-input border-mfu-red/30 focus:border-mfu-red h-12"
                required
              />
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="mfu-input border-mfu-red/30 focus:border-mfu-red h-12 pr-12"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-mfu-text-muted hover:text-mfu-red transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className="text-right">
              <button type="button" className="text-sm text-mfu-red hover:underline">Forgot <span className="font-bold">Password?</span></button>
            </div>
            
            <button type="submit" className="w-40 mx-auto flex items-center justify-center gap-2 border border-mfu-red rounded-full py-2 text-mfu-red font-bold hover:bg-mfu-red hover:text-white transition-all">
              <ShieldCheck size={18} />
              MFU SSO
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
