import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Projects, ProjectGalleryImages } from '@/entities';
import { Image } from '@/components/ui/image';
import { Home, Grid3x3 } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [galleryImages, setGalleryImages] = useState<ProjectGalleryImages[]>([]);
  const [similarProjects, setSimilarProjects] = useState<Projects[]>([]);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const projectData = await BaseCrudService.getById<Projects>('projects', id);
      setProject(projectData);

      // Fetch gallery images for this project
      const { items: allGalleryImages } = await BaseCrudService.getAll<ProjectGalleryImages>('projectgalleryimages');
      const projectGallery = allGalleryImages
        .filter(img => img.projectId === id)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setGalleryImages(projectGallery);

      // Fetch similar projects from the same stream
      if (projectData?.streamCategory) {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        const similar = items.filter(
          p => p.streamCategory === projectData.streamCategory && p._id !== id
        ).slice(0, 3);
        setSimilarProjects(similar);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-primary-foreground font-paragraph text-lg">Loading...</div>
      </div>
    );
  }

  const images = [
    project.detailImage1,
    project.detailImage2,
    project.detailImage3,
  ].filter(Boolean);

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
          </div>
        </div>
      </nav>

      {/* Cover Image for Raymond Project */}
      {project.projectName === 'Raymond Menswear Collection' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="px-8 pt-32 mb-24"
        >
          <div className="max-w-[120rem] mx-auto">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/41c551_4dfc3053f9c24fb3839dd1ab2bd7251b~mv2.jpeg"
                alt="Raymond Menswear Collection"
                className="w-full h-full object-cover"
                width={1600}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Cover Image for Bhawna Rao Project */}
      {project.projectName === 'Bhawna Rao' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="px-8 pt-32 mb-24"
        >
          <div className="max-w-[120rem] mx-auto">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <Image
                src="https://static.wixstatic.com/media/41c551_b6a709acaed54e44bfefd721ced2db69~mv2.jpeg"
                alt="Bhawna Rao"
                className="w-full h-full object-cover"
                width={1600}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className={project.projectName === 'Raymond Menswear Collection' || project.projectName === 'Bhawna Rao' ? 'pb-16 px-8' : 'pt-32 pb-16 px-8'}>
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-paragraph text-sm text-accentneongreen tracking-widest mb-4">
              {project.streamCategory} {project.projectYear && `• ${project.projectYear}`}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 tracking-wider">
              {project.projectName}
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/80 max-w-4xl leading-relaxed tracking-wide">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Image - Only show if no gallery images */}
      {project.thumbnailImage && galleryImages.length === 0 && project.projectName !== 'Raymond Menswear Collection' && project.projectName !== 'Bhawna Rao' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="px-8 mb-24"
        >
          <div className="max-w-[120rem] mx-auto">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <Image
                src={project.thumbnailImage}
                alt={project.projectName || 'Project'}
                className="w-full h-full object-cover"
                width={1600}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Full Description */}
      {project.fullDescription && (
        <div className="px-8 mb-32">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h2 className="font-heading text-3xl md:text-5xl text-accentneongreen mb-8 tracking-wider">
                Project Overview
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/80 leading-relaxed tracking-wide whitespace-pre-line">
                {project.fullDescription}
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Detail Images with Parallax - Only show if no gallery images */}
      {images.length > 0 && galleryImages.length === 0 && (
        <div className="px-8 mb-32">
          <div className="max-w-[120rem] mx-auto space-y-24">
            {images.map((image, index) => (
              <ParallaxImage
                key={index}
                src={image!}
                index={index}
                alt={`${project.projectName} detail ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid Section */}
      {galleryImages.length > 0 && (
        <div className="px-8 mb-32">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl md:text-5xl text-accentneongreen mb-4 tracking-wider">
                Gallery
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/60 tracking-wide">
                {galleryImages.length} images • Explore the details and craftsmanship
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((galleryImage, index) => (
                <motion.div
                  key={galleryImage._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 12) * 0.05 }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                >
                  {galleryImage.imageFile ? (
                    <>
                      <Image
                        src={galleryImage.imageFile}
                        alt={galleryImage.altText || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={600}
                      />
                      {galleryImage.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <p className="font-paragraph text-sm text-white tracking-wide">
                            {galleryImage.caption}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                      <p className="text-primary-foreground/40 font-paragraph text-sm">No image</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Similar Projects */}
      {similarProjects.length > 0 && (
        <div className="px-8 py-24 border-t border-accentneongreen/20">
          <div className="max-w-[120rem] mx-auto">
            <h2 className="font-heading text-4xl md:text-6xl text-accentneongreen mb-16 tracking-wider">
              Similar Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {similarProjects.map((similarProject) => (
                <motion.div
                  key={similarProject._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="cursor-pointer"
                  onClick={() => navigate(`/project/${similarProject._id}`)}
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                    {similarProject.thumbnailImage ? (
                      <Image
                        src={similarProject.thumbnailImage}
                        alt={similarProject.projectName || 'Project'}
                        className="w-full h-full object-cover"
                        width={600}
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                        <p className="text-primary-foreground/40 font-paragraph">Image Placeholder</p>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                    {similarProject.projectName}
                  </h3>
                  <p className="font-paragraph text-sm text-primary-foreground/60 tracking-wide">
                    {similarProject.projectYear}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Dynamic Dock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-4"
      >
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          className="bg-secondary/80 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-2 border border-accentneongreen/30 hover:border-accentneongreen transition-all"
        >
          <Home className="w-4 h-4 text-accentneongreen" />
          <span className="font-paragraph text-sm text-secondary-foreground tracking-wider">
            Home
          </span>
        </motion.button>
        <motion.button
          onClick={() => navigate('/projects')}
          whileHover={{ scale: 1.05 }}
          className="bg-secondary/80 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-2 border border-accentneongreen/30 hover:border-accentneongreen transition-all"
        >
          <Grid3x3 className="w-4 h-4 text-accentneongreen" />
          <span className="font-paragraph text-sm text-secondary-foreground tracking-wider">
            All Projects
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  index: number;
  alt: string;
}

function ParallaxImage({ src, index, alt }: ParallaxImageProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1 }}
      className={`relative ${isEven ? 'ml-0 mr-auto' : 'ml-auto mr-0'} ${
        isEven ? 'max-w-5xl' : 'max-w-4xl'
      }`}
    >
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          width={1200}
        />
      </div>
    </motion.div>
  );
}
