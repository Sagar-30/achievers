import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram,FaWhatsapp, FaMedal, FaCertificate, FaIdCard, FaBookOpen, FaTrophy, FaAward,FaArrowRight,FaBars,FaTimes} from 'react-icons/fa';
import { IoStar, IoArrowForward, IoHeart, IoShareSocial } from 'react-icons/io5';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import './App.css';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#') && target.origin === window.location.origin) {
        const id = target.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          setMobileMenuOpen(false);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Google Form handler
  const openGoogleForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfB2mAwJMuyqQzdmXLDhVhPteSbgM63d_1uDFQeHBcC3mMuXw/viewform?usp=sf_link", "_blank");
  };

  // Kit items data
  const kitItems = [
    { icon: <FaCertificate size={36} />, title: "Official Certificate", desc: "Embossed golden seal, personalized with your record details." },
    { icon: <FaBookOpen size={36} />, title: "Official Record Book", desc: "Your name printed in the annual commemorative edition." },
    { icon: <FaIdCard size={36} />, title: "Record Holder's ID Card", desc: "Premium membership card with global recognition." },
    { icon: <FaMedal size={36} />, title: "Achievers Medal", desc: "Gold-finish medallion with custom engraving." },
    { icon: <FaTrophy size={36} />, title: "Wooden Appreciation Trophy", desc: "Handcrafted oak trophy with golden plaque." }
  ];

  // Instagram showcase posts data
  const instaPosts = [
    { id: 1, img: "/BINDITA_SINHA.jpg", caption: "'PRERNA STAR AWARD' in the field of Content Marketer!", name: "@Ms. BINDITA SINHA", likes: "", comments: "" },
    { id: 2, img: "/Dixant_Soni.jpg", caption: "'PRERNA STAR AWARD' in the category of Social Service!", name: "@Mr. Dixant Soni", likes: "", comments: "" },
    { id: 3, img: "/Kanduri_Prameela.jpg", caption: "'PRERNA STAR AWARD' in the category of Literature!", name: "@Kanduri Prameela", likes: "", comments: "" },
    { id: 4, img: "/Shah_Huzaib.jpg", caption: "'PRERNA STAR AWARD' in the category of Sports!", name: "@Shah Huzaib", likes: "", comments: "" },
    { id: 5, img: "/Samarth_Nandagudi.jpg", caption: "'PRERNA STAR AWARD' in recognition of his multi-talented personality In writes stories and poems, clay modelling scientific experiments, drawing paper craft, origami paper art, best out of waste snowman!", name: "@Samarth Nandagudi", likes: "", comments: "" },
    { id: 6, img: "/Khushbu_Mehta.jpg", caption: "'PRERNA STAR AWARD' in recognition of her valuable contributions to the field of healthcare!", name: "@Dr. Khushbu Mehta", likes: "", comments: "" }
  ];

  // Steps data
  const steps = [
    { title: "Submit Your Record", desc: "Tell us your unique achievement with proof.", icon: "📝" },
    { title: "Expert Review", desc: "Our panel verifies authenticity & uniqueness.", icon: "🔍" },
    { title: "Official Recognition", desc: "Get certified, featured, and registered globally.", icon: "🏅" }
  ];

  // Nav items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Achievers Kit", href: "#kit" },
    { name: "Showcase", href: "#showcase" },
    { name: "Contact", href: "#contact" },
    { name: "Blogs", href: "/blog" }
  ];

  // Mobile carousel navigation
  const scrollCarousel = (direction) => {
    const container = document.querySelector('#insta-carousel-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* ========== STICKY NAVBAR WITH MOBILE MENU ========== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="navbar"
      >
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
            <FaAward className="logo-icon" />
            <span className="logo-text">
              ACHIEVERS<span className="gold-gradient"> RECORDS</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navItems.map(item => (
              <a key={item.name} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="desktop-apply-btn">
            <a href="#contact" className="apply-btn">
              Apply Now
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu"
            >
              <div className="mobile-menu-items">
                {navItems.map(item => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  className="mobile-apply-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ========== HERO / HOME SECTION ========== */}
      <section id="home" className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-blur-1"></div>
        <div className="hero-blur-2"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              <span className="gold-gradient">Achievers</span>
              <br className="mobile-break" />
              <span className="hero-title-white"> Book of Records</span>
            </h1>
            <p className="hero-tagline">
              “Recognizing Extraordinary Talent Worldwide”
            </p>
            <p className="hero-description">
              The official global platform honoring record-breakers, innovators, and exceptional humans.
              Your legacy starts here — get certified and immortalized in our legendary archive.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hero-buttons"
            >
              <a href="#contact" className="btn-primary">
                Register Your Record <IoArrowForward />
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-scroll-indicator">
          <a href="#about" className="scroll-arrow">⌵</a>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              <span className="gold-gradient">About the Legacy</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle"
            >
              What makes Achievers Book of Records the pinnacle of recognition?
            </motion.p>
          </div>
          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-content"
            >
              <p className="about-text">
                <span className="about-highlight">Achievers Book of Records</span> is the world's most prestigious recognition platform celebrating
                extraordinary feats, talents, and human spirit. From world-first attempts to unmatched skills — we document,
                certify, and immortalize legends.
              </p>
              <p className="about-text-secondary">
                Join thousands of global record holders who dared to dream beyond limits. Whether you're an athlete, artist,
                innovator, or unique talent — your moment of glory awaits.
              </p>
              <div className="steps-container">
                {steps.map((step, idx) => (
                  <div key={idx} className="step-item">
                    <div className="step-icon">{step.icon}</div>
                    <div>
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="about-image-container"
            >
              <div className="about-image-wrapper">
                <img
                  src="/Home_Poster.png"
                  alt="Achievers celebration"
                  className="about-image"
                />
              </div>
              <div className="about-badge">
                <span className="badge-text">✨ 5000+ Records Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ACHIEVERS KIT SECTION ========== */}
      <section id="kit" className="kit-section">
        <div className="section-container">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              <span className="gold-gradient">Achievers Exclusive Kit</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle"
            >
              Everything you receive upon official recognition
            </motion.p>
          </div>
          <div className="kit-grid">
            {kitItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="kit-card"
              >
                <div className="kit-icon">{item.icon}</div>
                <h3 className="kit-title">{item.title}</h3>
                <p className="kit-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INSTAGRAM SHOWCASE SECTION ========== */}
      <section id="showcase" className="showcase-section">
        <div className="section-container">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              <span className="gold-gradient">Instagram Showcase</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle"
            >
              Real Achievers. Real Glory. Follow their journey.
            </motion.p>
          </div>
          
          {/* Mobile: Horizontal Scroll Carousel */}
          <div className="mobile-carousel">
            <div 
              id="insta-carousel-container"
              className="carousel-container"
            >
              {instaPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="insta-card"
                >
                  <div className="insta-card-image">
                    <img src={post.img} alt={post.name} />
                    <div className="insta-overlay"></div>
                    <div className="insta-user">
                      <FaInstagram className="insta-icon" />
                      <span>{post.name}</span>
                    </div>
                    <div className="insta-stats">
                      <span><IoHeart /> {post.likes}</span>
                      <span><IoShareSocial /> {post.comments}</span>
                    </div>
                  </div>
                  <div className="insta-card-content">
                    <p className="insta-caption">✨ {post.caption}</p>
                    <div className="insta-rating">
                      {[...Array(5)].map((_, idx) => <IoStar key={idx} />)}
                      <span>record breaker</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="carousel-controls">
              <button onClick={() => scrollCarousel('left')} className="carousel-btn">
                <BiChevronLeft />
              </button>
              <button onClick={() => scrollCarousel('right')} className="carousel-btn">
                <BiChevronRight />
              </button>
            </div>
          </div>
          
          {/* Desktop: Grid Layout */}
          <div className="desktop-grid">
            {instaPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="insta-card-desktop"
              >
                <div className="insta-card-image-desktop">
                  <img src={post.img} alt={post.name} />
                  <div className="insta-overlay-desktop"></div>
                  <div className="insta-user-desktop">
                    <FaInstagram className="insta-icon" />
                    <span>{post.name}</span>
                  </div>
                  <div className="insta-stats-desktop">
                    <span><IoHeart /> {post.likes}</span>
                    <span><IoShareSocial /> {post.comments}</span>
                  </div>
                </div>
                <div className="insta-card-content-desktop">
                  <p className="insta-caption-desktop">✨ {post.caption}</p>
                  <div className="insta-rating-desktop">
                    {[...Array(5)].map((_, idx) => <IoStar key={idx} />)}
                    <span>verified record</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="instagram-follow">
            <a href="https://www.instagram.com/achieversbookofrecords" target="_blank" className="follow-link">
              Follow @achieversrecord <FaInstagram />
            </a>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-card">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="contact-title">Ready to be recognized?</h3>
              <p className="contact-text">
                Submit your extraordinary achievement and join the elite circle of world record holders.
                Our team reviews applications within 5-7 business days.
              </p>
              <button
                onClick={openGoogleForm}
                className="contact-btn"
              >
                Apply Now – Register Your Record <FaArrowRight />
              </button>
              <p className="contact-note">✨ Quick and easy registration. Show the world your legacy.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-social">
            <a href="https://www.instagram.com/achieversbookofrecords/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://wa.me/9671303016" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaWhatsapp /> 
            </a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Achievers Book of Records — Honoring extraordinary talent worldwide.
          </div>
          <div className="footer-badge">
            ⚡ Official Recognition Platform
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;