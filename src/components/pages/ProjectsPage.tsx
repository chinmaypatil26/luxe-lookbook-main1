import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';
import { Home, ArrowUpRight } from 'lucide-react';

const stats = [
  { label: 'Collections', value: '12' },
  { label: 'Runway shows', value: '9' },
  { label: 'Material experiments', value: '34' },
];

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
    <div className="relative min-h-screen bg-primary text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(62,255,184,0.12),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,204,179,0.12),transparent_28%)]" />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-[120rem] mx-auto rounded-full glass px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="font-heading text-xl tracking-[0.32em] text-primary-foreground hover:text-accentneongreen transition"
          >
            KL
          </button>
          <div className="flex gap-6">
            <NavBtn label="Projects" to="/projects" active />
            <NavBtn label="About" to="/about" />
            <NavBtn label="Contact" to="/contact" />
            <NavBtn label="Moodboard" to="/moodboard" />
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-14 px-6">
        <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row lg:items-end gap-10">
          <div className="space-y-6 max-w-4xl">
            <p className="font-paragraph text-xs uppercase tracking-[0.3em] text-foreground/60">
              Curated archive · 2019—Now
            </p>
            <h1 className="font-heading text-5xl md:text-7xl tracking-tight text-primary-foreground leading-[1.05]">
              Projects with a
              <span className="text-accentneongreen block">cinematic edge.</span>
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl leading-relaxed">
              Tailored silhouettes, engineered textiles, and dramatic lightplay. Each collection is
              crafted as an immersive story—built to be touched, worn, and remembered.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-foreground/10 bg-black/40 px-4 py-3 text-center"
              >
                <p className="font-heading text-3xl text-primary-foreground">{stat.value}</p>
                <p className="font-paragraph text-[0.72rem] uppercase tracking-[0.2em] text-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="px-6 pb-28">
        <div className="max-w-[120rem] mx-auto">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
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
        transition={{ delay: 0.3, duration: 0.7 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="group relative overflow-hidden rounded-full px-8 py-4 flex items-center gap-3 border border-accentneongreen/40 bg-black/70 backdrop-blur-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accentneongreen/15 to-accentpeach/15 opacity-70" />
          <Home className="w-5 h-5 text-accentneongreen relative" />
          <span className="font-paragraph text-sm text-secondary-foreground tracking-[0.14em] relative">
            Back Home
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
      className={`font-paragraph text-sm uppercase tracking-[0.16em] transition ${
        active ? 'text-accentneongreen' : 'text-foreground/75 hover:text-accentneongreen'
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
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-black/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="aspect-[4/5]">
          {project.thumbnailImage ? (
            <Image
              src={project.thumbnailImage}
              alt={project.projectName}
              className="w-full h-full object-cover"
              width={640}
              loading="lazy"
            />
          ) : (
            <Placeholder />
          )}
        </motion.div>

        <div className="absolute top-4 right-4 rounded-full border border-foreground/15 bg-black/50 px-4 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-accentneongreen">
          {project.projectYear || '—'}
        </div>

        <div className="p-6 space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-foreground/60">
            <span className="h-2 w-2 rounded-full bg-accentneongreen" />
            Editorial
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-2xl text-primary-foreground leading-tight group-hover:text-accentneongreen transition">
              {project.projectName}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-foreground/50 group-hover:text-accentneongreen transition" />
          </div>

          <p className="font-paragraph text-sm text-foreground/70 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
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
      <p className="font-heading text-3xl text-primary-foreground mb-4">No Projects Found</p>
      <p className="font-paragraph text-primary-foreground/60">
        Please check back later — new creative work is being added.
      </p>
    </div>
  );
}
