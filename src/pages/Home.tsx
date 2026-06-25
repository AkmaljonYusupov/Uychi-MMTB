// pages/Home.tsx
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaEye, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaBuilding,
  FaTag,
  FaSchool,
  FaChalkboardTeacher,
  FaChild,
  FaUniversity,
  FaNewspaper
} from "react-icons/fa";
import "./Home.scss";
import newsData from "../data/yangiliklarData.json";

interface Category {
  name: string;
  label: string;
  icon: string;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  views: number;
  tags: string[];
  category: Category;
}

function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  // Stats animatsiya uchun state
  const [statValues, setStatValues] = useState({
    maktabgacha: 0,
    maktablar: 0,
    oquvchilar: 0,
    pedagoglar: 0
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
    setNewsItems(newsData.newsItems);
  }, []);

  // Stats animatsiya uchun Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Raqamlarni animatsiya qilish
  useEffect(() => {
    if (!isStatsVisible) return;

    const duration = 2000; // 2 sekund
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      maktabgacha: 15,
      maktablar: 22,
      oquvchilar: 5000,
      pedagoglar: 50
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStatValues({
        maktabgacha: Math.min(Math.round(targets.maktabgacha * progress), targets.maktabgacha),
        maktablar: Math.min(Math.round(targets.maktablar * progress), targets.maktablar),
        oquvchilar: Math.min(Math.round(targets.oquvchilar * progress), targets.oquvchilar),
        pedagoglar: Math.min(Math.round(targets.pedagoglar * progress), targets.pedagoglar)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStatValues({
          maktabgacha: targets.maktabgacha,
          maktablar: targets.maktablar,
          oquvchilar: targets.oquvchilar,
          pedagoglar: targets.pedagoglar
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isStatsVisible]);

  // Ekran o'lchamiga qarab slidesPerView ni o'zgartirish
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesPerView(1);
      } else if (width < 992) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedNews = [...newsItems].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categories = useMemo(() => {
    const categoryMap = new Map<string, Category>();
    newsItems.forEach(item => {
      const catName = item.category.name;
      if (!categoryMap.has(catName)) {
        categoryMap.set(catName, {
          name: item.category.name,
          label: item.category.label,
          icon: item.category.icon
        });
      }
    });
    return Array.from(categoryMap.values());
  }, [newsItems]);

  const totalSlides = Math.max(0, sortedNews.length - slidesPerView + 1);

  useEffect(() => {
    if (isHovered || sortedNews.length === 0 || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev >= totalSlides - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, totalSlides, sortedNews.length, slidesPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev >= totalSlides - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev <= 0 ? totalSlides - 1 : prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNews = (newsId: number) => {
    navigate(`/yangiliklar?news=${newsId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num >= 5000 ? '5000+' : num.toString();
    }
    return num.toString();
  };

  return (
    <div className={`home ${visible ? "home--visible" : ""}`}>
      <div className="home__container">
        {/* Hero Section */}
        <div className="home__hero">
          <div className="home__hero-content">
            <div className="home__hero-badge">
              <FaBuilding />
              Uychi tuman MMTB
            </div>
            <h1 className="home__hero-title">
              <span className="home__hero-title-main">Maktabgacha va maktab ta'limi</span>
              <span className="home__hero-highlight">Sifatli ta'lim - kelajak poydevori</span>
            </h1>
            <p className="home__hero-subtitle">
              Uychi tuman Maktabgacha va maktab ta'limi bo'limi rasmiy sayti. 
              Tuman ta'lim sohasidagi eng so'nggi yangiliklar va e'lonlar.
            </p>
            <div className="home__hero-stats">
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">{newsItems.length}</span>
                <span className="home__hero-stat-label">
                  <FaNewspaper className="home__hero-stat-icon" />
                  Yangiliklar
                </span>
              </div>
              <div className="home__hero-stat home__hero-stat--divider"></div>
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">{categories.length}</span>
                <span className="home__hero-stat-label">
                  <FaTag className="home__hero-stat-icon" />
                  Kategoriyalar
                </span>
              </div>
              <div className="home__hero-stat home__hero-stat--divider"></div>
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">5000+</span>
                <span className="home__hero-stat-label">
                  <FaUsers className="home__hero-stat-icon" />
                  O'quvchilar
                </span>
              </div>
            </div>
            <div className="home__hero-actions">
              <button 
                className="home__hero-btn home__hero-btn--primary"
                onClick={() => navigate('/yangiliklar')}
              >
                Yangiliklar <FaArrowRight />
              </button>
              <button 
                className="home__hero-btn home__hero-btn--secondary"
                onClick={() => navigate('/rahbariyat')}
              >
                Biz haqimizda
              </button>
            </div>
          </div>
          <div className="home__hero-image">
            <img 
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800" 
              alt="Ta'lim" 
              loading="lazy"
            />
            <div className="home__hero-image-overlay">
              <div className="home__hero-image-badge">
                <FaSchool />
                <span>15+ yil tajriba</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yangiliklar Slider */}
        <div className="home__slider-wrapper">
          <div className="home__slider-header">
            <div className="home__slider-title-wrapper">
              <span className="home__slider-title-line"></span>
              <h2 className="home__slider-title" id="id_sy">So'nggi yangiliklar</h2>
              <span className="home__slider-title-line"></span>
            </div>
            <p className="home__slider-subtitle">
              Uychi tumani Maktabgacha va maktab ta'limi bo'limi yangiliklari
            </p>
          </div>

          <div 
            className="home__slider-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="home__slider-track" 
              style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
            >
              {sortedNews.map((news) => (
                <div key={news.id} className="home__slider-card">
                  <div className="home__slider-image">
                    <img src={news.image} alt={news.title} loading="lazy" />
                    <div className="home__slider-category">
                      <span>{news.category.icon}</span>
                      {news.category.label}
                    </div>
                    <div className="home__slider-overlay">
                      <button 
                        className="home__slider-overlay-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNews(news.id);
                        }}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                  <div className="home__slider-content">
                    <div className="home__slider-meta">
                      <span className="home__slider-date">
                        <FaCalendarAlt />
                        {formatDate(news.date)}
                      </span>
                      <span className="home__slider-views">
                        <FaEye />
                        {news.views}
                      </span>
                    </div>
                    <h3 className="home__slider-title">{news.title}</h3>
                    <p className="home__slider-excerpt">{news.excerpt}</p>
                    <div className="home__slider-footer">
                      <span className="home__slider-author">
                        <FaUser />
                        {news.author}
                      </span>
                      <button 
                        className="home__slider-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNews(news.id);
                        }}
                      >
                        Batafsil <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalSlides > 1 && (
              <>
                <button className="home__slider-btn-prev" onClick={prevSlide} aria-label="Oldingi">
                  <FaChevronLeft />
                </button>
                <button className="home__slider-btn-next" onClick={nextSlide} aria-label="Keyingi">
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {totalSlides > 1 && (
            <div className="home__slider-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`home__slider-dot ${currentSlide === index ? "home__slider-dot--active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slayd ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats - Animatsiyali raqamlar */}
        <div className="home__stats" ref={statsRef}>
          <div className="home__stats-header">
            <h2 className="home__stats-title">
              <span className="home__stats-title-line"></span>
              <span>Raqamlarda biz</span>
              <span className="home__stats-title-line"></span>
            </h2>
            <p className="home__stats-subtitle">
              Uychi tuman MMTB faoliyati raqamlarda
            </p>
          </div>
          <div className="home__stats-grid">
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <FaChild />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">
                  <span className="stat-animate">{formatNumber(statValues.maktabgacha)}</span>
                </h3>
                <p className="home__stat-label">Maktabgacha ta'lim</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                <FaUniversity />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">
                  <span className="stat-animate">{formatNumber(statValues.maktablar)}</span>
                </h3>
                <p className="home__stat-label">Maktablar</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <FaUsers />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">
                  <span className="stat-animate">{formatNumber(statValues.oquvchilar)}</span>
                </h3>
                <p className="home__stat-label">O'quvchilar</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                <FaChalkboardTeacher />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">
                  <span className="stat-animate">{formatNumber(statValues.pedagoglar)}</span>
                </h3>
                <p className="home__stat-label">Pedagoglar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;