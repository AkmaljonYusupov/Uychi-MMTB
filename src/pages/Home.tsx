// pages/Home.tsx
import { useState, useEffect } from "react";
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaUser, 
  FaEye, 
  FaArrowRight,
  FaTag,
  FaBookOpen,
  FaGraduationCap,
  FaUsers,
  FaBuilding,
  FaAward,
  FaLightbulb
} from "react-icons/fa";
import "./Home.scss";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  views: number;
  image: string;
  isFeatured?: boolean;
}

function Home() {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setVisible(true);
  }, []);

  const categories = [
    "all",
    "Maktabgacha ta'lim",
    "Maktab ta'limi",
    "Tadbirlar",
    "Konferensiyalar",
    "Sport"
  ];

  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "Maktabgacha ta'lim muassasalarida yangi o'quv yili boshlanishi",
      description: "Tumanimizdagi barcha maktabgacha ta'lim muassasalarida 2024-2025 o'quv yili tantanali ravishda boshlandi. Yangi o'quv yilida 500 dan ortiq bolalar maktabgacha ta'limga qamrab olindi.",
      date: "2024-09-02",
      category: "Maktabgacha ta'lim",
      author: "Aliyev Alisher",
      views: 245,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
      isFeatured: true
    },
    {
      id: 2,
      title: "Maktab o'quvchilari uchun \"Zakovat\" intellektual o'yini",
      description: "Tuman maktablarida \"Zakovat\" intellektual o'yinining tuman bosqichi bo'lib o'tdi. Unda 20 dan ortiq jamoa ishtirok etdi va g'olib jamoalar viloyat bosqichiga yo'llanma oldi.",
      date: "2024-08-28",
      category: "Tadbirlar",
      author: "Karimova Dilbar",
      views: 189,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
    },
    {
      id: 3,
      title: "Ta'lim sifatini oshirish bo'yicha respublika konferensiyasi",
      description: "Maktabgacha va maktab ta'limi sifatini oshirish masalalariga bag'ishlangan respublika konferensiyasi tumanimizda bo'lib o'tdi. Konferensiyada 100 dan ortiq pedagoglar ishtirok etdi.",
      date: "2024-08-20",
      category: "Konferensiyalar",
      author: "Toshmatov Rustam",
      views: 312,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600"
    },
    {
      id: 4,
      title: "Maktab sport musobaqalarining navbatdagi bosqichi",
      description: "Tuman maktablari o'rtasida voleybol va basketbol bo'yicha musobaqalar boshlandi. Musobaqalarda 15 ta maktab jamoalari ishtirok etmoqda.",
      date: "2024-08-15",
      category: "Sport",
      author: "Raximov Jamshid",
      views: 156,
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600"
    },
    {
      id: 5,
      title: "Yangi o'quv yiliga tayyorgarlik ishlari yakunlandi",
      description: "Tuman maktablari va bog'chalari yangi o'quv yiliga to'liq tayyorlandi. Barcha ta'lim muassasalarida ta'mirlash va jihozlash ishlari yakunlandi.",
      date: "2024-08-10",
      category: "Maktab ta'limi",
      author: "Saidova Gulchehra",
      views: 178,
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600"
    },
    {
      id: 6,
      title: "Maktabgacha ta'lim xodimlari uchun malaka oshirish kurslari",
      description: "Tuman maktabgacha ta'lim muassasalari pedagoglari uchun malaka oshirish kurslari tashkil etildi. Kurslarda 50 dan ortiq pedagog qatnashmoqda.",
      date: "2024-08-05",
      category: "Maktabgacha ta'lim",
      author: "Axmedova Nodira",
      views: 134,
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600"
    },
    {
      id: 7,
      title: "Maktab o'quvchilari uchun yozgi ta'til lagerlari",
      description: "Tuman maktab o'quvchilari uchun yozgi ta'til lagerlari tashkil etildi. Lagerlarda bolalar turli to'garaklar va sport musobaqalarida qatnashmoqda.",
      date: "2024-07-25",
      category: "Tadbirlar",
      author: "Aliyev Alisher",
      views: 203,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
    },
    {
      id: 8,
      title: "Pedagoglar uchun yillik konferensiya",
      description: "Tuman pedagoglari uchun yillik konferensiya bo'lib o'tdi. Konferensiyada ta'limdagi yangi texnologiyalar va metodikalar muhokama qilindi.",
      date: "2024-07-20",
      category: "Konferensiyalar",
      author: "Karimova Dilbar",
      views: 267,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600"
    }
  ];

  const featuredNews = newsData.filter(news => news.isFeatured);
  const latestNews = [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredNews = latestNews.filter(news => {
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Maktabgacha ta'lim": "#3b82f6",
      "Maktab ta'limi": "#8b5cf6",
      "Tadbirlar": "#ef4444",
      "Konferensiyalar": "#f59e0b",
      "Sport": "#10b981"
    };
    return colors[category] || "#6b7280";
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      "Maktabgacha ta'lim": <FaGraduationCap />,
      "Maktab ta'limi": <FaBookOpen />,
      "Tadbirlar": <FaCalendarAlt />,
      "Konferensiyalar": <FaUsers />,
      "Sport": <FaAward />
    };
    return icons[category] || <FaTag />;
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
              Maktabgacha va maktab ta'limi <br />
              <span className="home__hero-highlight">Sifatli ta'lim - kelajak poydevori</span>
            </h1>
            <p className="home__hero-subtitle">
              Uychi tuman Maktabgacha va maktab ta'limi bo'limi rasmiy sayti. 
              Tuman ta'lim sohasidagi eng so'nggi yangiliklar va e'lonlar.
            </p>
            <div className="home__hero-stats">
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">15</span>
                <span className="home__hero-stat-label">Maktabgacha ta'lim</span>
              </div>
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">22</span>
                <span className="home__hero-stat-label">Maktablar</span>
              </div>
              <div className="home__hero-stat">
                <span className="home__hero-stat-number">5000+</span>
                <span className="home__hero-stat-label">O'quvchilar</span>
              </div>
            </div>
          </div>
          <div className="home__hero-image">
            <img 
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800" 
              alt="Ta'lim" 
              loading="lazy"
            />
            <div className="home__hero-image-overlay" />
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="home__featured">
            <div className="home__section-header">
              <h2 className="home__section-title">
                <FaLightbulb />
                Asosiy yangilik
              </h2>
            </div>
            <div className="home__featured-card">
              <div className="home__featured-image">
                <img src={featuredNews[0].image} alt={featuredNews[0].title} loading="lazy" />
                <div className="home__featured-badge">Asosiy</div>
              </div>
              <div className="home__featured-content">
                <div className="home__featured-meta">
                  <span className="home__featured-category" style={{ backgroundColor: getCategoryColor(featuredNews[0].category) }}>
                    {getCategoryIcon(featuredNews[0].category)}
                    {featuredNews[0].category}
                  </span>
                  <span className="home__featured-date">
                    <FaCalendarAlt />
                    {new Date(featuredNews[0].date).toLocaleDateString('uz-UZ', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="home__featured-title">{featuredNews[0].title}</h3>
                <p className="home__featured-description">{featuredNews[0].description}</p>
                <div className="home__featured-footer">
                  <span className="home__featured-author">
                    <FaUser />
                    {featuredNews[0].author}
                  </span>
                  <span className="home__featured-views">
                    <FaEye />
                    {featuredNews[0].views} ko'rish
                  </span>
                  <button className="home__featured-btn">
                    Batafsil <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Section */}
        <div className="home__news">
          <div className="home__section-header">
            <h2 className="home__section-title">
              <FaNewspaper />
              Yangiliklar
            </h2>
            <div className="home__section-actions">
              <div className="home__search">
                <input
                  type="text"
                  placeholder="Yangiliklarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="home__search-input"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="home__categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`home__category-btn ${selectedCategory === category ? "home__category-btn--active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "Barchasi" : category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="home__news-grid">
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <div key={news.id} className="home__news-card">
                  <div className="home__news-image">
                    <img src={news.image} alt={news.title} loading="lazy" />
                    <span className="home__news-category" style={{ backgroundColor: getCategoryColor(news.category) }}>
                      {getCategoryIcon(news.category)}
                      {news.category}
                    </span>
                  </div>
                  <div className="home__news-body">
                    <div className="home__news-meta">
                      <span className="home__news-date">
                        <FaCalendarAlt />
                        {new Date(news.date).toLocaleDateString('uz-UZ', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="home__news-views">
                        <FaEye />
                        {news.views}
                      </span>
                    </div>
                    <h3 className="home__news-title">{news.title}</h3>
                    <p className="home__news-description">{news.description}</p>
                    <div className="home__news-footer">
                      <span className="home__news-author">
                        <FaUser />
                        {news.author}
                      </span>
                      <button className="home__news-btn">
                        Batafsil <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="home__empty">
                <FaNewspaper />
                <p>Hech qanday yangilik topilmadi</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="home__stats">
          <div className="home__stats-grid">
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                <FaGraduationCap />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">15</h3>
                <p className="home__stat-label">Maktabgacha ta'lim</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                <FaBookOpen />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">22</h3>
                <p className="home__stat-label">Maktablar</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <FaUsers />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">5000+</h3>
                <p className="home__stat-label">O'quvchilar</p>
              </div>
            </div>
            <div className="home__stat-card">
              <div className="home__stat-icon" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                <FaAward />
              </div>
              <div className="home__stat-info">
                <h3 className="home__stat-number">50+</h3>
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