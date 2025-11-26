import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Moodboard', to: '/moodboard' },
];

export default function HomePage() {
  const [showName, setShowName] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowName(false), 3400);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Looks crafted', value: '58', hint: 'Couture & RTW' },
      { label: 'Awards', value: '07', hint: 'Showcases & juries' },
      { label: 'Cities shown', value: '12', hint: 'Global pop-ups' },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-primary text-foreground overflow-hidden">
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://video.wixstatic.com/video/41c551_80f51a80c034482180df68512e142ad2/file" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Accent haze + grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-accentneongreen/20 blur-[120px]" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-accentpeach/20 blur-[110px]" />
      </div>

      {/* Top Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-5"
      >
        <div className="max-w-[120rem] mx-auto rounded-full glass px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="font-heading text-xl tracking-[0.3em] text-primary-foreground flex items-center gap-2 hover:text-accentneongreen transition"
          >
            <span className="relative flex items-center">
              <span className="absolute inset-0 blur-md bg-accentneongreen/30 rounded-full" />
              <span className="relative z-10">KL</span>
            </span>
            <span className="text-xs text-foreground/60 font-paragraph tracking-[0.2em] ml-2">
              STUDIO
            </span>
          </button>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className="font-paragraph text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-accentneongreen transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[120rem] mx-auto px-6 pt-32 pb-16 md:pb-24 lg:pb-28">
        {/* Name reveal */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-x-0 top-28 flex justify-center pointer-events-none"
            >
              <div className="glass px-8 py-4 rounded-full shadow-lg">
                <p className="font-paragraph text-sm tracking-[0.2em] text-accentneongreen">
                  KHUSHI LOHCHAB — FASHION DESIGNER
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-end mt-16">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/5 px-4 py-2 text-sm tracking-[0.18em] uppercase text-foreground/80">
              <Sparkles className="w-4 h-4 text-accentneongreen" />
              Couture · Futurism · Craft
            </div>

            <div className="space-y-6">
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-primary-foreground">
                Tactile stories
                <span className="block text-accentneongreen">built for light.</span>
              </h1>
              <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl leading-relaxed">
                Exploring silhouettes that hold movement, emotion, and bold craft. Seamless blends of
                couture discipline, sustainable material play, and an eye for cinematic presence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/projects')}
                className="relative overflow-hidden rounded-full px-6 py-3 font-paragraph tracking-[0.16em] text-sm uppercase text-primary shadow-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accentneongreen to-accentpeach opacity-90" />
                <span className="relative flex items-center gap-2">
                  View Projects
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/moodboard')}
                className="rounded-full border border-foreground/20 px-6 py-3 font-paragraph tracking-[0.14em] text-sm uppercase text-foreground/80 hover:text-accentneongreen hover:border-accentneongreen/70 transition"
              >
                Moodboard
              </motion.button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-black/30 px-5 py-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accentneongreen/10 opacity-60" />
                  <p className="font-paragraph text-xs uppercase tracking-[0.2em] text-foreground/60">
                    {item.label}
                  </p>
                  <div className="flex items-end gap-2 mt-3">
                    <p className="font-heading text-4xl text-primary-foreground">{item.value}</p>
                    <span className="font-paragraph text-[0.7rem] tracking-[0.15em] text-foreground/60 mb-1">
                      {item.hint}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-accentneongreen/12 via-transparent to-accentpeach/12 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-foreground/15 bg-black/60 backdrop-blur-xl shadow-2xl">
              <div className="aspect-[3/4]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="https://video.wixstatic.com/video/41c551_80f51a80c034482180df68512e142ad2/file" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="font-paragraph text-sm tracking-[0.12em] uppercase text-accentneongreen">
                  Capsule 2025 — Luxe Lookbook
                </p>
                <p className="font-paragraph text-base text-foreground/80 mt-2">
                  Sculpted silhouettes, liquid shine, and tailored armor for the modern muse.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={() => navigate('/projects')}
          whileHover={{ scale: 1.05 }}
          className="group relative overflow-hidden rounded-full px-8 py-4 flex items-center gap-3 border border-accentneongreen/50 bg-black/70 backdrop-blur-lg"
        >
          <span className="absolute inset-0 opacity-60 bg-gradient-to-r from-accentneongreen/20 via-transparent to-accentpeach/25" />
          <span className="relative font-paragraph text-sm tracking-[0.16em] text-foreground">
            Explore Projects
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <ChevronDown className="w-5 h-5 text-accentneongreen" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
