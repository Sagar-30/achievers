import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaHeart, 
  FaComment, 
  FaShare,
  FaSearch,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaRegClock
} from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io';
import { BiCategory } from 'react-icons/bi';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Breaking Barriers: Youngest Marathon Runner Sets New World Record",
      excerpt: "12-year-old Sarah Johnson becomes the youngest person to complete a full marathon, inspiring millions worldwide with her determination and spirit.",
      content: `
        <p>In an extraordinary display of determination and athletic prowess, 12-year-old Sarah Johnson from Oregon has made history by becoming the youngest person to complete a full marathon. The young athlete crossed the finish line at 3 hours and 45 minutes, breaking the previous record by an impressive margin.</p>
        
        <h2>The Journey to Greatness</h2>
        <p>Sarah began training at the age of 8, inspired by her father who is a marathon runner. "I always dreamed of running alongside my dad," Sarah shared in a post-race interview. "Today, I proved that age is just a number when you have passion and dedication."</p>
        
        <img src="https://images.unsplash.com/photo-1552674605-db6ff4df7182?w=800&auto=format" alt="Young marathon runner" />
        
        <h2>Overcoming Challenges</h2>
        <p>The journey wasn't easy. Sarah faced numerous challenges including injuries, balancing schoolwork with training, and doubts from critics. However, with unwavering support from her family and coaches, she persevered.</p>
        
        <p>"There were days I wanted to give up," Sarah admits. "But every time I thought about the finish line, I found the strength to keep going."</p>
        
        <h2>Official Recognition</h2>
        <p>The Achievers Book of Records has officially certified this incredible achievement, adding Sarah's name to the prestigious list of record holders. Her story serves as an inspiration to young athletes everywhere.</p>
        
        <blockquote>"Sarah's achievement reminds us that extraordinary talent knows no age. She has set a new benchmark for young athletes worldwide." - Achievers Book of Records Official Statement</blockquote>
        
        <p>Following her record-breaking run, Sarah plans to establish a foundation to help underprivileged children access sports facilities and training programs.</p>
      `,
      author: "Emma Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format",
      date: "March 15, 2026",
      readTime: "5 min read",
      category: "Sports",
      tags: ["Marathon", "Young Achiever", "World Record"],
      image: "https://images.unsplash.com/photo-1552674605-db6ff4df7182?w=600&auto=format",
      likes: 1247,
      comments: 89,
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: "Innovation Unleashed: 14-Year-Old Creates Revolutionary Water Purification System",
      excerpt: "Teenage inventor develops affordable solution to clean water crisis, earning global recognition and saving lives.",
      content: `
        <p>Meet Alex Chen, a 14-year-old inventor from California who has developed a groundbreaking water purification system that could help millions access clean drinking water. His invention, called "AquaPure," uses a unique combination of solar energy and nanotechnology to filter contaminated water.</p>
        
        <h2>A Solution Born from Empathy</h2>
        <p>Alex was inspired to create this solution after learning about the global water crisis in his science class. "I couldn't believe that millions of people don't have access to clean water," Alex explains. "I knew I had to do something about it."</p>
        
        <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format" alt="Water purification system" />
        
        <h2>How It Works</h2>
        <p>The AquaPure system uses solar panels to power a filtration process that removes 99.9% of contaminants. What makes it revolutionary is its low cost - approximately $50 per unit - and its ability to purify up to 500 liters of water daily.</p>
        
        <p>Initial testing in communities in Kenya and India has shown remarkable results, with a 95% reduction in waterborne diseases in pilot areas.</p>
        
        <h2>Global Impact</h2>
        <p>The invention has caught the attention of major humanitarian organizations and technology companies. Several NGOs have already placed orders for thousands of units to deploy in water-scarce regions.</p>
        
        <blockquote>"Alex's innovation demonstrates that age doesn't limit the ability to create meaningful change. His invention will save countless lives." - United Nations Water Initiative</blockquote>
        
        <p>Alex is now working on a larger version of the system for community use, with plans to make it open-source so that anyone can build and maintain their own unit.</p>
      `,
      author: "Michael Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format",
      date: "March 12, 2026",
      readTime: "6 min read",
      category: "Innovation",
      tags: ["Innovation", "Technology", "Social Impact"],
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format",
      likes: 2891,
      comments: 156,
      trending: true,
      featured: true
    },
    {
      id: 3,
      title: "Art Without Limits: Blind Artist Creates Stunning Masterpieces",
      excerpt: "Visually impaired painter uses unique techniques to create breathtaking artwork, redefining what's possible in the art world.",
      content: `
        <p>James Williams, a 45-year-old artist who lost his sight in a car accident a decade ago, has developed an extraordinary technique to continue creating art that has captivated the world.</p>
        
        <h2>A New Way of Seeing</h2>
        <p>James uses a combination of texture, depth perception, and specially designed tools to create paintings that are not only visually stunning but also tactile experiences. His fingers become his eyes, feeling every brushstroke and texture.</p>
        
        <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format" alt="Blind artist painting" />
        
        <h2>Breaking Barriers</h2>
        <p>His recent exhibition "Colors of the Soul" received critical acclaim and sold out within hours. Critics have praised his work for its emotional depth and unique perspective.</p>
        
        <p>"When I lost my sight, I thought my art was over," James shares. "But I realized that art isn't just about seeing - it's about feeling, experiencing, and expressing."</p>
        
        <h2>Teaching the Next Generation</h2>
        <p>James now runs workshops for other visually impaired individuals, teaching them his techniques and helping them discover their artistic potential.</p>
        
        <blockquote>"James's work reminds us that creativity knows no bounds. He has redefined what's possible in art." - National Art Gallery Curator</blockquote>
        
        <p>The Achievers Book of Records has recognized James's contribution to the art world, and his work is now part of permanent collections in several major museums.</p>
      `,
      author: "Sophia Chen",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format",
      date: "March 10, 2026",
      readTime: "4 min read",
      category: "Arts",
      tags: ["Art", "Inspiration", "Overcoming Adversity"],
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&auto=format",
      likes: 3421,
      comments: 234,
      trending: true,
      featured: false
    },
    {
      id: 4,
      title: "Young Scientist Discovers New Species in Amazon Rainforest",
      excerpt: "At just 16, Dr. Emily Watson's groundbreaking discovery adds a new species to the scientific community's knowledge.",
      content: `
        <p>Sixteen-year-old Emily Watson has made an incredible contribution to biology by discovering a new species of butterfly in the Amazon rainforest during a research expedition with her scientist parents.</p>
        
        <h2>A Lucky Discovery</h2>
        <p>What started as a family vacation turned into a scientific breakthrough when Emily noticed a butterfly with distinct markings that didn't match any known species in the research database.</p>
        
        <img src="https://images.unsplash.com/photo-1551011647-0a168891ea2a?w=800&auto=format" alt="New butterfly species" />
        
        <h2>Scientific Validation</h2>
        <p>After months of careful analysis and DNA testing, experts confirmed that Emily had indeed discovered a new species. The butterfly has been named Morpho emiliae in her honor.</p>
        
        <p>"This discovery is significant because it shows that there's still so much we don't know about our planet," says Dr. James Peterson, lead researcher at the Amazon Research Institute.</p>
        
        <h2>Future Aspirations</h2>
        <p>Emily plans to pursue a career in entomology and hopes to continue exploring the Amazon for more undiscovered species.</p>
        
        <blockquote>"Emily's discovery reminds us that science is for everyone, regardless of age. Her curiosity and dedication are inspiring." - National Geographic Society</blockquote>
        
        <p>The discovery has earned Emily a place in the Achievers Book of Records as the youngest person to discover a new species.</p>
      `,
      author: "David Kim",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format",
      date: "March 8, 2026",
      readTime: "5 min read",
      category: "Science",
      tags: ["Discovery", "Science", "Amazon"],
      image: "https://images.unsplash.com/photo-1551011647-0a168891ea2a?w=600&auto=format",
      likes: 1876,
      comments: 123,
      trending: false,
      featured: true
    },
    {
      id: 5,
      title: "Culinary Genius: 11-Year-Old Chef Opens Her Own Restaurant",
      excerpt: "Youngest executive chef in history proves that passion and talent can create success at any age.",
      content: `
        <p>At just 11 years old, Mia Rodriguez has become the youngest executive chef in history, opening her own restaurant "Mia's Table" in New York City to rave reviews.</p>
        
        <h2>A Natural Talent</h2>
        <p>Mia started cooking at age 5, helping her grandmother in the kitchen. By 8, she was already experimenting with her own recipes and hosting dinner parties for family and friends.</p>
        
        <img src="https://images.unsplash.com/photo-1556910104-5256802cd96e?w=800&auto=format" alt="Young chef" />
        
        <h2>Critical Acclaim</h2>
        <p>Her restaurant features a fusion of traditional Latin American flavors with modern techniques. Food critics have given her establishment 4.5 stars, praising her creativity and precision.</p>
        
        <p>"When I cook, I pour my heart into every dish," Mia explains. "I want people to feel the love in my food."</p>
        
        <h2>Inspiring Others</h2>
        <p>Mia also runs cooking classes for children, encouraging young people to explore their culinary passions. "Age shouldn't stop you from pursuing your dreams," she says.</p>
        
        <blockquote>"Mia's talent and maturity in the kitchen are beyond her years. She's a true culinary prodigy." - New York Times Food Critic</blockquote>
        
        <p>The Achievers Book of Records has recognized Mia as the youngest executive chef, and she continues to inspire young aspiring chefs worldwide.</p>
      `,
      author: "Olivia Martinez",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format",
      date: "March 5, 2026",
      readTime: "4 min read",
      category: "Lifestyle",
      tags: ["Culinary", "Young Achiever", "Entrepreneur"],
      image: "https://images.unsplash.com/photo-1556910104-5256802cd96e?w=600&auto=format",
      likes: 2345,
      comments: 178,
      trending: false,
      featured: false
    },
    {
      id: 6,
      title: "Tech Prodigy Creates App to Help Visually Impaired Navigate Cities",
      excerpt: "17-year-old developer's innovative solution is making cities more accessible for millions of visually impaired individuals.",
      content: `
        <p>High school student Kevin Zhang has developed an innovative mobile app called "CityGuide" that helps visually impaired individuals navigate urban environments with confidence.</p>
        
        <h2>The Inspiration</h2>
        <p>Kevin was inspired to create the app after watching his uncle, who is visually impaired, struggle to navigate the city. "I saw how challenging simple tasks like crossing the street or finding a building could be," Kevin recalls.</p>
        
        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format" alt="Mobile app accessibility" />
        
        <h2>How It Works</h2>
        <p>The app uses AI-powered object recognition, GPS navigation, and voice-guided instructions to help users identify obstacles, cross streets safely, and locate businesses and landmarks.</p>
        
        <p>It also features community-sourced information about accessibility features in different locations, such as ramps, audio signals at crosswalks, and braille signage.</p>
        
        <h2>Impact and Recognition</h2>
        <p>Since its launch, CityGuide has been downloaded over 500,000 times and has received recognition from accessibility organizations worldwide.</p>
        
        <blockquote>"Kevin's app is a game-changer for urban accessibility. It's empowering people to live more independently." - American Foundation for the Blind</blockquote>
        
        <p>The app is currently being integrated with city navigation systems in major metropolitan areas, and Kevin is working on expanding its features for people with other disabilities.</p>
      `,
      author: "Rachel Green",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format",
      date: "March 3, 2026",
      readTime: "5 min read",
      category: "Technology",
      tags: ["Tech", "Accessibility", "Innovation"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format",
      likes: 1567,
      comments: 98,
      trending: true,
      featured: false
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured posts (first 2 featured posts)
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);
  
  // Trending posts
  const trendingPosts = blogPosts.filter(post => post.trending).slice(0, 3);

  // Handle like functionality
  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle blog click
  const handleBlogClick = (post) => {
    setSelectedBlog(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close blog modal
  const closeBlog = () => {
    setSelectedBlog(null);
  };

  // Navigation between blogs
  const navigateBlog = (direction) => {
    const currentIndex = filteredPosts.findIndex(post => post.id === selectedBlog.id);
    if (direction === 'next' && currentIndex < filteredPosts.length - 1) {
      setSelectedBlog(filteredPosts[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedBlog(filteredPosts[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      {/* <section className="blog-hero">
        <div className="blog-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="blog-hero-title"
          >
            <span className="gold-gradient">Achievers</span> Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-hero-subtitle"
          >
            Stories of extraordinary achievements, inspiring journeys, and record-breaking moments
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="blog-hero-stats"
          >
            <div className="hero-stat">
              <FaBookOpen />
              <span>{blogPosts.length}+ Stories</span>
            </div>
            <div className="hero-stat">
              <FaHeart />
              <span>10K+ Reactions</span>
            </div>
            <div className="hero-stat">
              <IoMdTrendingUp />
              <span>Daily Updates</span>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Search and Filter Bar */}
      <div className="blog-controls">
        <div className="blog-controls-container">
          {/* Search */}
          <div className={`search-wrapper ${showSearch ? 'active' : ''}`}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search stories, achievements, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <FaTimes className="clear-search" onClick={() => setSearchTerm('')} />
            )}
          </div>

          {/* Categories */}
          <div className="categories-wrapper">
            <BiCategory className="category-icon" />
            <div className="categories-scroll">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {featuredPosts.length > 0 && !selectedBlog && (
        <section className="featured-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title-small">Featured Stories</h2>
              <p className="section-subtitle-small">Must-read achievements that inspire the world</p>
            </div>
            <div className="featured-grid">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="featured-card"
                  onClick={() => handleBlogClick(post)}
                >
                  <div className="featured-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="featured-overlay">
                      <span className="featured-badge">Featured</span>
                    </div>
                  </div>
                  <div className="featured-card-content">
                    <div className="post-category">{post.category}</div>
                    <h3 className="featured-title">{post.title}</h3>
                    <p className="featured-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <div className="meta-item">
                        <FaCalendarAlt />
                        <span>{post.date}</span>
                      </div>
                      <div className="meta-item">
                        <FaRegClock />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Blog Grid */}
      {!selectedBlog && (
        <section className="blog-grid-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title-small">Latest Stories</h2>
              <p className="section-subtitle-small">Discover the latest achievements and record-breaking moments</p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="no-results">
                <FaSearch className="no-results-icon" />
                <h3>No stories found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="blog-card"
                    onClick={() => handleBlogClick(post)}
                  >
                    <div className="blog-card-image">
                      <img src={post.image} alt={post.title} />
                      {post.trending && (
                        <div className="trending-badge">
                          <IoMdTrendingUp />
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="blog-card-content">
                      <div className="post-category">{post.category}</div>
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <div className="post-footer">
                        <div className="post-author">
                          <img src={post.authorAvatar} alt={post.author} className="author-avatar" />
                          <span>{post.author}</span>
                        </div>
                        <div className="post-stats">
                          <button className="stat-btn" onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}>
                            <FaHeart className={likedPosts[post.id] ? 'liked' : ''} />
                            <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
                          </button>
                          <div className="stat-btn">
                            <FaComment />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trending Sidebar (Desktop only) */}
      {!selectedBlog && (
        <aside className="trending-sidebar">
          <div className="trending-container">
            <div className="trending-header">
              <IoMdTrendingUp className="trending-icon" />
              <h3>Trending Now</h3>
            </div>
            <div className="trending-list">
              {trendingPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="trending-item"
                  onClick={() => handleBlogClick(post)}
                >
                  <div className="trending-rank">#{index + 1}</div>
                  <div className="trending-content">
                    <h4 className="trending-title">{post.title}</h4>
                    <div className="trending-meta">
                      <span>{post.date}</span>
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Blog Detail Modal/Page */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="blog-detail-overlay"
            onClick={closeBlog}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="blog-detail-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-detail" onClick={closeBlog}>
                <FaTimes />
              </button>
              
              <div className="blog-detail-content">
                <div className="blog-detail-header">
                  <div className="detail-category">{selectedBlog.category}</div>
                  <h1 className="detail-title">{selectedBlog.title}</h1>
                  <div className="detail-meta">
                    <div className="detail-author">
                      <img src={selectedBlog.authorAvatar} alt={selectedBlog.author} />
                      <div>
                        <span className="author-name">{selectedBlog.author}</span>
                        <span className="author-title">Contributor</span>
                      </div>
                    </div>
                    <div className="detail-stats">
                      <span><FaCalendarAlt /> {selectedBlog.date}</span>
                      <span><FaRegClock /> {selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-featured-image">
                  <img src={selectedBlog.image} alt={selectedBlog.title} />
                </div>

                <div className="detail-body" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />

                <div className="detail-tags">
                  <FaTag className="tag-icon" />
                  {selectedBlog.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>

                <div className="detail-actions">
                  <button 
                    className={`action-btn like-btn ${likedPosts[selectedBlog.id] ? 'active' : ''}`}
                    onClick={() => handleLike(selectedBlog.id)}
                  >
                    <FaHeart />
                    <span>{likedPosts[selectedBlog.id] ? selectedBlog.likes + 1 : selectedBlog.likes} Likes</span>
                  </button>
                  <button className="action-btn share-btn">
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>

                <div className="detail-navigation">
                  <button 
                    onClick={() => navigateBlog('prev')}
                    disabled={filteredPosts.findIndex(p => p.id === selectedBlog.id) === 0}
                    className="nav-btn"
                  >
                    <FaArrowLeft />
                    Previous Story
                  </button>
                  <button 
                    onClick={() => navigateBlog('next')}
                    disabled={filteredPosts.findIndex(p => p.id === selectedBlog.id) === filteredPosts.length - 1}
                    className="nav-btn"
                  >
                    Next Story
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;