import React, { useState } from 'react';
import contentData from '../data/contentData.json';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<{ title: string; content: string } | null>(null);
  const [showDevInfo, setShowDevInfo] = useState(false);

  return (
    <>
      <footer className="border-t border-white/10 bg-zinc-950/85 px-6 py-10 backdrop-blur-2xl md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div
            className="max-w-md cursor-pointer text-center text-sm font-medium leading-relaxed text-zinc-500 transition-colors duration-300 hover:text-cyan-300 md:text-left"
            onClick={() => setShowDevInfo(true)}
          >
            {contentData.footer.text}
          </div>

          <ul className="flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            {contentData.footer.links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveModal(link)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
              className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
              <h3 className="mb-4 pr-8 text-xl font-black uppercase tracking-[0.1em] text-cyan-300">
                {activeModal.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                {activeModal.content}
              </p>
            </motion.div>
          </motion.div>
        )}

        {showDevInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
              className="relative flex w-full max-w-lg flex-col items-center rounded-[2rem] border border-white/10 bg-zinc-950/80 p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
            >
              <button
                onClick={() => setShowDevInfo(false)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <span className="text-3xl font-black text-cyan-300">Dev</span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-[0.1em] text-white md:text-3xl">
                Thông Tin Website
              </h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                Phiên Bản 1.0.0
              </p>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                <p>
                  Một sản phẩm được thiết kế độc quyền với giao diện <span className="font-bold text-white">Glassmorphism</span> và <span className="font-bold text-white">Cyberpunk</span>.
                </p>
                <p>
                  Phát triển bởi lập trình viên <span className="font-bold text-cyan-300">uhhhm</span>. Mọi bản quyền hình ảnh, sự kiện và nội dung đều tuân thủ theo các quy định của ban tổ chức.
                </p>
              </div>

              <div className="mt-8 w-full border-t border-white/10 pt-6">
                <p className="text-xs font-medium text-zinc-500">© 2026 Bản quyền thuộc về uhhhm. All rights reserved.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
