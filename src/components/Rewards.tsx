import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import contentData from '../data/contentData.json';

gsap.registerPlugin(ScrollTrigger);

type Reward = {
  id: string;
  name: string;
  image: string;
  type: string;
};

export default function Rewards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
          y: 56,
          opacity: 0,
          scale: 0.94,
          duration: 0.85,
          stagger: 0.14,
          ease: 'back.out(1.15)',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedReward && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.96, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedReward]);

  const handleRewardClick = (e: React.MouseEvent<HTMLDivElement>, reward: Reward) => {
    const card = e.currentTarget;

    const lightBeam = document.createElement('div');
    lightBeam.className = 'absolute top-0 left-0 h-[150%] w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 -skew-x-12 blur-sm z-30 pointer-events-none transform -translate-y-10';
    card.appendChild(lightBeam);

    gsap.fromTo(
      lightBeam,
      { x: -150 },
      {
        x: card.offsetWidth + 150,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          card.removeChild(lightBeam);
          setSelectedReward(reward);
        },
      }
    );
  };

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-zinc-950 px-6 py-12 md:px-10 md:py-24 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(168,85,247,0.35) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(34,211,238,0.18) 0%, transparent 20%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.1),rgba(9,9,11,0.8))]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            {contentData.hero.subtitle}
          </p>
          <h2
            ref={headerRef}
            className="text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl"
          >
            {contentData.rewards.title}
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {contentData.rewards.items.map((reward) => (
            <div
              key={reward.id}
              onClick={(e) => handleRewardClick(e, reward)}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_24px_80px_rgba(34,211,238,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none relative">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-900">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                  <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-zinc-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-md">
                    {reward.type}
                  </div>
                </div>

                <div className="text-center pb-2">
                  <h3 className="text-xl font-black uppercase tracking-[0.12em] text-white transition-colors group-hover:text-cyan-200 md:text-2xl">
                    {reward.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={() => setSelectedReward(null)} />
          <div
            ref={modalRef}
            className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl md:p-6"
          >
            <button
              onClick={() => setSelectedReward(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/35 p-2 text-white transition-colors hover:bg-black/60"
            >
              <X size={20} />
            </button>

            <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-[1.5rem]">
              <img src={selectedReward.image} alt={selectedReward.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-zinc-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-md">
                {selectedReward.type}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-black uppercase tracking-[0.12em] text-white md:text-3xl">
                {selectedReward.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">
                Thiết kế nổi bật với lớp phủ kính, ánh sáng neon và độ tương phản cao để phần thưởng trông sang hơn ngay từ cái nhìn đầu tiên.
              </p>
              <button className="mt-7 w-full rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:bg-cyan-300">
                Nhận Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
