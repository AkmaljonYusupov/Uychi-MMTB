// pages/Aloqa.tsx
import { useEffect, useRef, useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaTelegram, 
  FaInstagram, 
  FaFacebook,
  FaYoutube,
  FaArrowRight,
  FaUser,
  FaComment,
  FaBuilding,
  FaGlobe,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import "./Aloqa.scss";

function Aloqa() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Ismingizni kiriting";
    } else if (formData.name.length < 2) {
      errors.name = "Ism 2 harfdan kam bo'lmasligi kerak";
    }

    if (!formData.email.trim()) {
      errors.email = "Email manzilini kiriting";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "To'g'ri email manzilini kiriting";
    }

    if (!formData.subject) {
      errors.subject = "Mavzuni tanlang";
    }

    if (!formData.message.trim()) {
      errors.message = "Xabar matnini kiriting";
    } else if (formData.message.length < 10) {
      errors.message = "Xabar kamida 10 harf bo'lishi kerak";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Telefon raqam",
      details: ["+998 71 234 56 78"],
      link: "tel:+998712345678",
      color: "#3b82f6",
      action: "Qo'ng'iroq qilish"
    },
    {
      icon: <FaEnvelope />,
      title: "Elektron pochta",
      details: ["info@uychi-mmtb.uz", "support@uychi-mmtb.uz"],
      link: "mailto:info@uychi-mmtb.uz",
      color: "#8b5cf6",
      action: "Xabar yozish"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Manzil",
      details: ["Uychi tumani, Markaziy ko'cha 1", "Namangan viloyati, O'zbekiston"],
      link: "https://maps.google.com",
      color: "#ef4444",
      action: "Xaritada ko'rish"
    },
    {
      icon: <FaClock />,
      title: "Ish vaqti",
      details: ["Dushanba - Juma: 08:00 - 18:00", "Shanba: 09:00 - 14:00"],
      link: "#",
      color: "#f59e0b",
      action: ""
    }
  ];

  const socialLinks = [
    { icon: <FaTelegram />, name: "Telegram", url: "https://t.me/uychi_mmtb", color: "#0088cc" },
    { icon: <FaInstagram />, name: "Instagram", url: "https://instagram.com/uychi_mmtb", color: "#e4405f" },
    { icon: <FaFacebook />, name: "Facebook", url: "https://facebook.com/uychi_mmtb", color: "#1877f2" },
    { icon: <FaYoutube />, name: "YouTube", url: "https://youtube.com/uychi_mmtb", color: "#ff0000" }
  ];

  const quickLinks = [
    { label: "Rahbariyat", path: "/rahbariyat" },
    { label: "Yangiliklar", path: "/yangiliklar" },
    { label: "Galereya", path: "/galereya" },
    { label: "Hujjatlar", path: "/hujjatlar" }
  ];

  return (
    <section ref={sectionRef} className={`aloqa ${visible ? "aloqa--visible" : ""}`}>
      <div className="aloqa__container">
        {/* Header */}
        <div className="aloqa__header">
          <div className="aloqa__badge">
            <FaGlobe />
            Biz bilan bog'laning
          </div>
          <h1 className="aloqa__title">
            Aloqa <span className="aloqa__title-highlight">Markazi</span>
          </h1>
          <p className="aloqa__subtitle">
            Savollaringiz, takliflaringiz va murojaatlaringiz uchun biz bilan bog'lanishning 
            barcha imkoniyatlari
          </p>
        </div>

        {/* Asosiy kontent */}
        <div className="aloqa__grid">
          {/* Chap tomon - Kontakt ma'lumotlari */}
          <div className="aloqa__info">
            <div className="aloqa__info-header">
              <h2 className="aloqa__info-title">Biz bilan bog'lanish</h2>
              <p className="aloqa__info-text">
                Sizni qiziqtirgan barcha savollar bo'yicha biz bilan bog'lanishingiz mumkin.
                Mutaxassislarimiz sizga tezda javob berishadi.
              </p>
            </div>

            <div className="aloqa__info-cards">
              {contactInfo.map((item, index) => (
                <div key={index} className="aloqa__info-card">
                  <div className="aloqa__info-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="aloqa__info-content">
                    <h3>{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                    {item.action && item.link && item.link !== "#" && (
                      <a href={item.link} className="aloqa__info-link" target="_blank" rel="noopener noreferrer">
                        {item.action} <FaArrowRight />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tezkor havolalar */}
            <div className="aloqa__quick-links">
              <h3>Tezkor havolalar</h3>
              <div className="aloqa__quick-links-grid">
                {quickLinks.map((link, index) => (
                  <a key={index} href={link.path} className="aloqa__quick-link">
                    {link.label}
                    <FaArrowRight />
                  </a>
                ))}
              </div>
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="aloqa__social">
              <h3>Ijtimoiy tarmoqlarda</h3>
              <div className="aloqa__social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aloqa__social-link"
                    style={{ 
                      borderColor: `${social.color}33`,
                      color: social.color 
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Tashkilot ma'lumoti */}
            <div className="aloqa__organization">
              <div className="aloqa__organization-icon">
                <FaBuilding />
              </div>
              <div className="aloqa__organization-info">
                <h4>Maktabgacha va maktab ta'limi bo'limi</h4>
                <p>Uychi tuman hokimligi binosi</p>
                <p className="aloqa__organization-detail">© 2024 Barcha huquqlar himoyalangan</p>
              </div>
            </div>
          </div>

          {/* O'ng tomon - Murojaat formasi */}
          <div className="aloqa__form-wrapper">
            <div className="aloqa__form-card">
              <div className="aloqa__form-header">
                <h2 className="aloqa__form-title">Murojaat yuborish</h2>
                <p className="aloqa__form-text">
                  Quyidagi formani to'ldiring va biz sizga tez orada javob qaytaramiz
                </p>
              </div>

              {isSubmitted ? (
                <div className="aloqa__success">
                  <div className="aloqa__success-icon">
                    <FaCheckCircle />
                  </div>
                  <h3>Murojaatingiz qabul qilindi!</h3>
                  <p>Tez orada siz bilan bog'lanamiz. E'tiboringiz uchun rahmat.</p>
                  <button 
                    className="aloqa__success-btn"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Yana murojaat yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="aloqa__form" noValidate>
                  <div className="aloqa__form-group">
                    <label htmlFor="name">
                      <FaUser /> Ismingiz <span className="aloqa__required">*</span>
                    </label>
                    <div className={`aloqa__input-wrapper ${focusedField === "name" ? "aloqa__input-wrapper--focused" : ""} ${formErrors.name ? "aloqa__input-wrapper--error" : ""}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        placeholder="Ismingizni kiriting"
                        className="aloqa__input"
                      />
                      {formErrors.name && (
                        <div className="aloqa__input-error">
                          <FaExclamationCircle />
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="aloqa__form-row">
                    <div className="aloqa__form-group">
                      <label htmlFor="email">
                        <FaEnvelope /> Email <span className="aloqa__required">*</span>
                      </label>
                      <div className={`aloqa__input-wrapper ${focusedField === "email" ? "aloqa__input-wrapper--focused" : ""} ${formErrors.email ? "aloqa__input-wrapper--error" : ""}`}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus("email")}
                          onBlur={handleBlur}
                          placeholder="Email manzilingiz"
                          className="aloqa__input"
                        />
                        {formErrors.email && (
                          <div className="aloqa__input-error">
                            <FaExclamationCircle />
                            {formErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="aloqa__form-group">
                      <label htmlFor="phone">
                        <FaPhone /> Telefon
                      </label>
                      <div className={`aloqa__input-wrapper ${focusedField === "phone" ? "aloqa__input-wrapper--focused" : ""}`}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus("phone")}
                          onBlur={handleBlur}
                          placeholder="+998 71 234 56 78"
                          className="aloqa__input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="aloqa__form-group">
                    <label htmlFor="subject">Mavzu <span className="aloqa__required">*</span></label>
                    <div className={`aloqa__input-wrapper ${focusedField === "subject" ? "aloqa__input-wrapper--focused" : ""} ${formErrors.subject ? "aloqa__input-wrapper--error" : ""}`}>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus("subject")}
                        onBlur={handleBlur}
                        className="aloqa__input aloqa__select"
                      >
                        <option value="">Mavzuni tanlang</option>
                        <option value="general">Umumiy savol</option>
                        <option value="support">Texnik yordam</option>
                        <option value="suggestion">Taklif</option>
                        <option value="complaint">Shikoyat</option>
                        <option value="cooperation">Hamkorlik</option>
                        <option value="other">Boshqa</option>
                      </select>
                      {formErrors.subject && (
                        <div className="aloqa__input-error">
                          <FaExclamationCircle />
                          {formErrors.subject}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="aloqa__form-group">
                    <label htmlFor="message">
                      <FaComment /> Xabar <span className="aloqa__required">*</span>
                    </label>
                    <div className={`aloqa__input-wrapper ${focusedField === "message" ? "aloqa__input-wrapper--focused" : ""} ${formErrors.message ? "aloqa__input-wrapper--error" : ""}`}>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        placeholder="Xabaringizni yozing..."
                        rows={5}
                        className="aloqa__input aloqa__textarea"
                      />
                      {formErrors.message && (
                        <div className="aloqa__input-error">
                          <FaExclamationCircle />
                          {formErrors.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="aloqa__form-actions">
                    <button 
                      type="submit" 
                      className="aloqa__form-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="aloqa__spinner"></span>
                          Yuborilmoqda...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Murojaat yuborish
                        </>
                      )}
                    </button>
                    <p className="aloqa__form-note">
                      <FaExclamationCircle />
                      Barcha <span className="aloqa__required">*</span> bilan belgilangan maydonlar majburiy
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Xarita */}
        <div className="aloqa__map-wrapper">
          <div className="aloqa__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23963.44174379709!2d71.683333!3d41.266667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE2JzAwLjAiTiA3McKwNDEnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Uychi tuman MMTB xaritasi"
            />
            <div className="aloqa__map-overlay">
              <FaMapMarkerAlt />
              <span>Uychi tumani, Markaziy ko'cha 1</span>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="aloqa__map-link">
                Yo'nalish <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aloqa;