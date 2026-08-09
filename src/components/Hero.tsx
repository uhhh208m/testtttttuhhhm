import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, X } from 'lucide-react';
import contentData from '../data/contentData.json';

type Article = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, {
        scale: 1.08,
        duration: 2.8,
        ease: 'power2.out',
      });

      gsap.fromTo(
        titleRef.current,
        { y: 32, opacity: 0, scale: 0.98, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'expo.out',
          delay: 0.2,
        }
      );

      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            delay: 0.45,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedArticle && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.96, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedArticle]);

  const handleArticleClick = (e: React.MouseEvent<HTMLDivElement>, article: Article) => {
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
          setSelectedArticle(article);
        },
      }
    );
  };

  return (
    <section ref={heroRef} className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-zinc-950">
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img src={contentData.hero.backgroundImage} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_28%),linear-gradient(180deg,rgba(9,9,11,0.25),rgba(9,9,11,0.88)_55%,rgba(9,9,11,1))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)] bg-[length:220px_100%] opacity-20" />
      </div>

      <div className="absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-zinc-950 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-10 md:px-10 md:pt-16 lg:px-12">
        <div ref={titleRef} className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
            {contentData.hero.date}
          </div>

          <h1 className="text-4xl font-black uppercase tracking-[0.08em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] md:text-6xl lg:text-7xl">
            {contentData.hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {contentData.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300">
              {contentData.hero.ctaText}
              <ArrowRight size={16} />
            </button>
            <div className="rounded-full border border-white/10 bg-zinc-950/40 px-5 py-3 text-sm font-medium text-zinc-300 backdrop-blur-md">
              Giao diện tối giản, hiệu ứng cao cấp
            </div>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {contentData.articles?.map((article) => (
            <div
              key={article.id}
              onClick={(e) => handleArticleClick(e, article)}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/55 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_24px_80px_rgba(34,211,238,0.14)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative border-t border-white/10 p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300">
                    {article.date}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">Tin nổi bật</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white transition-colors group-hover:text-cyan-200">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 md:text-base">
                  {article.summary}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Xem chi tiết <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={() => setSelectedArticle(null)} />
          <div
            ref={modalRef}
            className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/75 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl md:grid-cols-[1.05fr_1fr]"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/35 p-2 text-white transition-colors hover:bg-black/60"
            >
              <X size={20} />
            </button>

            <div className="relative min-h-[280px] md:min-h-[520px]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="relative flex flex-col justify-center p-7 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
                {selectedArticle.date}
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase tracking-wide text-white md:text-5xl">
                {selectedArticle.title}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-zinc-300 md:text-lg">
                {selectedArticle.summary}
              </p>
              <button className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:bg-cyan-300">
                Xem Chi Tiết <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
