import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Moodboard } from '@/entities';
import { Image } from '@/components/ui/image';
import { Home, ExternalLink } from 'lucide-react';

export default function MoodboardPage() {
  const [moodboardItems, setMoodboardItems] = useState<Moodboard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoodboard = async () => {
      const { items } = await BaseCrudService.getAll<Moodboard>('moodboard');
      setMoodboardItems(items);
    };
    fetchMoodboard();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-primary/80 backdrop-blur-lg border-b border-accentneongreen/20">
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
              className="font-paragraph text-base text-accentneongreen tracking-wider"
            >
              Moodboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl text-primary-foreground mb-8 tracking-wider">
              Mood<span className="text-accentneongreen">board</span>
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/70 max-w-3xl tracking-wide">
              A curated collection of inspiration, textures, and visual references that fuel my creative process.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Moodboard Grid */}
      <div className="px-8 pb-32">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {moodboardItems.map((item, index) => (
              <MoodboardCard key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Dynamic Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="bg-secondary/80 backdrop-blur-lg rounded-full px-8 py-4 flex items-center gap-3 border border-accentneongreen/30 hover:border-accentneongreen transition-all"
        >
          <Home className="w-5 h-5 text-accentneongreen" />
          <span className="font-paragraph text-sm text-secondary-foreground tracking-wider">
            Home
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

interface MoodboardCardProps {
  item: Moodboard;
  index: number;
}

function MoodboardCard({ item, index }: MoodboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative aspect-square rounded-3xl overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title || 'Moodboard item'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={600}
          />
        ) : (
          <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
            <div className="text-center text-primary-foreground/40">
              <p className="text-sm font-paragraph">Image Placeholder</p>
              <p className="text-xs font-paragraph mt-1">600x600</p>
            </div>
          </div>
        )}

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent p-6 flex flex-col justify-end"
        >
          {item.title && (
            <h3 className="font-heading text-xl text-primary-foreground mb-2 tracking-wide">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="font-paragraph text-sm text-primary-foreground/80 mb-3 line-clamp-2 tracking-wide">
              {item.description}
            </p>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.split(',').map((tag, i) => (
                <span
                  key={i}
                  className="bg-accentneongreen/20 border border-accentneongreen/40 text-accentneongreen text-xs font-paragraph px-2 py-1 rounded-full tracking-wide"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accentneongreen hover:text-accentneongreen/80 transition-colors font-paragraph text-sm tracking-wide"
              onClick={(e) => e.stopPropagation()}
            >
              View Source
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
