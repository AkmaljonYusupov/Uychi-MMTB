import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight, FaPhone, FaEnvelope, FaImages, FaHome } from "react-icons/fa";
import "./Hero.scss";

const PAGE_MAP: Record<string,{title:string;titleSub?:string;subtitle:string;tag:string}> = {
  "/rahbariyat": { title:"Rahbariyat", subtitle:"Maktabgacha va maktab ta'limi bo'limi rahbariyati va mas'ul xodimlari", tag:"Boshqaruv" },
  "/yangiliklar": { title:"Yangiliklar", subtitle:"Ta'lim tizimidagi eng so'nggi yangiliklar va e'lonlar", tag:"Yangiliklar" },
  "/galereya":   { title:"Galereya",   subtitle:"Faoliyatimizga oid foto va video materiallar bilan tanishing", tag:"Media" },
  "/aloqa":      { title:"Bog'lanish",      subtitle:"Biz bilan bog'lanish uchun aloqa ma'lumotlari va murojaat shakli", tag:"Bog'lanish" },
};
const DEFAULT_PAGE = {
  title:"Uychi Tuman", titleSub:"MMTB",
  subtitle:"Maktabgacha va maktab ta'limi bo'limining rasmiy veb-sayti — ta'lim, yangiliklar va ma'muriyat haqida to'liq ma'lumot.",
  tag:"Rasmiy portal",
};

interface Particle {
  x:number; y:number; vx:number; vy:number; r:number;
  alpha:number; targetAlpha:number; life:number; maxLife:number;
  twinklePhase:number; twinkleSpeed:number;
}

function makeParticle(W:number, H:number, randomY=false): Particle {
  const maxLife = 180 + Math.random()*220;
  return {
    x: Math.random()*W,
    y: randomY ? Math.random()*H : H + Math.random()*60,
    vx: (Math.random()-.5)*.3, vy: -(0.4+Math.random()*1.1),
    r: 0.8+Math.random()*1.4,
    alpha: 0, targetAlpha: 0.12+Math.random()*.32,
    life: randomY ? Math.random()*maxLife : 0, maxLife,
    twinklePhase: Math.random()*Math.PI*2,
    twinkleSpeed: 0.02+Math.random()*.04,
  };
}

function Hero() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const wrapRef   = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef({x:-999,y:-999});
  const animRef   = useRef<number>(0);

  useEffect(()=>{ 
    const t=setTimeout(()=>setVisible(true),100); 
    return()=>clearTimeout(t); 
  },[]);

  useEffect(()=>{
    const wrap=wrapRef.current, canvas=canvasRef.current;
    if(!wrap||!canvas) return;
    const ctx=canvas.getContext("2d")!;
    let W=0,H=0,particles:Particle[]=[],tick=0;

    const resize=()=>{ 
      W=canvas.width=wrap.clientWidth; 
      H=canvas.height=wrap.clientHeight; 
    };
    const init=()=>{ 
      particles=Array.from({length:90},(_,i)=>makeParticle(W,H,i<58)); 
    };

    const frame=()=>{
      tick++;
      ctx.clearRect(0,0,W,H);
      const g=ctx.createLinearGradient(0,0,W,H);
      g.addColorStop(0,"#082e6a"); 
      g.addColorStop(.5,"#104ea0"); 
      g.addColorStop(1,"#1868cc");
      ctx.fillStyle=g; 
      ctx.fillRect(0,0,W,H);
      
      const g2=ctx.createRadialGradient(W*.15,H*.15,0,W*.15,H*.15,W*.55);
      g2.addColorStop(0,"rgba(255,255,255,.10)"); 
      g2.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g2; 
      ctx.fillRect(0,0,W,H);
      
      const g3=ctx.createRadialGradient(W*.85,H*.18,0,W*.85,H*.18,W*.42);
      g3.addColorStop(0,"rgba(160,220,255,.07)"); 
      g3.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g3; 
      ctx.fillRect(0,0,W,H);
      
      ctx.strokeStyle="rgba(255,255,255,.028)"; 
      ctx.lineWidth=1;
      for(let x=0;x<W;x+=56){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,H);
        ctx.stroke();
      }
      for(let y=0;y<H;y+=56){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(W,y);
        ctx.stroke();
      }
      
      const{x:mx,y:my}=mouseRef.current;
      const mdx=mx/W-.5, mdy=my/H-.5;
      
      for(const p of particles){
        p.life++;
        const prog=p.life/p.maxLife;
        if(prog<.12) p.alpha=p.targetAlpha*(prog/.12);
        else if(prog>.82) p.alpha=p.targetAlpha*((1-prog)/.18);
        else p.alpha=p.targetAlpha;
        p.alpha*=.7+.3*Math.sin(tick*p.twinkleSpeed+p.twinklePhase);
        const dx=p.x-mx,dy=p.y-my,dist=Math.sqrt(dx*dx+dy*dy);
        const rep=dist<100?(1-dist/100)*.6:0;
        p.x+=p.vx+rep*(dx/Math.max(dist,1))+mdx*.08;
        p.y+=p.vy+rep*(dy/Math.max(dist,1))+mdy*.05;
        if(p.life>p.maxLife||p.y<-20) Object.assign(p,makeParticle(W,H,false));
        ctx.beginPath(); 
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${p.alpha.toFixed(3)})`; 
        ctx.fill();
      }
      
      for(let i=0;i<particles.length;i++){
        const a=particles[i];
        for(let j=i+1;j<particles.length;j++){
          const b=particles[j];
          const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<80){
            ctx.beginPath(); 
            ctx.moveTo(a.x,a.y); 
            ctx.lineTo(b.x,b.y);
            ctx.strokeStyle=`rgba(255,255,255,${((1-d/80)*.06).toFixed(3)})`;
            ctx.lineWidth=.6; 
            ctx.stroke();
          }
        }
      }
      animRef.current=requestAnimationFrame(frame);
    };
    
    resize(); 
    init(); 
    frame();
    const ro=new ResizeObserver(resize); 
    ro.observe(wrap);
    return()=>{ 
      cancelAnimationFrame(animRef.current); 
      ro.disconnect(); 
    };
  },[]);

  useEffect(()=>{
    const wrap=wrapRef.current, glow=glowRef.current;
    if(!wrap) return;
    
    const onMove=(e:MouseEvent)=>{
      const r=wrap.getBoundingClientRect();
      const mx=e.clientX-r.left, my=e.clientY-r.top;
      mouseRef.current={x:mx,y:my};
      if(glow){
        glow.style.opacity="1";
        glow.style.left=`${mx}px`;
        glow.style.top=`${my}px`;
      }
    };
    
    const onLeave=()=>{ 
      mouseRef.current={x:-999,y:-999}; 
      if(glow) glow.style.opacity="0"; 
    };
    
    wrap.addEventListener("mousemove",onMove);
    wrap.addEventListener("mouseleave",onLeave);
    return()=>{ 
      wrap.removeEventListener("mousemove",onMove); 
      wrap.removeEventListener("mouseleave",onLeave); 
    };
  },[]);

  const pageInfo=PAGE_MAP[location.pathname]??DEFAULT_PAGE;
  const isContact=location.pathname==="/aloqa";
  const isHome=location.pathname==="/";

  return (
    <section ref={wrapRef} className={`hero${visible?" hero--visible":""}`}>
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true"/>
      <div ref={glowRef} className="hero__mouse-glow" aria-hidden="true"/>
      <div className="hero__light hero__light--1" aria-hidden="true"/>
      <div className="hero__light hero__light--2" aria-hidden="true"/>
      <div className="hero__cloud hero__cloud--1" aria-hidden="true"/>
      <div className="hero__cloud hero__cloud--2" aria-hidden="true"/>
      <div className="hero__cloud hero__cloud--3" aria-hidden="true"/>

      <div className="hero__inner">
        <div className="hero__header">
          <h1 className="hero__title">
            {isHome ? (
              <>
                {pageInfo.title}
                <span className="hero__title-sub">{pageInfo.titleSub}</span>
              </>
            ) : (
              pageInfo.title
            )}
          </h1>

          <p className="hero__subtitle">{pageInfo.subtitle}</p>
        </div>

        <nav className="hero__breadcrumbs" aria-label="Sahifa yo'li">
          <Link to="/" className="hero__bc-link">
            <FaHome className="hero__bc-icon" aria-hidden="true"/>
            Bosh sahifa
          </Link>
          {!isHome && (
            <>
              <span className="hero__bc-sep" aria-hidden="true">›</span>
              <span className="hero__bc-cur" aria-current="page">{pageInfo.title}</span>
            </>
          )}
        </nav>

        <div className="hero__actions">
          {isContact?(
            <>
              <a href="tel:+998901234567" className="hero__btn hero__btn--primary">
                <FaPhone aria-hidden="true"/> Qo'ng'iroq qilish
              </a>
              <a href="#contact-form" className="hero__btn hero__btn--secondary">
                <FaEnvelope aria-hidden="true"/> Murojaat yuborish
              </a>
            </>
          ):(
            <>
              <Link to="/aloqa" className="hero__btn hero__btn--primary">
                Bog'lanish <FaArrowRight aria-hidden="true"/>
              </Link>
              <Link to="/galereya" className="hero__btn hero__btn--secondary">
                <FaImages aria-hidden="true"/> Galereya
              </Link>
            </>
          )}
        </div>

        <div className="hero__stats">
          <div className="hero__stat"><strong>50+</strong><span>Maktablar</span></div>
          <div className="hero__stat"><strong>1 000+</strong><span>Pedagoglar</span></div>
          <div className="hero__stat"><strong>20 000+</strong><span>O'quvchilar</span></div>
        </div>
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(255,255,255,0.25)" d="M0,140 C360,80 720,178 1080,118 C1260,88 1380,148 1440,126 L1440,200 L0,200Z"/>
          <path fill="rgba(255,255,255,0.52)" d="M0,162 C200,136 440,184 690,156 C890,133 1110,176 1315,150 C1390,138 1432,156 1440,150 L1440,200 L0,200Z"/>
          <path fill="#ffffff" d="M0,178 C268,158 534,193 800,177 C1020,164 1250,188 1440,175 L1440,200 L0,200Z"/>
        </svg>
      </div>
    </section>
  );
}

export default Hero;