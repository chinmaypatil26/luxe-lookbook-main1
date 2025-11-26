import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Home } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

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
              className="font-paragraph text-base text-accentneongreen tracking-wider"
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
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl text-primary-foreground mb-8 tracking-wider"
          >
            About <span className="text-accentneongreen">Me</span>
          </motion.h1>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="px-8 pb-32">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Portrait Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-32 h-fit"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/41c551_3e3e6690b61c46c395ceb3287fea47ed~mv2.jpg"
                  alt="Khushi Lohchab - Fashion Designer"
                  className="w-full h-full object-cover"
                  width={900}
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-16"
            >
              {/* Philosophy */}
              <section>
                <h2 className="font-heading text-4xl text-accentneongreen mb-6 tracking-wider">
                  Design Philosophy
                </h2>
                <p className="font-paragraph text-lg text-primary-foreground/80 leading-relaxed tracking-wide">
                  My design philosophy centers on the intersection of innovation, sustainability, and timeless elegance. 
                  I believe fashion should tell a story—one that honors craftsmanship while pushing creative boundaries. 
                  Through experimental pattern-making, biomimicry, and a deep respect for traditional techniques, 
                  I create pieces that are both conceptually rich and wearable art.
                </p>
              </section>

              {/* Education */}
              <section>
                <h2 className="font-heading text-4xl text-accentneongreen mb-6 tracking-wider">
                  Education
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                      Bachelor of Design (Fashion Design)
                    </h3>
                    <p className="font-paragraph text-base text-primary-foreground/70 tracking-wide">
                      National Institute of Fashion Technology (NIFT)
                    </p>
                    <p className="font-paragraph text-sm text-accentneongreen tracking-widest mt-1">
                      2020 - 2024
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                      Advanced Pattern Making & Draping
                    </h3>
                    <p className="font-paragraph text-base text-primary-foreground/70 tracking-wide">
                      Specialized coursework in experimental construction techniques
                    </p>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="font-heading text-4xl text-accentneongreen mb-6 tracking-wider">
                  Skills & Expertise
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Pattern Making',
                    'Draping',
                    'Garment Construction',
                    'Zero Waste Design',
                    'Embroidery & Embellishment',
                    'Textile Innovation',
                    'CAD Design',
                    'Fashion Illustration',
                    'Sustainable Fashion',
                    'Couture Techniques',
                    'Creative Direction',
                    'Trend Forecasting',
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="bg-secondary/20 border border-accentneongreen/30 rounded-2xl px-4 py-3"
                    >
                      <p className="font-paragraph text-sm text-primary-foreground tracking-wide">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section>
                <h2 className="font-heading text-4xl text-accentneongreen mb-6 tracking-wider">
                  Experience
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                      Design Intern - Bhawna Rao Couture
                    </h3>
                    <p className="font-paragraph text-sm text-accentneongreen tracking-widest mb-3">
                      Summer 2023
                    </p>
                    <p className="font-paragraph text-base text-primary-foreground/70 leading-relaxed tracking-wide">
                      Worked on embroidery and crystal embellishment techniques for luxury bridal wear. 
                      Assisted in pattern development and quality control for couture collections.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                      Design Intern - Resha Weaves
                    </h3>
                    <p className="font-paragraph text-sm text-accentneongreen tracking-widest mb-3">
                      Winter 2023
                    </p>
                    <p className="font-paragraph text-base text-primary-foreground/70 leading-relaxed tracking-wide">
                      Collaborated on innovative weaving techniques and kinetic textile development. 
                      Contributed to the design and execution of contemporary saree collections.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-primary-foreground mb-2 tracking-wide">
                      Freelance Fashion Designer
                    </h3>
                    <p className="font-paragraph text-sm text-accentneongreen tracking-widest mb-3">
                      2022 - Present
                    </p>
                    <p className="font-paragraph text-base text-primary-foreground/70 leading-relaxed tracking-wide">
                      Independent design projects including womenswear collections, menswear, and experimental fashion pieces. 
                      Clients include Zivame and Raymond.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Info */}
              <section className="border-t border-accentneongreen/20 pt-8">
                <h2 className="font-heading text-4xl text-accentneongreen mb-6 tracking-wider">
                  Get In Touch
                </h2>
                <div className="space-y-3">
                  <p className="font-paragraph text-base text-primary-foreground/80 tracking-wide">
                    <span className="text-accentneongreen">Email:</span> Khushilohchab3@gmail.com
                  </p>
                  <p className="font-paragraph text-base text-primary-foreground/80 tracking-wide">
                    <span className="text-accentneongreen">Phone:</span> +91 9518845008
                  </p>
                  <p className="font-paragraph text-base text-primary-foreground/80 tracking-wide">
                    <span className="text-accentneongreen">Location:</span> New Delhi, India
                  </p>
                </div>
              </section>
            </motion.div>
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
