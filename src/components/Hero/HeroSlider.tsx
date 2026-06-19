import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaSchool,
  FaAward,
  FaChalkboardTeacher,
  FaChild,
  FaArrowRight,
  FaStar,
  FaRegLightbulb,
  FaRocket,
  FaHeart
} from "react-icons/fa";
import { FiTarget, FiTrendingUp, FiClock } from "react-icons/fi";
import "./HeroSlider.scss";

interface Slide {
  id: number;
  title: string;
  tag: string;
  description: string;
  image: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Uychi tumani MMTB",
      tag: "Maktabgacha va maktab ta'limi",
      description: "45 ta maktab va 28 ta maktabgacha ta'lim muassasasida 15 000 dan ortiq o'quvchilar va 1 200 nafar pedagog xodimlar faoliyat yuritadi.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80",
      stats: [
        { label: "Maktablar", value: "45", icon: <FaSchool /> },
        { label: "MTM", value: "28", icon: <FaChild /> },
        { label: "O'quvchilar", value: "15K+", icon: <FaUsers /> },
        { label: "Pedagoglar", value: "1.2K", icon: <FaChalkboardTeacher /> },
      ],
    },
    {
      id: 2,
      title: "Zamonaviy ta'lim",
      tag: "Innovatsion texnologiyalar",
      description: "120 ta interaktiv darsxona, 15 ta kompyuter sinfi, 8 ta STEM laboratoriya va 32 ta zamonaviy kutubxona faoliyat ko'rsatmoqda.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80",
      stats: [
        { label: "Interaktiv", value: "120", icon: <FaSchool /> },
        { label: "Kompyuter", value: "15", icon: <FaBookOpen /> },
        { label: "STEM", value: "8", icon: <FaRegLightbulb /> },
        { label: "Kutubxona", value: "32", icon: <FaBookOpen /> },
      ],
    },
    {
      id: 3,
      title: "Pedagog kadrlar",
      tag: "Uzluksiz rivojlanish",
      description: "1 200 nafar pedagog xodimning 85 foizi oliy ma'lumotli, 60 foizi malaka oshirgan.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80",
      stats: [
        { label: "Oliy ma'lumotli", value: "85%", icon: <FaGraduationCap /> },
        { label: "Malaka oshirgan", value: "60%", icon: <FaAward /> },
        { label: "Innovatsion", value: "25", icon: <FaStar /> },
        { label: "Treninglar", value: "40+", icon: <FiClock /> },
      ],
    },
    {
      id: 4,
      title: "Maktabgacha ta'lim",
      tag: "Erta rivojlanish",
      description: "28 ta MTM da 3 500 dan ortiq bolalar sifatli tarbiya va erta rivojlanish dasturlari bilan qamrab olingan.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&q=80",
      stats: [
        { label: "MTM", value: "28", icon: <FaChild /> },
        { label: "Tarbiyalanuvchilar", value: "3.5K+", icon: <FaUsers /> },
        { label: "Tarbiyachilar", value: "280", icon: <FaChalkboardTeacher /> },
        { label: "Guruhlar", value: "140", icon: <FaHeart /> },
      ],
    },
    {
      id: 5,
      title: "O'quvchilar yutuqlari",
      tag: "Muvaffaqiyatlar",
      description: "O'tgan o'quv yilida tuman o'quvchilari viloyat va respublika olimpiadalarida 45 ta medal sohibi bo'ldi.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80",
      stats: [
        { label: "Medallar", value: "45", icon: <FaAward /> },
        { label: "1-o'rinlar", value: "15", icon: <FaStar /> },
        { label: "2-3-o'rinlar", value: "30", icon: <FiTrendingUp /> },
        { label: "Ishtirokchilar", value: "200+", icon: <FaUsers /> },
      ],
    },
    {
      id: 6,
      title: "Kelajak strategiyasi",
      tag: "2026-2030 rivojlanish",
      description: "10 ta yangi maktab qurish, 5 ta MTM ochish va pedagog kadrlar malakasini oshirish bo'yicha strategik dastur.",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1400&q=80",
      stats: [
        { label: "Yangi maktablar", value: "10", icon: <FaSchool /> },
        { label: "Yangi MTM", value: "5", icon: <FaChild /> },
        { label: "Raqamlashtirish", value: "100%", icon: <FaRocket /> },
        { label: "Maqsad yili", value: "2030", icon: <FiTarget /> },
      ],
    },
  ];

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const startAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
    
    setProgress(0);
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 0.5;
      });
    }, 35);

    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 7000);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setProgress(0);
    startAutoSlide();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-minimal">
      <div className="hero-minimal__slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-minimal__slide ${
              index === currentSlide ? "hero-minimal__slide--active" : ""
            }`}
          >
            <div 
              className="hero-minimal__bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className="hero-minimal__content">
              <div className="hero-minimal__container">
                <div className="hero-minimal__grid">
                  <div className="hero-minimal__left">
                    <span className="hero-minimal__tag">{slide.tag}</span>
                    
                    <h1 className="hero-minimal__title">
                      {slide.title.split(" ").map((word, i) => 
                        word === "MMTB" || word === "ta'lim" ? (
                          <span key={i}>{word} </span>
                        ) : (
                          word + " "
                        )
                      )}
                    </h1>
                    
                    <p className="hero-minimal__desc">{slide.description}</p>
                    
                    <div className="hero-minimal__actions">
                      <NavLink to="/aloqa" className="hero-minimal__btn hero-minimal__btn--primary">
                        <span>Bog'lanish</span>
                        <FaArrowRight />
                      </NavLink>
                      <NavLink to="/galereya" className="hero-minimal__btn hero-minimal__btn--ghost">
                        <span>Ko'proq</span>
                      </NavLink>
                    </div>
                  </div>

                  <div className="hero-minimal__right">
                    <div className="hero-minimal__stats">
                      {slide.stats.map((stat, i) => (
                        <div key={i} className="hero-minimal__stat">
                          <span className="hero-minimal__stat-icon">{stat.icon}</span>
                          <span className="hero-minimal__stat-value">{stat.value}</span>
                          <span className="hero-minimal__stat-label">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-minimal__controls">
        <button className="hero-minimal__arrow" onClick={prevSlide}>
          <FaChevronLeft />
        </button>

        <div className="hero-minimal__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-minimal__dot ${
                index === currentSlide ? "hero-minimal__dot--active" : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button className="hero-minimal__arrow" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>

      <div className="hero-minimal__progress">
        <div 
          className="hero-minimal__progress-bar"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;