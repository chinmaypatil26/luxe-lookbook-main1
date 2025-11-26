import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [showName, setShowName] = useState(true);
  const navigate = useNavigate();

  // Auto-fade out the name popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowName(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectsClick = () => {
    navigate('/projects');
  };

  return (
    <div className="relative min-h-screen bg-primary overflow-hidden">
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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

      {/* Name Popup - Fades Out Automatically */}
      <AnimatePresence>
        {showName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ opacity: [1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.7, 1] }}
              className="text-center px-6"
            >
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-wider">
                KHUSHI LOHCHAB
              </h1>
              <p className="font-paragraph text-xl md:text-2xl text-accentneongreen tracking-widest mt-4">
                Fashion Designer
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-40 px-8 py-6"
      >
        <div className="max-w-[120rem] mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="font-heading text-2xl text-primary-foreground tracking-wider hover:text-accentneongreen transition-colors"
          >
            KL
          </button>
          <div className="flex gap-8">
            <button
              onClick={() => navigate('/projects')}
              className="font-paragraph text-base text-primary-foreground hover:text-accentneongreen transition-colors tracking-wider"
            >
              Projects
            </button>
            <button
              onClick={() => navigate('/about')}
              className="font-paragraph text-base text-primary-foreground hover:text-accentneongreen transition-colors tracking-wider"
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="font-paragraph text-base text-primary-foreground hover:text-accentneongreen transition-colors tracking-wider"
            >
              Contact
            </button>
            <button
              onClick={() => navigate('/moodboard')}
              className="font-paragraph text-base text-primary-foreground hover:text-accentneongreen transition-colors tracking-wider"
            >
              Moodboard
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Floating Dynamic Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={handleProjectsClick}
          whileHover={{ scale: 1.05, paddingLeft: '2rem', paddingRight: '2rem' }}
          className="group bg-secondary/80 backdrop-blur-lg rounded-full px-8 py-4 flex items-center gap-3 border border-accentneongreen/30 hover:border-accentneongreen transition-all"
        >
          <span className="font-paragraph text-sm text-secondary-foreground tracking-wider">
            Explore Projects
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-accentneongreen" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
