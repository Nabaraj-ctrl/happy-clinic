import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Star, 
  CheckCircle, 
  Users, 
  Calendar, 
  Heart, 
  Activity, 
  FlaskConical, 
  Stethoscope, 
  Droplets,
  Facebook,
  Instagram,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle scroll for navbar shadow and animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const Logo = ({ className = "h-12" }: { className?: string }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-auto">
        <defs>
          <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a6b5a" />
            <stop offset="100%" stopColor="#2a9d8f" />
          </linearGradient>
        </defs>
        {/* Medical Cross */}
        <path d="M35 15h30v20h20v30h-20v20h-30v-20h-20v-30h20z" fill="url(#crossGradient)" />
        {/* Hands Abstract */}
        <path d="M50 40c-5-5-15-5-15 5s10 15 15 20c5-5 15-10 15-20s-10-10-15-5" fill="white" opacity="0.8" />
        {/* Heart */}
        <path d="M50 55c-2-2-6-2-6 2s4 6 6 8c2-2 6-4 6-8s-4-4-6-2" fill="#ef4444" />
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary leading-tight tracking-tight uppercase">Happy Health</span>
        <span className="text-[10px] font-bold text-accent tracking-[0.25em] uppercase border-t border-accent/20 pt-0.5">Skin · Hair · Laser</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* 1. TOP BAR */}
      <div className="bg-primary text-white py-2 px-4 md:px-8 hidden md:flex justify-between items-center text-xs font-medium border-b border-white/10">
        <div className="flex items-center gap-6">
          <a href="tel:9841329402" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone size={14} className="text-accent" /> 01-5913099 / 9860831099
          </a>
          <a href="mailto:happyhealthclinic@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={14} className="text-accent" /> happyhealthclinic@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-accent" /> Kathmandu 44600, Nepal
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="group">
            <Logo />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-primary font-medium text-sm hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-primary py-2.5 px-6 text-sm">
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-primary font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center w-full"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient"></div>
          {/* Subtle medical pattern background simulation */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-accent/20 text-accent font-bold px-4 py-1.5 rounded-full text-sm mb-6 inline-block backdrop-blur-sm border border-accent/30">
                Skin Care Specialists
              </span>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your Health, <br />
                <span className="text-accent underline decoration-white/20 underline-offset-8">Our Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
                Expert Skin Care & General Health Services in Kathmandu. Providing comprehensive dermatology and medical care with a 4.7★ trust rating.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a href="#contact" className="btn-primary text-lg px-10">
                  Book Appointment
                </a>
                <a href="#services" className="btn-outline text-lg px-10 flex items-center justify-center gap-2 group">
                  Our Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Floating Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white">
                  <div className="p-2 bg-accent rounded-lg"><Star fill="white" size={20} /></div>
                  <div>
                    <div className="font-bold text-lg">4.7★ Rating</div>
                    <div className="text-xs text-white/70">Google Business</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white">
                  <div className="p-2 bg-primary rounded-lg"><Users size={20} /></div>
                  <div>
                    <div className="font-bold text-lg">269+ Reviews</div>
                    <div className="text-xs text-white/70">Verified Patients</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-white">
                  <div className="p-2 bg-white/20 rounded-lg"><Clock size={20} /></div>
                  <div>
                    <div className="font-bold text-lg">Open 7 Days</div>
                    <div className="text-xs text-white/70">7:00 AM - 7:00 PM</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. QUICK INFO STRIP */}
      <section className="py-12 -mt-10 relative z-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500 flex flex-col justify-between">
            <div>
              <div className="text-red-500 font-bold mb-2 flex items-center gap-2">
                <Activity size={20} /> EMERGENCY CASES
              </div>
              <p className="text-gray-600 mb-4">Urgent medical attention needed? Call us directly for immediate assistance.</p>
            </div>
            <a href="tel:9841329402" className="text-primary font-bold text-xl hover:text-accent transition-colors">
              984-1329402
            </a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-primary flex flex-col justify-between">
            <div>
              <div className="text-primary font-bold mb-2 flex items-center gap-2">
                <Stethoscope size={20} /> PRIMARY CARE
              </div>
              <p className="text-gray-600 mb-4">Quality diagnostic services and specialized treatments for your skin and general health.</p>
            </div>
            <a href="#services" className="text-primary font-semibold flex items-center gap-1 hover:text-accent">
              See All Services <ChevronRight size={16} />
            </a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-accent flex flex-col justify-between">
            <div>
              <div className="text-accent font-bold mb-2 flex items-center gap-2">
                <Clock size={20} /> OPENING HOURS
              </div>
              <p className="text-gray-600 mb-2">Sunday – Saturday</p>
              <p className="text-primary font-bold text-xl">7:00 AM – 7:00 PM</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Open all week for your convenience.</p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="about" className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="section-tag">About Us</span>
            <h2 className="section-heading leading-tight">Choose The Best Care For Yourself</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Happy Health Clinic is a specialized skin care and general health clinic located in the heart of Kathmandu. We offer affordable, high-quality healthcare with experienced dermatologists and general physicians. 
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Our mission is to provide comprehensive skin care, diagnostics, and treatment in a comfortable and hygienic environment. We leverage modern technology with compassionate care to ensure the best outcomes for our patients.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "Experienced Skin & General Specialists",
                "Modern Diagnostic & Treatment Equipment",
                "Affordable Pricing for All Patients"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-accent"><CheckCircle size={20} fill="#e8a020" className="text-white" /></div>
                  <span className="font-semibold text-primary">{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="btn-primary">Learn More About Us</a>
          </div>
          
          <div className="relative reveal">
            <div className="aspect-video lg:aspect-square bg-bg-light rounded-3xl overflow-hidden relative border-8 border-white shadow-2xl">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" alt="Happy Health Clinic Interior" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              
              {/* Rating Card Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-[240px] hidden md:block">
                <div className="text-4xl font-bold text-primary mb-1">4.7★</div>
                <div className="text-accent flex gap-1 mb-2">
                  <Star key="s1" size={16} fill="currentColor" />
                  <Star key="s2" size={16} fill="currentColor" />
                  <Star key="s3" size={16} fill="currentColor" />
                  <Star key="s4" size={16} fill="currentColor" />
                  <Star key="s5" size={16} fill="currentColor" />
                </div>
                <p className="text-sm font-medium text-gray-600">269+ Happy Patients have trusted our expert care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section id="services" className="py-24 bg-bg-light px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16 reveal">
          <span className="section-tag">Our Services</span>
          <h2 className="section-heading">Comprehensive Health Services</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            From specialized dermatology to general consultations, we provide a wide range of healthcare services under one roof.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <Droplets size={32} />, 
              title: "Skin Care & Dermatology", 
              desc: "Expert treatment for acne, pigmentation, eczema, psoriasis, and cosmetic skin procedures." 
            },
            { 
              icon: <Stethoscope size={32} />, 
              title: "General Physician", 
              desc: "Routine checkups, diabetes management, thyroid care, and general health consultations." 
            },
            { 
              icon: <Users size={32} />, 
              title: "Pediatrics", 
              desc: "Specialized care for children, including vaccinations and growth monitoring." 
            },
            { 
              icon: <Heart size={32} />, 
              title: "Cardiology", 
              desc: "Heart health diagnostics, blood pressure management, and vascular care." 
            },
            { 
              icon: <FlaskConical size={32} />, 
              title: "Diagnostics & Lab", 
              desc: "Advanced pathology lab for blood tests, urine analysis, and accurate diagnostics." 
            },
            { 
              icon: <Activity size={32} />, 
              title: "Pharmacy", 
              desc: "Fully stocked in-house pharmacy with quality medicines. One of the best pharma counters in Kathmandu.",
              image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800"
            }
          ].map((service, index) => (
            <div key={index} className="card-shadow overflow-hidden reveal group">
              {service.image && (
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="p-8">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <a href="#contact" className="text-accent font-semibold flex items-center gap-1 group/link">
                  Learn More <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION */}
      <section className="bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Stats Column */}
          <div className="lg:w-2/5 bg-primary p-12 md:p-20 text-white flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-12 gap-x-8 reveal">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">4.7★</div>
                <div className="text-sm opacity-80 uppercase tracking-widest font-medium">Google Rating</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">269+</div>
                <div className="text-sm opacity-80 uppercase tracking-widest font-medium">Happy Reviews</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">7 Days</div>
                <div className="text-sm opacity-80 uppercase tracking-widest font-medium">Open Always</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm opacity-80 uppercase tracking-widest font-medium">Years Experience</div>
              </div>
            </div>
          </div>
          
          {/* Features Column */}
          <div className="lg:w-3/5 p-12 md:p-20 bg-bg-light">
            <div className="reveal">
              <span className="section-tag">Why Choose Us</span>
              <h2 className="section-heading">Trusted Medical Care In Kathmandu</h2>
              <div className="space-y-6 mt-10">
                {[
                  "Board-certified skin care specialists and physicians",
                  "Modern diagnostic equipment and hygienic facility",
                  "Most affordable consultation fees in the area",
                  "Friendly staff and warm, welcoming environment",
                  "Conveniently located with easy accessibility"
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-primary leading-tight">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DOCTORS SECTION */}
      <section id="doctors" className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16 reveal">
          <span className="section-tag">Meet Our Team</span>
          <h2 className="section-heading">Expert Doctors at Your Service</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our team consists of highly qualified and experienced professionals dedicated to your wellbeing.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { 
              image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', 
              name: 'Dr. Sandeep Kumar', 
              specialty: 'Dermatologist', 
              degree: 'MBBS, MD' 
            },
            { 
              image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400', 
              name: 'Dr. Reeta Jha', 
              specialty: 'General Physician', 
              degree: 'MBBS' 
            },
            { 
              image: 'https://images.unsplash.com/photo-1622253692010-33392da6031d?auto=format&fit=crop&q=80&w=400', 
              name: 'Dr. Ankit Thapa', 
              specialty: 'Skin & Aesthetic', 
              degree: 'MBBS, MD' 
            }
          ].map((doctor, index) => (
            <div key={index} className="card-shadow p-8 text-center reveal">
              <div className="w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary/10 shadow-lg">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-1">{doctor.name}</h3>
              <p className="text-accent font-semibold text-sm mb-4 uppercase tracking-wider">{doctor.specialty}</p>
              <p className="text-gray-500 mb-6">{doctor.degree} | NMC Reg.</p>
              <div className="flex justify-center gap-3">
                <a href="#contact" className="btn-primary py-2 px-6 text-sm">Book Appointment</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GOOGLE REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-primary text-white overflow-hidden relative px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16 reveal">
          <span className="text-accent font-bold uppercase tracking-widest text-sm block mb-2">Patient Reviews</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">4.7 ★ on Google — 269 Reviews</h2>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              name: "Niraj Shrestha", 
              text: "Best skin clinic in Kathmandu! I had severe acne problems and after just 3 sessions, my skin is much clearer. The doctor was very patient and explained everything clearly.",
              stars: 5
            },
            { 
              name: "Priyanka Sharma", 
              text: "Very professional staff and hygienic environment. I visited for my child's checkup and was very impressed with their pediatric care. Highly recommended for family health.",
              stars: 5
            },
            { 
              name: "Binod Tamang", 
              text: "Affordable and excellent service. The diagnostic reports were accurate and timely. Happy Health Clinic truly lives up to its name. Thank you for the care!",
              stars: 5
            }
          ].map((review, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 reveal">
              <div className="flex text-accent gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-white/80 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-xs text-white/50">Google Verified Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-accent p-8 rounded-2xl text-primary text-center reveal">
          <h3 className="text-2xl font-bold mb-4">Join 269+ satisfied patients — Book your appointment today!</h3>
          <a href="#contact" className="bg-primary text-white px-10 py-3 rounded-full font-bold hover:bg-primary-dark transition-all inline-block">
            Get Started Now
          </a>
        </div>
      </section>

      {/* 10. APPOINTMENT / CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 md:px-8 bg-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div className="reveal">
              <span className="section-tag">Contact Us</span>
              <h2 className="section-heading">Let's Get In Touch</h2>
              <p className="text-gray-600 mb-10 text-lg">
                We're here to provide the care you need. Contact us via phone, email, or visit our clinic in person.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                    <Phone size={24} />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-1">Visit Us</h4>
                    <p className="text-gray-600">Kathmandu 44600, Nepal</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-1">Open Hours</h4>
                    <p className="text-gray-600 font-medium">Sunday – Saturday: 7:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Placeholder for Map */}
              <div className="bg-gray-200 rounded-3xl h-64 w-full flex items-center justify-center relative overflow-hidden group border-4 border-white shadow-lg">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center opacity-50">
                  <MapPin size={48} className="text-gray-400" />
                </div>
                <div className="relative z-10 text-center">
                  <p className="text-gray-600 font-bold mb-4">Clinic Location in Kathmandu</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-accent transition-all">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="reveal">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-6">Book Your Appointment</h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" required placeholder="98XXXXXXXX" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service</label>
                    <select required className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Choose a specialized service</option>
                      <option value="skin">Skin Care & Dermatology</option>
                      <option value="physician">General Physician</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="lab">Lab Test</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" required className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                    <textarea rows={3} placeholder="Tell us more about your visit..." className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 text-lg font-bold">
                    Book My Appointment
                  </button>
                </form>

                {/* Success Message */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="flex-shrink-0" />
                      <div>
                        <div className="font-bold">Request Sent!</div>
                        <div className="text-sm">We'll contact you shortly to confirm your booking.</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-primary-dark text-white pt-24 pb-12 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Col 1: Branding */}
            <div className="lg:col-span-1">
              <a href="#home" className="flex items-center gap-2 mb-6">
                <div className="h-12 overflow-hidden bg-white/10 backdrop-blur-md rounded-lg p-2">
                  <Logo className="h-8" />
                </div>
              </a>
              <p className="text-white/60 mb-8 leading-relaxed">
                Expert skincare clinic in Kathmandu providing specialized dermatological and general medical care since 2015. Rated 4.7★ by our patients.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-accent after:rounded-full">Quick Links</h4>
              <ul className="space-y-4 text-white/70">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-accent flex items-center gap-2 group">
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-xl font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-accent after:rounded-full">Our Services</h4>
              <ul className="space-y-4 text-white/70">
                <li><a href="#services" className="hover:text-accent">Skin Care & Laser</a></li>
                <li><a href="#services" className="hover:text-accent">Dermatology Clinic</a></li>
                <li><a href="#services" className="hover:text-accent">General Physician</a></li>
                <li><a href="#services" className="hover:text-accent">Pediatric Care</a></li>
                <li><a href="#services" className="hover:text-accent">Lab & Pharmacy</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-1 after:bg-accent after:rounded-full">Get In Touch</h4>
              <div className="space-y-6 text-white/70">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-accent flex-shrink-0" />
                  <p>Kathmandu 44600, Nepal</p>
                </div>
                <div className="flex gap-4">
                  <Phone size={20} className="text-accent flex-shrink-0" />
                  <p>984-1329402</p>
                </div>
                <div className="flex gap-4">
                  <Mail size={20} className="text-accent flex-shrink-0" />
                  <p className="break-all">happyhealthclinic@gmail.com</p>
                </div>
                <div className="flex gap-4">
                  <Clock size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <p>Sun – Sat</p>
                    <p className="text-white font-bold">7:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} Happy Health Clinic. All Rights Reserved. | Kathmandu, Nepal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
