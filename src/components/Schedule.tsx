import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import contentData from '../data/contentData.json';

type ScheduleEvent = {
  id: string;
  date: string;
  name: string;
  description: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

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

      const items = itemsRef.current?.children;
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
          },
          x: -48,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedEvent && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.96, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [selectedEvent]);

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement>, event: ScheduleEvent) => {
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
          setSelectedEvent(event);
        },
      }
    );
  };

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-zinc-950 px-6 py-12 md:px-10 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.05),rgba(9,9,11,0.78))]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
            {contentData.hero.subtitle}
          </p>
          <h2
            ref={headerRef}
            className="text-3xl font-black uppercase tracking-[0.12em] text-white md:text-5xl"
          >
            {contentData.schedule.title}
          </h2>
        </div>

        <div
          ref={itemsRef}
          className="relative flex flex-col gap-6 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-400/40 before:to-transparent md:gap-8 md:before:left-1/2 md:before:-translate-x-1/2"
        >
          {contentData.schedule.events.map((event, index) => (
            <div key={event.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse`}>
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-zinc-950 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)] md:order-1 md:h-14 md:w-14" />

              <div
                onClick={(e) => handleEventClick(e, event)}
                className="relative ml-4 w-[calc(100%-4rem)] cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900/55 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_24px_80px_rgba(34,211,238,0.1)] md:ml-0 md:w-[calc(50%-3rem)] md:p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_50%)] opacity-0 transition-opacity duration-300 hover:opacity-100" />
                <div className="pointer-events-none relative">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
                    {event.date}
                  </div>
                  <h3 className="mb-3 text-xl font-black uppercase tracking-[0.1em] text-white md:text-2xl">
                    {event.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={() => setSelectedEvent(null)} />
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-3xl md:p-10"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/35 p-2 text-white transition-colors hover:bg-black/60"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">{selectedEvent.date}</p>
              <h3 className="mt-4 text-3xl font-black uppercase tracking-[0.1em] text-white md:text-4xl">
                {selectedEvent.name}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-zinc-300 md:text-lg">
                {selectedEvent.description}
              </p>

              <div className="mt-8 flex justify-center">
                <button className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:bg-cyan-300">
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
