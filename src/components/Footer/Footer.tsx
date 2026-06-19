import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaClock
} from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social media links configuration
  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaTelegramPlane, href: "https://t.me", label: "Telegram" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
  ];

  const quickLinks = [
    { to: "/", label: "Asosiy" },
    { to: "/haqida", label: "Biz haqimizda" },
    { to: "/maktablar", label: "Maktablar" },
    { to: "/mtm", label: "MTM lar" },
    { to: "/galereya", label: "Galereya" }
  ];

  const resources = [
    { href: "#", label: "Yangiliklar" },
    { href: "#", label: "Tadbirlar" },
    { href: "#", label: "Hujjatlar" },
    { href: "#", label: "Statistika" },
    { to: "/aloqa", label: "Aloqa", isNavLink: true }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "Uychi tumani, Markaziy ko'cha 1", isLink: false },
    { icon: FaPhone, text: "+998 (71) 234-56-78", href: "tel:+998712345678", isLink: true },
    { icon: FaEnvelope, text: "info@uychi.uz", href: "mailto:info@uychi.uz", isLink: true },
    { icon: FaClock, text: "Dushanba - Juma: 08:00 - 17:00", isLink: false }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <h2>
              Uychi <span>MMTB</span>
            </h2>
            <p>
              Uychi tumani maktabgacha va maktab ta'limi bo'limi rasmiy sayti. 
              Sifatli ta'lim, kelajak garovi.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h3>Tez havolalar</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__column">
            <h3>Resurslar</h3>
            <ul>
              {resources.map((item, index) => (
                <li key={index}>
                  {item.isNavLink ? (
                    <NavLink to={item.to}>{item.label}</NavLink>
                  ) : (
                    <a href={item.href}>{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__column">
            <h3>Bog'lanish</h3>
            <ul className="footer__contact">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <item.icon />
                  {item.isLink ? (
                    <a href={item.href}>{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Uychi tumani MMTB. Barcha huquqlar himoyalangan.</p>
          <div className="footer__bottom-links">
            <a href="#">Maxfiylik siyosati</a>
            <span>|</span>
            <a href="#">Foydalanish shartlari</a>
            <span>|</span>
            <a href="#">Sayt xaritasi</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`footer__back-top ${showBackTop ? 'footer__back-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Yuqoriga qaytish"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;