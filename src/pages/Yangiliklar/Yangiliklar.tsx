import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaUser,
  FaEye,
  FaTag,
  FaTimes,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import './Yangiliklar.scss';

// JSON fayldan ma'lumotlarni import qilish - TO'G'RI YO'L
import yangiliklarData from '../../data/yangiliklarData.json';

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
}

const Yangiliklar: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // JSON dan ma'lumotlarni olish
  const newsItems: NewsItem[] = yangiliklarData.newsItems;

  // Pagination
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

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
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="yangiliklar">
      <div className="container">
        
        {/* HEADER */}
        <div className="header">
          <h1>
            <span className="highlight">So'nggi</span> yangiliklar
          </h1>
        </div>

        {/* GRID */}
        <div className="grid">
          {currentItems.map(item => (
            <div key={item.id} className="card" onClick={() => openModal(item)}>
              <div className="card-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-excerpt">{item.excerpt}</p>
                <div className="card-footer">
                  <div className="card-meta">
                    <span><FaCalendarAlt /> {item.date}</span>
                    <span><FaEye /> {item.views}</span>
                  </div>
                  <span className="card-read">
                    Batafsil <FaArrowRight />
                  </span>
                </div>
              </div>
            </div>
          ))}
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
            </div>

            <div className="modal-body">
              <div className="modal-meta">
                <span><FaCalendarAlt /> {selectedNews.date}</span>
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