import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

// ── NAVIGATION LINKS ──
const NAV_LINKS = [
  { label: "Asosiy", href: "/" },
  { label: "Biz haqimizda", href: "/haqida" },
  { label: "Maktablar", href: "/maktablar" },
  { label: "MTM lar", href: "/mtm" },
  { label: "Galereya", href: "/galereya" },
  { label: "Aloqa", href: "/aloqa" },
];

// ── SOCIAL MEDIA ──
const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: "ti-brand-facebook" },
  { label: "Instagram", href: "https://instagram.com", icon: "ti-brand-instagram" },
  { label: "Telegram", href: "https://t.me", icon: "ti-brand-telegram" },
  { label: "YouTube", href: "https://youtube.com", icon: "ti-brand-youtube" },
];

// ── CONTACTS ──
const CONTACTS = [
  {
    label: "+998 (71) 234-56-78",
    href: "tel:+998712345678",
    iconClass: "ti-phone",
  },
  {
    label: "info@uychi.uz",
    href: "mailto:info@uychi.uz",
    iconClass: "ti-mail",
  },
  {
    label: "Uychi tumani, Markaziy ko'cha 1",
    href: "#map",
    iconClass: "ti-map-pin",
  },
];

// ── RESOURCES ──
const RESOURCES = [
  { label: "Yangiliklar", href: "#" },
  { label: "Tadbirlar", href: "#" },
  { label: "Hujjatlar", href: "#" },
  { label: "Statistika", href: "#" },
];

// ── CALENDAR ──
const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];
const DAYS_SHORT = ["Du", "Se", "Chor", "Pay", "Jum", "Shan", "Yak"];

function MiniCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="fc">
      <div className="fc-head">
        <button className="fc-nav" onClick={prev}>
          <i className="ti ti-chevron-left" />
        </button>
        <span className="fc-month">{MONTHS[month]} {year}</span>
        <button className="fc-nav" onClick={next}>
          <i className="ti ti-chevron-right" />
        </button>
      </div>
      <div className="fc-days">
        {DAYS_SHORT.map(d => (
          <span key={d} className="fc-day-label">{d}</span>
        ))}
      </div>
      <div className="fc-grid">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={d}
              className={`fc-cell${isToday(d) ? " fc-cell--today" : ""}`}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── GOOGLE MAP MODAL ──
function MapModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="map-modal" onClick={onClose}>
      <div className="map-modal__box" onClick={e => e.stopPropagation()}>
        <div className="map-modal__header">
          <div className="map-modal__title">
            <i className="ti ti-map-pin" style={{ color: "#b8956e", fontSize: 22 }} />
            <span>Bizning manzil</span>
          </div>
          <button className="map-modal__close" onClick={onClose}>
            <i className="ti ti-x" />
          </button>
        </div>
        <p className="map-modal__addr">Uychi tumani, Markaziy ko'cha 1</p>
        <div className="map-modal__frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23984.67546286843!2d69.123456!3d41.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA3JzI0LjQiTiA2OcKwMDcnMjQuMCJF!5e0!3m2!1suz!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Uychi MMTB joylashuvi"
          />
        </div>
        <a
          href="https://maps.google.com/?q=Uychi+tumani+Markaziy+ko'cha+1"
          target="_blank"
          rel="noopener noreferrer"
          className="map-modal__btn"
        >
          <i className="ti ti-external-link" />
          Google Maps da ochish
        </a>
      </div>
    </div>
  );
}

// ── FLOATING CONTACT ITEMS ──
const FLOAT_ITEMS = [
  {
    label: "Google Map",
    id: "map",
    bg: "#fff",
    labelColor: "#333",
    iconClass: "ti-map-2",
    iconColor: "#EA4335",
  },
  {
    label: "Telegram",
    href: "https://t.me/uychi_mmtb",
    bg: "#29B6F6",
    labelColor: "#333",
    iconClass: "ti-brand-telegram",
    iconColor: "#fff",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    bg: "#E1306C",
    labelColor: "#333",
    iconClass: "ti-brand-instagram",
    iconColor: "#fff",
  },
  {
    label: "Telefon",
    href: "tel:+998712345678",
    bg: "#b8956e",
    labelColor: "#333",
    iconClass: "ti-phone",
    iconColor: "#fff",
  },
];

// ── FLOATING WIDGETS ──
function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {showMap && <MapModal onClose={() => setShowMap(false)} />}

      {/* ── CHAP PASTKI: Aloqa tugmasi ── */}
      <div className={`fcontact${visible ? " fcontact--visible" : ""}`}>
        <div className={`fcontact-items${open ? " fcontact-items--open" : ""}`}>
          {FLOAT_ITEMS.map((item, i) => {
            const isMap = item.id === "map";
            if (isMap) {
              return (
                <button
                  key={item.label}
                  className="fcontact-item"
                  style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
                  onClick={() => {
                    setShowMap(true);
                    setOpen(false);
                  }}
                >
                  <span className="fcontact-item__icon" style={{ background: item.bg }}>
                    <i className={`ti ${item.iconClass}`} style={{ color: item.iconColor, fontSize: 22 }} />
                  </span>
                  <span className="fcontact-item__label" style={{ color: item.labelColor }}>
                    {item.label}
                  </span>
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fcontact-item"
                style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
                onClick={() => setOpen(false)}
              >
                <span className="fcontact-item__icon" style={{ background: item.bg }}>
                  <i className={`ti ${item.iconClass}`} style={{ color: item.iconColor, fontSize: 22 }} />
                </span>
                <span className="fcontact-item__label" style={{ color: item.labelColor }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <button
          className={`fcontact-btn${open ? " fcontact-btn--open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Bog'lanish"
        >
          <span className="fcontact-btn__pulse fcontact-btn__pulse--1" />
          <span className="fcontact-btn__pulse fcontact-btn__pulse--2" />
          <i className={`ti ${open ? "ti-x" : "ti-phone"}`} style={{ fontSize: 24, color: "#fff", position: "relative", zIndex: 1 }} />
        </button>
      </div>

      {/* ── O'NG PASTKI: Yuqoriga tugma ── */}
      <button
        className={`scroll-top${visible ? " scroll-top--visible" : ""}`}
        onClick={scrollTop}
        aria-label="Yuqoriga"
      >
        <span className="scroll-top__ring" />
        <i className="ti ti-arrow-up" style={{ fontSize: 20, position: "relative", zIndex: 1 }} />
      </button>
    </>
  );
}

// ── ASOSIY FOOTER ──
function Footer() {
  return (
    <>
      <FloatingWidgets />

      <footer className="footer">
        {/* ── Animatsion fon ── */}
        <div className="footer-deco" aria-hidden="true">
          <svg className="footer-deco__svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="fg1" cx="10%" cy="80%" r="40%">
                <stop offset="0%" stopColor="#b8956e" stopOpacity=".08" />
                <stop offset="100%" stopColor="#b8956e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="fg2" cx="90%" cy="20%" r="35%">
                <stop offset="0%" stopColor="#9a7d5a" stopOpacity=".06" />
                <stop offset="100%" stopColor="#9a7d5a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="600" fill="url(#fg1)" />
            <rect width="1440" height="600" fill="url(#fg2)" />

            <circle className="fd-ring fd-ring--1" cx="120" cy="480" r="160" fill="none" stroke="#b8956e" strokeWidth="1" strokeOpacity=".1" />
            <circle className="fd-ring fd-ring--2" cx="120" cy="480" r="240" fill="none" stroke="#b8956e" strokeWidth="1" strokeOpacity=".06" />
            <circle className="fd-ring fd-ring--3" cx="1320" cy="120" r="200" fill="none" stroke="#9a7d5a" strokeWidth="1" strokeOpacity=".08" />
            <circle className="fd-ring fd-ring--4" cx="1320" cy="120" r="290" fill="none" stroke="#9a7d5a" strokeWidth="1" strokeOpacity=".04" />

            <circle className="fd-dot fd-dot--1" cx="200" cy="60" r="5" fill="#b8956e" fillOpacity=".3" />
            <circle className="fd-dot fd-dot--2" cx="400" cy="520" r="4" fill="#b8956e" fillOpacity=".25" />
            <circle className="fd-dot fd-dot--3" cx="1100" cy="40" r="6" fill="#9a7d5a" fillOpacity=".2" />
            <circle className="fd-dot fd-dot--4" cx="1380" cy="520" r="4" fill="#b8956e" fillOpacity=".28" />
            <circle className="fd-dot fd-dot--5" cx="700" cy="20" r="3" fill="#b8956e" fillOpacity=".35" />

            <rect className="fd-rect fd-rect--1" x="50" y="200" width="40" height="40" rx="8" fill="none" stroke="#b8956e" strokeWidth="1.5" strokeOpacity=".15" />
            <rect className="fd-rect fd-rect--2" x="1360" y="300" width="28" height="28" rx="6" fill="none" stroke="#9a7d5a" strokeWidth="1.5" strokeOpacity=".12" />
          </svg>
        </div>

        {/* ── CTA Banner ── */}
        <div className="footer-hero">
          <div className="footer-hero__inner">
            <div className="footer-hero__left">
              <span className="footer-hero__eyebrow">Biz bilan bog'laning</span>
              <h2 className="footer-hero__title">
                Sifatli ta'lim, <br />
                <span>kelajak garovi</span>
              </h2>
            </div>
            <a href="mailto:info@uychi.uz" className="footer-hero__cta">
              Bizga yozing
              <i className="ti ti-arrow-right" />
            </a>
          </div>
        </div>

        {/* ── Asosiy Grid ── */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Brand - 1-ustun */}
            <div className="footer-brand">
              <div className="footer-brand__header">
                <span className="footer-brand__icon">🏫</span>
                <h2 className="footer-brand__title">
                  Uychi tumani <span>MMTB</span>
                </h2>
              </div>
              <p className="footer-brand__desc">
                Uychi tumani maktabgacha va maktab ta'limi bo'limi rasmiy sayti.
                Sifatli ta'lim, kelajak garovi.
              </p>
              <div className="footer-socials">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-socials__item"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <i className={`ti ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation - 2-ustun */}
            <div className="footer-col">
              <h4 className="footer-col__title">Navigatsiya</h4>
              <ul className="footer-nav">
                {NAV_LINKS.map(l => (
                  <li key={l.href}>
                    <NavLink to={l.href} className="footer-nav__link">
                      <i className="ti ti-chevron-right footer-nav__arrow" />
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources - 3-ustun */}
            <div className="footer-col">
              <h4 className="footer-col__title">Resurslar</h4>
              <ul className="footer-nav">
                {RESOURCES.map((r, i) => (
                  <li key={i}>
                    <a href={r.href} className="footer-nav__link">
                      <i className="ti ti-chevron-right footer-nav__arrow" />
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts - 4-ustun */}
            <div className="footer-col">
              <h4 className="footer-col__title">Kontaktlar</h4>
              <ul className="footer-contacts">
                {CONTACTS.map((c, i) => (
                  <li key={i}>
                    <a href={c.href} className="footer-contacts__item">
                      <span className="footer-contacts__icon">
                        <i className={`ti ${c.iconClass}`} />
                      </span>
                      <span>{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calendar - 5-ustun (yangi qo'shildi) */}
            <div className="footer-col footer-col--calendar">
              <h4 className="footer-col__title">Ish vaqti</h4>
              <MiniCalendar />
              <div className="footer-working-hours">
                <p><span>Dushanba - Juma:</span> 08:00 - 17:00</p>
                <p><span>Shanba - Yakshanba:</span> Dam olish</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pastki chiziq ── */}
        <div className="footer-bottom">
          <div className="footer-bottom__inner">
            <span>© {new Date().getFullYear()} Uychi tumani MMTB. Barcha huquqlar himoyalangan.</span>
            <div className="footer-bottom__links">
              <a href="#">Maxfiylik siyosati</a>
              <span>|</span>
              <a href="#">Foydalanish shartlari</a>
              <span>|</span>
              <a href="#">Sayt xaritasi</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;