// pages/Home.tsx
import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Home.scss";
import newsData from "../data/yangiliklarData.json";
import leadershipData from "../data/leadershipData.json";
import homeData from "../data/homeData.json";

// Rasmlarni import qilish
import karimovAlisher from "../assets/rahbariyat/Nuriddin.jpg";
import tursunovBotir from "../assets/rahbariyat/Botir.jpg";

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

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  receptionDay: string;
  receptionTime: string;
  image: string;
  isVacant: boolean;
  order: number;
}

interface GovernmentSite {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
}

// Iconlarni olish funksiyasi
const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    FaBuilding: FaIcons.FaBuilding,
    FaNewspaper: FaIcons.FaNewspaper,
    FaTag: FaIcons.FaTag,
    FaUserTie: FaIcons.FaUserTie,
    FaArrowRight: FaIcons.FaArrowRight,
    FaSchool: FaIcons.FaSchool,
    FaCrown: FaIcons.FaCrown,
    FaRegNewspaper: FaIcons.FaRegNewspaper,
    FaRegHandshake: FaIcons.FaRegHandshake,
    FaRegComment: FaIcons.FaRegComment,
    FaRegBuilding: FaIcons.FaRegBuilding,
    FaLandmark: FaIcons.FaLandmark,
    FaDatabase: FaIcons.FaDatabase,
    FaBalanceScale: FaIcons.FaBalanceScale,
    FaGavel: FaIcons.FaGavel,
    FaMicroscope: FaIcons.FaMicroscope,
    FaHeart: FaIcons.FaHeart,
    FaChartBar: FaIcons.FaChartBar,
    FaTree: FaIcons.FaTree,
    FaChild: FaIcons.FaChild,
    FaUniversity: FaIcons.FaUniversity,
    FaUsers: FaIcons.FaUsers,
    FaChalkboardTeacher: FaIcons.FaChalkboardTeacher,
    FaCalendarAlt: FaIcons.FaCalendarAlt,
    FaUser: FaIcons.FaUser,
    FaEye: FaIcons.FaEye,
    FaChevronLeft: FaIcons.FaChevronLeft,
    FaChevronRight: FaIcons.FaChevronRight,
    FaPhone: FaIcons.FaPhone,
    FaEnvelope: FaIcons.FaEnvelope,
    FaClock: FaIcons.FaClock,
    FaQuoteLeft: FaIcons.FaQuoteLeft,
    FaExternalLinkAlt: FaIcons.FaExternalLinkAlt,
    FaGlobe: FaIcons.FaGlobe,
    FaHandsHelping: FaIcons.FaHandsHelping,
  };
  const Icon = iconMap[iconName];
  return Icon ? Icon : null;
};

// Icon komponenti
const IconComponent = ({ name }: { name: string }) => {
  const Icon = getIcon(name);
  return Icon ? <Icon /> : null;
};

function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [leadershipMembers, setLeadershipMembers] = useState<LeadershipMember[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  const [statValues, setStatValues] = useState({
    maktabgacha: 0,
    maktablar: 0,
    oquvchilar: 0,
    pedagoglar: 0
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const heroData = homeData.hero;
  const sliderData = homeData.slider;
  const leadershipDataConfig = homeData.leadership;
  const governmentData = homeData.government;
  const statsData = homeData.stats;

  const getImage = (imageName: string) => {
    const images: Record<string, string> = {
      "karimovAlisher": karimovAlisher,
      "tursunovBotir": tursunovBotir,
    };
    return images[imageName] || karimovAlisher;
  };

  const governmentSites = governmentData.sites.map((site: GovernmentSite) => ({
    ...site,
    icon: getIcon(site.icon)
  }));

  useEffect(() => {
    setVisible(true);
    setNewsItems(newsData.newsItems);
    
    const activeMembers = leadershipData.leadershipMembers
      .filter((member: LeadershipMember) => !member.isVacant)
      .map((member: LeadershipMember) => ({
        ...member,
        image: getImage(member.image)
      }));
    setLeadershipMembers(activeMembers);
  }, []);

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

  useEffect(() => {
    if (!isStatsVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      maktabgacha: statsData.items[0].value,
      maktablar: statsData.items[1].value,
      oquvchilar: statsData.items[2].value,
      pedagoglar: statsData.items[3].value
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
    }, sliderData.autoplayDelay || 4000);

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
              <IconComponent name={heroData.badge.icon} />
              {heroData.badge.text}
            </div>
            <h1 className="home__hero-title">
              <span className="home__hero-title-main">{heroData.title.main}</span>
              <span className="home__hero-highlight">{heroData.title.highlight}</span>
            </h1>
            <p className="home__hero-subtitle">{heroData.subtitle}</p>
            <div className="home__hero-stats">
              {heroData.stats.map((stat: any, index: number) => (
                <React.Fragment key={index}>
                  <div className="home__hero-stat">
                    <span className="home__hero-stat-number">
                      {stat.value === "newsCount" ? newsItems.length :
                       stat.value === "categoriesCount" ? categories.length :
                       stat.value === "leadershipCount" ? leadershipMembers.length :
                       stat.value}
                    </span>
                    <span className="home__hero-stat-label">
                      <IconComponent name={stat.icon} />
                      {stat.label}
                    </span>
                  </div>
                  {index < heroData.stats.length - 1 && (
                    <div className="home__hero-stat home__hero-stat--divider"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="home__hero-actions">
              {heroData.buttons.map((btn: any, index: number) => (
                <button 
                  key={index}
                  className={`home__hero-btn home__hero-btn--${btn.type}`}
                  onClick={() => navigate(btn.link)}
                >
                  {btn.text}
                  {btn.icon && <IconComponent name={btn.icon} />}
                </button>
              ))}
            </div>
          </div>
          <div className="home__hero-image">
            <img 
              src={heroData.image.src} 
              alt={heroData.image.alt} 
              loading="lazy"
            />
            <div className="home__hero-image-overlay">
              <div className="home__hero-image-badge">
                <IconComponent name={heroData.image.badge.icon} />
                <span>{heroData.image.badge.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yangiliklar Slider */}
        <div className="home__slider-wrapper">
          <div className="home__slider-header">
            <div className="home__slider-title-wrapper">
              <span className="home__slider-title-line"></span>
              <h2 className="home__slider-title" id="id_sy">{sliderData.title}</h2>
              <span className="home__slider-title-line"></span>
            </div>
            <p className="home__slider-subtitle">{sliderData.subtitle}</p>
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
                        <IconComponent name="FaArrowRight" />
                      </button>
                    </div>
                  </div>
                  <div className="home__slider-content">
                    <div className="home__slider-meta">
                      <span className="home__slider-date">
                        <IconComponent name="FaCalendarAlt" />
                        {formatDate(news.date)}
                      </span>
                      <span className="home__slider-views">
                        <IconComponent name="FaEye" />
                        {news.views}
                      </span>
                    </div>
                    <h3 className="home__slider-title">{news.title}</h3>
                    <p className="home__slider-excerpt">{news.excerpt}</p>
                    <div className="home__slider-footer">
                      <span className="home__slider-author">
                        <IconComponent name="FaUser" />
                        {news.author}
                      </span>
                      <button 
                        className="home__slider-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNews(news.id);
                        }}
                      >
                        Batafsil <IconComponent name="FaArrowRight" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalSlides > 1 && (
              <>
                <button className="home__slider-btn-prev" onClick={prevSlide} aria-label="Oldingi">
                  <IconComponent name="FaChevronLeft" />
                </button>
                <button className="home__slider-btn-next" onClick={nextSlide} aria-label="Keyingi">
                  <IconComponent name="FaChevronRight" />
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

        {/* Rahbariyat Section */}
        {leadershipMembers.length > 0 && (
          <div className="home__leadership">
            <div className="home__leadership-header">
              <div className="home__leadership-title-wrapper">
                <span className="home__leadership-title-line"></span>
                <h2 className="home__leadership-title">{leadershipDataConfig.title}</h2>
                <span className="home__leadership-title-line"></span>
              </div>
              <p className="home__leadership-subtitle">{leadershipDataConfig.subtitle}</p>
            </div>

            <div className="home__leadership-grid">
              {leadershipMembers.map((member) => (
                <div key={member.id} className="home__leadership-card">
                  <div className="home__leadership-card-badge">
                    <span>{member.order}</span>
                  </div>
                  
                  <div className="home__leadership-card-image">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />
                    <div className="home__leadership-card-image-overlay">
                      <button 
                        className="home__leadership-card-image-btn"
                        onClick={() => navigate(leadershipDataConfig.button.link)}
                      >
                        <IconComponent name="FaUserTie" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="home__leadership-card-content">
                    <h3 className="home__leadership-card-name">{member.name}</h3>
                    <p className="home__leadership-card-position">{member.position}</p>
                    
                    <div className="home__leadership-card-divider"></div>
                    
                    <div className="home__leadership-card-details">
                      <div className="home__leadership-detail-item">
                        <div className="home__leadership-detail-icon-wrapper">
                          <IconComponent name="FaClock" />
                        </div>
                        <div className="home__leadership-detail-text">
                          <span className="home__leadership-detail-label">
                            {leadershipDataConfig.detailLabels.reception}
                          </span>
                          <span className="home__leadership-detail-value">
                            <strong>{member.receptionDay}</strong> {member.receptionTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="home__leadership-detail-item">
                        <div className="home__leadership-detail-icon-wrapper">
                          <IconComponent name="FaPhone" />
                        </div>
                        <div className="home__leadership-detail-text">
                          <span className="home__leadership-detail-label">
                            {leadershipDataConfig.detailLabels.phone}
                          </span>
                          <a href={`tel:${member.phone}`} className="home__leadership-detail-value">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="home__leadership-detail-item">
                        <div className="home__leadership-detail-icon-wrapper">
                          <IconComponent name="FaEnvelope" />
                        </div>
                        <div className="home__leadership-detail-text">
                          <span className="home__leadership-detail-label">
                            {leadershipDataConfig.detailLabels.email}
                          </span>
                          <a href={`mailto:${member.email}`} className="home__leadership-detail-value">
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="home__leadership-card-btn"
                      onClick={() => navigate(leadershipDataConfig.button.link)}
                    >
                      {leadershipDataConfig.button.text} <IconComponent name={leadershipDataConfig.button.icon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hukumat Saytlari Section */}
        <div className="home__government">
          <div className="home__government-header">
            <div className="home__government-title-wrapper">
              <span className="home__government-title-line"></span>
              <h2 className="home__government-title">{governmentData.title}</h2>
              <span className="home__government-title-line"></span>
            </div>
            <p className="home__government-subtitle">{governmentData.subtitle}</p>
          </div>

          <div className="home__government-grid">
            {governmentSites.map((site: any) => (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="home__government-card"
                style={{ 
                  background: `linear-gradient(135deg, ${site.color}12, ${site.color}05)`,
                  borderColor: `${site.color}25`
                }}
              >
                <div className="home__government-card-bg" style={{ color: `${site.color}12` }}>
                  {site.icon ? <site.icon /> : null}
                </div>
                
                <div className="home__government-card-content">
                  <div className="home__government-card-icon" style={{ color: site.color, backgroundColor: `${site.color}15` }}>
                    {site.icon ? <site.icon /> : null}
                  </div>
                  <h3 className="home__government-card-name">{site.name}</h3>
                  <p className="home__government-card-description">{site.description}</p>
                  <div className="home__government-card-arrow" style={{ color: site.color }}>
                    <IconComponent name="FaExternalLinkAlt" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="home__stats" ref={statsRef}>
          <div className="home__stats-header">
            <div className="home__stats-title-wrapper">
              <span className="home__stats-title-line"></span>
              <h2 className="home__stats-title">{statsData.title}</h2>
              <span className="home__stats-title-line"></span>
            </div>
            <p className="home__stats-subtitle">{statsData.subtitle}</p>
          </div>
          <div className="home__stats-grid">
            {statsData.items.map((item: any, index: number) => (
              <div key={index} className="home__stat-card">
                <div className="home__stat-icon" style={{ background: item.color }}>
                  <IconComponent name={item.icon} />
                </div>
                <div className="home__stat-info">
                  <h3 className="home__stat-number">
                    <span className="stat-animate">
                      {formatNumber(
                        index === 0 ? statValues.maktabgacha :
                        index === 1 ? statValues.maktablar :
                        index === 2 ? statValues.oquvchilar :
                        statValues.pedagoglar
                      )}
                    </span>
                  </h3>
                  <p className="home__stat-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;