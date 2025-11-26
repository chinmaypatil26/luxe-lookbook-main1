import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Home, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:Khushilohchab3@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;

    toast({
      title: 'Opening email client...',
      description: 'Your message will be sent via your default email application.',
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              className="font-paragraph text-base text-accentneongreen tracking-wider"
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

      {/* Header Image */}
      <div className="pt-24">
        <div className="relative h-[50vh] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-secondary/40 via-primary to-primary flex items-center justify-center">
            <div className="text-center text-primary-foreground/30">
              <p className="text-xl font-paragraph">Header Image Placeholder</p>
              <p className="text-sm font-paragraph mt-2">1920x600</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>
      </div>

      {/* Contact Content */}
      <div className="px-8 py-24">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="font-heading text-6xl md:text-8xl text-primary-foreground mb-8 tracking-wider">
              Let's <span className="text-accentneongreen">Connect</span>
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/70 max-w-3xl tracking-wide">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-paragraph text-sm text-accentneongreen mb-2 tracking-wider">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary/20 border-accentneongreen/30 text-primary-foreground focus:border-accentneongreen rounded-2xl h-12"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-paragraph text-sm text-accentneongreen mb-2 tracking-wider">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary/20 border-accentneongreen/30 text-primary-foreground focus:border-accentneongreen rounded-2xl h-12"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-sm text-accentneongreen mb-2 tracking-wider">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-secondary/20 border-accentneongreen/30 text-primary-foreground focus:border-accentneongreen rounded-2xl resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accentneongreen text-primary hover:bg-accentneongreen/90 h-12 rounded-full font-paragraph text-base tracking-wider"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-4xl text-accentneongreen mb-8 tracking-wider">
                  Contact Details
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 border border-accentneongreen/30 rounded-2xl p-3">
                      <Mail className="w-6 h-6 text-accentneongreen" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-primary-foreground/60 mb-1 tracking-wider">
                        Email
                      </p>
                      <a
                        href="mailto:Khushilohchab3@gmail.com"
                        className="font-paragraph text-lg text-primary-foreground hover:text-accentneongreen transition-colors tracking-wide"
                      >
                        Khushilohchab3@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 border border-accentneongreen/30 rounded-2xl p-3">
                      <Phone className="w-6 h-6 text-accentneongreen" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-primary-foreground/60 mb-1 tracking-wider">
                        Phone
                      </p>
                      <a
                        href="tel:+919518845008"
                        className="font-paragraph text-lg text-primary-foreground hover:text-accentneongreen transition-colors tracking-wide"
                      >
                        +91 9518845008
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 border border-accentneongreen/30 rounded-2xl p-3">
                      <MapPin className="w-6 h-6 text-accentneongreen" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-primary-foreground/60 mb-1 tracking-wider">
                        Location
                      </p>
                      <p className="font-paragraph text-lg text-primary-foreground tracking-wide">
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 border border-accentneongreen/30 rounded-2xl p-3">
                      <ExternalLink className="w-6 h-6 text-accentneongreen" />
                    </div>
                    <div>
                      <p className="font-paragraph text-sm text-primary-foreground/60 mb-1 tracking-wider">
                        Portfolio
                      </p>
                      <a
                        href="https://www.behance.net/khushilohchab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-paragraph text-lg text-primary-foreground hover:text-accentneongreen transition-colors tracking-wide inline-flex items-center gap-2"
                      >
                        Behance
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-accentneongreen/20 pt-8">
                <h3 className="font-heading text-2xl text-primary-foreground mb-4 tracking-wider">
                  Office Hours
                </h3>
                <p className="font-paragraph text-base text-primary-foreground/70 tracking-wide">
                  Monday - Friday: 10:00 AM - 6:00 PM IST
                </p>
                <p className="font-paragraph text-base text-primary-foreground/70 tracking-wide">
                  Weekend: By Appointment
                </p>
              </div>
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
