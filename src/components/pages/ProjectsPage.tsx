import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';
import { Home } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        setProjects(items || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-primary/80 backdrop-blur-xl border-b border-accentneongreen/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-[120rem] mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="font-heading text-2xl tracking-wider text-primary-foreground hover:text-accentneongreen transition"
          >
            KL
          </button>

          <div className="flex gap-8">
            <NavBtn label="Projects" to="/projects" active />
            <NavBtn label="About" to="/about" />
            <NavBtn label="Contact" to="/contact" />
            <NavBtn label="Moodboard" to="/moodboard" />
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-20 px-8">
        <div className="max-w-[120rem] mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl text-primary-foreground mb-8 tracking-wider">
            All <span className="text-accentneongreen">Projects</span>
          </h1>
          <p className="font-paragraph text-lg text-primary-foreground/70 max-w-3xl">
            Explore a curated selection of creative work—thoughtfully crafted with detail, style, and innovation.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-10 px-8 pb-32">
        <div className="max-w-[120rem] mx-auto">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="group bg-secondary/70 backdrop-blur-lg rounded-full px-8 py-4 flex items-center gap-3 border border-accentneongreen/30 hover:border-accentneongreen transition"
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

/* ---------------------- NAV BUTTON ---------------------- */

function NavBtn({ label, to, active = false }: { label: string; to: string; active?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`font-paragraph text-base tracking-wider transition ${
        active
          ? 'text-accentneongreen'
          : 'text-primary-foreground hover:text-accentneongreen'
      }`}
    >
      {label}
    </button>
  );
}

/* ---------------------- PROJECT CARD ---------------------- */

function ProjectCard({ project, navigate }: { project: Projects; navigate: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-secondary/20 shadow-md shadow-black/20"
      >
        {project.thumbnailImage ? (
          <Image
            src={project.thumbnailImage}
            alt={project.projectName}
            className="w-full h-full object-cover"
            width={600}
            loading="lazy"
          />
        ) : (
          <Placeholder />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
          <p className="font-paragraph text-sm text-accentneongreen tracking-wider">
            View Project →
          </p>
        </div>
      </motion.div>

      <div>
        <h3 className="font-heading text-2xl md:text-3xl text-primary-foreground mb-3 tracking-wide group-hover:text-accentneongreen transition">
          {project.projectName}
        </h3>

        <p className="font-paragraph text-sm text-primary-foreground/70 mb-4 line-clamp-2 tracking-wide">
          {project.shortDescription}
        </p>

        {project.projectYear && (
          <p className="font-paragraph text-xs text-accentneongreen tracking-widest">
            {project.projectYear}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------------- PLACEHOLDER ---------------------- */

function Placeholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-secondary/20">
      <p className="text-primary-foreground/40 font-paragraph">No Image</p>
    </div>
  );
}

/* ---------------------- EMPTY STATE ---------------------- */

function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="font-heading text-3xl text-primary-foreground mb-4">
        No Projects Found
      </p>
      <p className="font-paragraph text-primary-foreground/60">
        Please check back later — new creative work is being added.
      </p>
    </div>
  );
}
