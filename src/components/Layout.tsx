import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogoClick = () => {
    if (isLogoAnimating) return;
    setIsLogoAnimating(true);
    setTimeout(() => {
      setIsLogoAnimating(false);
      setShowPopup(true);
    }, 1500);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
      isActive
        ? 'bg-white/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <header className="fixed left-3 right-3 top-3 z-50 mx-auto max-w-6xl rounded-[1.75rem] border border-white/10 bg-zinc-950/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:left-4 md:right-4">
        <div className="relative flex h-16 items-center justify-end px-4 py-3 md:h-20 md:px-6">
          <NavLink
            to="/"
            onClick={handleLogoClick}
            className={`absolute left-2 top-1/2 z-10 flex h-20 w-20 -translate-y-1/2 items-center justify-center md:left-3 md:h-28 md:w-28 transition-transform duration-500 ${
              isLogoAnimating ? 'scale-110' : ''
            }`}
            style={{ transformOrigin: 'center center' }}
          >
            <div className={`relative flex h-full w-full items-center justify-center transition-transform duration-500 ${isLogoAnimating ? '-translate-y-1' : ''}`}>
              <img
                src="/logo.png"
                alt="UHM Logo"
                className={`h-full w-full object-contain transition-all duration-500 ${
                  isLogoAnimating
                    ? 'drop-shadow-[0_0_24px_rgba(34,211,238,0.85)]'
                    : 'drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                }`}
              />
              <div className="logo-mask pointer-events-none absolute inset-0">
                <div
                  className={`absolute bottom-0 left-0 top-0 w-1/2 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/90 to-transparent ${
                    isLogoAnimating ? 'block animate-sweep-hover' : 'hidden'
                  }`}
                />
              </div>
            </div>
          </NavLink>

          <nav className="flex items-center gap-2 overflow-x-auto pl-24 md:gap-3 md:pl-36">
            <NavLink to="/" className={linkClass} end>
              Trang Chủ
            </NavLink>
            <NavLink to="/schedule" className={linkClass}>
              Lịch Trình
            </NavLink>
            <NavLink to="/rewards" className={linkClass}>
              Phần Thưởng
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-28 md:pt-32">
        <Outlet />
      </main>

      <Footer />

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 backdrop-blur-xl">
          <div className="w-full max-w-md rounded-[2rem] border border-cyan-400/20 bg-zinc-950/60 p-6 shadow-[0_20px_80px_rgba(34,211,238,0.18)] backdrop-blur-3xl md:p-8">
            <div className="mb-5 flex items-center justify-center gap-2 text-cyan-300">
              <span className="text-2xl">✨</span>
              <h3 className="text-xl font-bold tracking-[0.18em] uppercase md:text-2xl">Thông báo</h3>
            </div>
            <p className="mb-8 text-center text-sm leading-relaxed text-zinc-200 md:text-base">
              Logo tràn ra khỏi thanh menu là do mình cố tình làm vậy, đó là tính năng không phải lỗi nha! 😉
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full rounded-full border border-cyan-400/30 bg-cyan-400 px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
