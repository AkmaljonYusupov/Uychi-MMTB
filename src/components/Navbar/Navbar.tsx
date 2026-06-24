import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  FaTelegramPlane, 
  FaInstagram, 
  FaYoutube, 
  FaFacebookF,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaChevronRight
} from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import "./Navbar.scss";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // activeIndex o'chirildi
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const links = [
    { to: "/", label: "Bosh sahifa", icon: "✦" },
    { to: "/rahbariyat", label: "Rahbariyat", icon: "◈" },
    { to: "/yangiliklar", label: "Yangiliklar", icon: "✧" },
    { to: "/galereya", label: "Galereya", icon: "❖" },
    { to: "/aloqa", label: "Aloqa", icon: "✶" },
  ];

  const socials = [
    { href: "#", icon: <FaTelegramPlane />, label: "Telegram" },
    { href: "#", icon: <FaInstagram />, label: "Instagram" },
    { href: "#", icon: <FaYoutube />, label: "YouTube" },
    { href: "#", icon: <FaFacebookF />, label: "Facebook" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={`topbar ${isScrolled ? "topbar--hidden" : ""}`}>
        <div className="topbar__inner">
          <div className="topbar__info">
            <span className="topbar__item">
              <FaPhoneAlt />
              <a href="tel:+998901234567">+998 (90) 123-45-67</a>
            </span>
            <span className="topbar__item topbar__item--divider">|</span>
            <span className="topbar__item">
              <FaMapMarkerAlt />
              Namangan Viloyati Uychi Tumani maktabgacha va maktab ta'limi boshqarmasi
            </span>
            <span className="topbar__item topbar__item--divider">|</span>
            <span className="topbar__item">
              <FaRegClock />
              Du - Shu: 09:00 - 18:00
            </span>
          </div>
          <div className="topbar__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="topbar__social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__bg" />
        
        <div className="navbar__inner">
          {/* Logo */}
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <div className="logo__text">
              <span className="logo__name">Uychi tuman</span>
              <span className="logo__sub">MMTB</span>
            </div>
          </NavLink>

          {/* Navigation */}
          <nav className="nav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `nav__link ${isActive ? "nav__link--active" : ""}`
                }
              >
                <span className="nav__link-icon">{link.icon}</span>
                <span className="nav__link-label">{link.label}</span>
                <span className="nav__link-dot" />
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="actions">
            <NavLink to="/aloqa" className="btn btn--primary">
              <span>Bog'lanish</span>
              <FaChevronRight />
            </NavLink>
            <button
              className={`hamburger ${isOpen ? "hamburger--open" : ""}`}
              onClick={toggleMenu}
              aria-label="Menyu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Decorative patterns */}
        <div className="navbar__ornament">
          <div className="navbar__ornament--line" />
          <div className="navbar__ornament--diamond" />
          <div className="navbar__ornament--line" />
        </div>

        {/* Bottom glow */}
        <div className="navbar__glow" />
      </header>

      {/* Overlay - mobile menu orqasida */}
      <div className={`overlay ${isOpen ? "overlay--active" : ""}`} onClick={closeMenu} />

      {/* Mobile Menu - eng tepada */}
      <div className={`mobile ${isOpen ? "mobile--open" : ""}`}>
        <div className="mobile__bg" />
        
        <div className="mobile__header">
          <div className="mobile__brand">
              <div className="mobile__brand-name">UYCHI TUMAN MMTB</div>
          </div>
          <button className="mobile__close" onClick={closeMenu}>
            <HiOutlineX />
          </button>
        </div>

        <div className="mobile__ornament">
          <span>◆ ◆ ◆</span>
        </div>

        <nav className="mobile__nav">
          {links.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `mobile__link ${isActive ? "mobile__link--active" : ""}`
              }
              onClick={closeMenu}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className="mobile__link-num">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mobile__link-icon">{link.icon}</span>
              <span className="mobile__link-label">{link.label}</span>
              <span className="mobile__link-arrow">
                <FaChevronRight />
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="mobile__footer">
          <div className="mobile__divider">
            <span>✦</span>
          </div>
          
          <div className="mobile__info">
            <a href="tel:+998901234567" className="mobile__info-item">
              <FaPhoneAlt />
              +998 (90) 123-45-67
            </a>
            <span className="mobile__info-item">
              <FaMapMarkerAlt />
              Namangan Viloyati Uychi Tumani maktabgacha va maktab ta'limi boshqarmasi
            </span>
          </div>
          
          <div className="mobile__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="mobile__social">
                {s.icon}
              </a>
            ))}
          </div>
          
          <p className="mobile__copy">
            © 2026 UYCHI MMTB
            <span className="mobile__copy-dot">•</span>
            Barcha huquqlar himoyalangan
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;