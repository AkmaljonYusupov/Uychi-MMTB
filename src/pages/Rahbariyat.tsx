import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import "./Rahbariyat.scss";

// JSON fayldan ma'lumotlarni import qilish
import leadershipData from "../data/leadershipData.json";

// Rasmlarni import qilish
import karimovAlisher from "../assets/rahbariyat/Nuriddin.jpg";
import tursunovBotir from "../assets/rahbariyat/Botir.jpg";

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  receptionDay: string;
  receptionTime: string;
  image: string;
  isVacant?: boolean;
  order?: number;
}

const Rahbariyat: React.FC = () => {
  // JSON dan ma'lumotlarni olish va faqat isVacant = false bo'lganlarini filtrlash
  const leadershipMembers: LeadershipMember[] = leadershipData.leadershipMembers
    .filter(member => !member.isVacant) // Vakant bo'lmaganlarni olish
    .map(member => {
      // Rasm nomiga qarab tegishli rasmni yuklash
      let imageSrc = "";
      if (member.image === "karimovAlisher") {
        imageSrc = karimovAlisher;
      } else if (member.image === "tursunovBotir") {
        imageSrc = tursunovBotir;
      }
      
      return {
        ...member,
        image: imageSrc,
      };
    });

  return (
    <section className="raxbariyat">
      <div className="container">
        <div className="header">
          <div className="header-badge">
            <FaBuilding />
            <span>Uychi tumani</span>
          </div>

          <h1>
            Maktabgacha va maktab ta'limi
            <br />
            <span className="highlight">
              Bo'lim rahbariyati
            </span>
          </h1>
        </div>

        <div className="leadership-grid">
          {leadershipMembers.map((member) => (
            <div
              key={member.id}
              className="leadership-card"
            >
              <div className="card-image">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
              </div>

              <div className="card-content">
                <h2 className="card-name">
                  {member.name}
                </h2>

                <p className="card-position">
                  {member.position}
                </p>

                <div className="card-details">
                  <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <span>
                      <strong>
                        {member.receptionDay}
                      </strong>{" "}
                      soat {member.receptionTime}
                    </span>
                  </div>

                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{member.phone}</span>
                  </div>

                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rahbariyat;