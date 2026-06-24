import React, { useState } from 'react';
import {
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa'; // FaImages o'chirildi
import './Galereya.scss';

// JSON fayldan ma'lumotlarni import qilish
import galereyaData from '../../data/galereyaData.json';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Galereya: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // JSON dan ma'lumotlarni olish
  const galleryItems: GalleryItem[] = galereyaData.galleryItems;

  // Pagination
  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = galleryItems.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedItem.id);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
    } else {
      newIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedItem(galleryItems[newIndex]);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="galereya">
      <div className="container">
        
        {/* HEADER */}
        <div className="header">
          <h1>
            <span className="highlight">Maktab</span> galereyasi
          </h1>
        </div>

        {/* GRID */}
        <div className="grid">
          {currentItems.map(item => (
            <div key={item.id} className="card">
              <div className="card-image" onClick={() => openModal(item)}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <button className="expand-btn">
                  <FaExpand />
                </button>
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
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
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <button className="modal-nav prev" onClick={() => navigateModal('prev')}>
                  <FaChevronLeft />
                </button>

                <img src={selectedItem.image} alt={selectedItem.title} loading="lazy" />

                <button className="modal-nav next" onClick={() => navigateModal('next')}>
                  <FaChevronRight />
                </button>
              </div>

              <div className="modal-info">
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galereya;