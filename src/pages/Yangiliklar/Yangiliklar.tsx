import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUser,
  FaEye,
  FaTag,
  FaTimes,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaList,
} from 'react-icons/fa';
import './Yangiliklar.scss';

// JSON fayldan ma'lumotlarni import qilish
import yangiliklarData from '../../data/yangiliklarData.json';

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

const Yangiliklar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);

  // JSON dan ma'lumotlarni olish
  const newsItems: NewsItem[] = yangiliklarData.newsItems;

  // URL dan news parametrini olish
  useEffect(() => {
    const newsId = searchParams.get('news');
    if (newsId) {
      const id = parseInt(newsId);
      const news = newsItems.find(item => item.id === id);
      if (news) {
        // Yangilikni topib, modalni ochish
        setTimeout(() => {
          openModal(news);
        }, 300);
      }
    }
  }, [searchParams, newsItems]);

  // Kategoriyalarni yangiliklardan avtomatik yig'ish (unique)
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

  // Kategoriya va qidiruv bo'yicha filtrlash
  useEffect(() => {
    let filtered = newsItems;
    
    // Kategoriya bo'yicha filtrlash
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category.name === selectedCategory);
    }
    
    // Qidiruv bo'yicha filtrlash
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Sanasi bo'yicha saralash (eng yangisi birinchi)
    filtered = filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, newsItems]);

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Modal ochish
  const openModal = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Modal yopish
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    document.body.style.overflow = 'auto';
    // URL dan news parametrini olib tashlash
    const url = new URL(window.location.href);
    url.searchParams.delete('news');
    window.history.replaceState({}, '', url.toString());
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sanani formatlash
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  return (
    <section className="yangiliklar">
      <div className="container">
        
        {/* HEADER */}
        <div className="header">
          <h1>
            <span className="highlight">So'nggi</span> yangiliklar
          </h1>
          <p className="header-subtitle">
            Maktabimiz hayotidan eng so'nggi yangiliklar va voqealar
          </p>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <div className="filters-top">
            <div className="filters-categories">
              <button
                className={`filter-btn ${selectedCategory === "all" ? "filter-btn--active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                <FaList />
                Barchasi
                <span className="filter-count">{newsItems.length}</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`filter-btn ${selectedCategory === category.name ? "filter-btn--active" : ""}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  {category.label}
                  <span className="filter-count">
                    {newsItems.filter(item => item.category.name === category.name).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="filters-bottom">
            <div className="search-box">
              <input
                type="text"
                placeholder="Yangiliklarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="results-info">
              {filteredNews.length > 0 ? (
                <span>
                  <FaTag /> {filteredNews.length} ta yangilik topildi
                </span>
              ) : (
                <span>Hech qanday yangilik topilmadi</span>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid">
          {currentItems.length > 0 ? (
            currentItems.map(item => (
              <div key={item.id} className="card" onClick={() => openModal(item)}>
                <div className="card-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="card-category">
                    <span>{item.category.icon}</span>
                    {item.category.label}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-excerpt">{item.excerpt}</p>
                  <div className="card-footer">
                    <div className="card-meta">
                      <span><FaCalendarAlt /> {formatDate(item.date)}</span>
                      <span><FaEye /> {item.views}</span>
                    </div>
                    <span className="card-read">
                      Batafsil <FaArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FaTag className="empty-icon" />
              <h3>Hech qanday yangilik topilmadi</h3>
              <p>Boshqa kategoriyani tanlang yoki qidiruv so'zini o'zgartiring</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
              >
                Barchasini ko'rish
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedNews && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="modal-image">
              <img src={selectedNews.image} alt={selectedNews.title} />
              <div className="modal-category">
                <span>{selectedNews.category.icon}</span>
                {selectedNews.category.label}
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-meta">
                <span><FaCalendarAlt /> {formatDate(selectedNews.date)}</span>
                <span><FaUser /> {selectedNews.author}</span>
                <span><FaEye /> {selectedNews.views}</span>
              </div>

              <h2>{selectedNews.title}</h2>

              <div className="modal-content">
                {selectedNews.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="modal-tags">
                <FaTag />
                {selectedNews.tags.map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Yangiliklar;