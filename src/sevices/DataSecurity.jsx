import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Barlow',sans-serif;background:#090f1e;color:#fff;overflow-x:hidden;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  @keyframes scrollPulse{0%,100%{opacity:1;}50%{opacity:.25;}}
  @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
  @keyframes pulseRing{0%{transform:scale(.95);opacity:1;}70%{transform:scale(1.3);opacity:0;}100%{opacity:0;}}
  @keyframes blink{0%,49%{opacity:1;}50%,100%{opacity:0;}}
  @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
  @keyframes spinSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes spinSlowRev{from{transform:rotate(360deg);}to{transform:rotate(0deg);}}
  @keyframes glitch{
    0%,100%{ clip-path: inset(0 0 0 0); transform:translate(0,0); }
    20%{ clip-path: inset(10% 0 60% 0); transform:translate(-2px,1px); }
    40%{ clip-path: inset(50% 0 20% 0); transform:translate(2px,-1px); }
    60%{ clip-path: inset(20% 0 50% 0); transform:translate(-1px,1px); }
    80%{ clip-path: inset(70% 0 5% 0); transform:translate(1px,-1px); }
  }
  @keyframes scanline{0%{transform:translateY(-100%);}100%{transform:translateY(100%);}}
  @keyframes popIn{0%{opacity:0;transform:scale(.85);}100%{opacity:1;transform:scale(1);}}

  .au1{animation:fadeUp .6s .15s both;}
  .au2{animation:fadeUp .6s .35s both;}
  .au3{animation:fadeUp .6s .5s  both;}
  .au4{animation:fadeUp .6s .65s both;}
  .au5{animation:fadeUp .6s .85s both;}
  .au6{animation:fadeUp .6s 1.05s both;}
  .au7{animation:fadeUp .5s 1.3s  both;}
  .pulse{animation:scrollPulse 2s infinite;}
  .floaty{animation:floatY 4.2s ease-in-out infinite;}
  .spin-slow{animation:spinSlow 18s linear infinite;}
  .spin-slow-rev{animation:spinSlowRev 24s linear infinite;}

  .typecursor{display:inline-block;width:3px;background:#e8971a;margin-left:4px;animation:blink 1s step-end infinite;}

  .rv{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;}
  .rvl{opacity:0;transform:translateX(-28px);transition:opacity .7s ease,transform .7s ease;}
  .rvr{opacity:0;transform:translateX(28px);transition:opacity .7s ease,transform .7s ease;}
  .rvs{opacity:0;transform:scale(.9);transition:opacity .6s ease,transform .6s ease;}
  .rv.vis,.rvl.vis,.rvr.vis,.rvs.vis{opacity:1;transform:none;}

  .pillar{position:relative;overflow:hidden;transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease;
          transform-style:preserve-3d;}
  .pillar::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:#e8971a;
                 transform:scaleX(0);transform-origin:left;transition:transform .4s ease;}
  .pillar::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
                  background:linear-gradient(120deg,transparent,rgba(232,151,26,.07),transparent);
                  transition:left .6s ease;pointer-events:none;}
  .pillar:hover::before{left:140%;}
  .pillar:hover::after{transform:scaleX(1);}
  .pillar:hover .pillar-num{color:rgba(232,151,26,.1) !important;}

  .comp{position:relative;overflow:hidden;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;}
  .comp:hover{border-color:rgba(232,151,26,.3) !important;transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,.35);}

  .industry-chip{transition:transform .25s,border-color .25s,background .25s;}
  .industry-chip:hover{transform:translateY(-4px);border-color:rgba(232,151,26,.5) !important;background:rgba(232,151,26,.08) !important;}

  .faq-item{transition:border-color .25s;}
  .faq-item:hover{border-color:rgba(232,151,26,.3) !important;}

  .nbtn{background:none;border:none;cursor:pointer;padding:0;color:rgba(255,255,255,.78);font-family:'Barlow',sans-serif;
       font-size:.9rem;font-weight:500;letter-spacing:.3px;transition:color .2s;}
  .nbtn:hover{color:#fff;}

  .ncta{background:#e8971a;color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:.9rem;
       letter-spacing:1px;text-transform:uppercase;padding:9px 22px;border-radius:4px;cursor:pointer;border:none;
       transition:background .2s,transform .2s;white-space:nowrap;}
  .ncta:hover{background:#f5a623;transform:translateY(-1px);}

  .bgold{background:#e8971a;color:#000;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:.95rem;
        letter-spacing:1.5px;text-transform:uppercase;padding:14px 34px;border-radius:4px;text-decoration:none;
        display:inline-block;transition:background .2s,transform .2s;position:relative;overflow:hidden;}
  .bgold:hover{background:#f5a623;transform:translateY(-2px);}

  .bgh{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3);font-family:'Barlow Condensed',sans-serif;
      font-weight:700;font-size:.95rem;letter-spacing:1.5px;text-transform:uppercase;padding:14px 34px;border-radius:4px;
      text-decoration:none;display:inline-block;transition:border-color .2s,background .2s,transform .2s;}
  .bgh:hover{border-color:#e8971a;background:rgba(232,151,26,.08);transform:translateY(-2px);}

  .flink{color:rgba(255,255,255,.45);font-size:.8rem;text-decoration:none;transition:color .2s;}
  .flink:hover{color:#e8971a;}

  .moba{color:rgba(255,255,255,.82);text-decoration:none;font-family:'Barlow Condensed',sans-serif;font-size:1.15rem;
       font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 0;
       border-bottom:1px solid rgba(255,255,255,.07);transition:color .2s;display:block;background:none;
       border-top:none;border-left:none;border-right:none;cursor:pointer;text-align:left;width:100%;}
  .moba:hover{color:#e8971a;}

  .hbadge{display:flex;align-items:center;gap:8px;border:1px solid rgba(232,151,26,.35);color:rgba(255,255,255,.85);
         font-family:'Barlow Condensed',sans-serif;font-size:.85rem;font-weight:600;letter-spacing:.5px;
         padding:9px 18px;border-radius:30px;background:rgba(232,151,26,.06);}

  .marquee-track{display:flex;animation:marquee 28s linear infinite;width:max-content;}
  .marquee-wrap:hover .marquee-track{animation-play-state:paused;}

  .shine-text{background:linear-gradient(110deg,#e8971a 30%,#fde9c4 45%,#e8971a 60%);
              background-size:200% 100%;-webkit-background-clip:text;background-clip:text;
              color:transparent;animation:shimmer 3.5s linear infinite;}

  @media(max-width:960px){
    .dn{display:none !important;}
    .dfl{display:flex !important;}
    .sp{padding:72px 24px !important;}
    .hpad{padding:120px 24px 72px !important;}
    .stsp{padding:28px 24px !important;gap:40px !important;}
    .pgrid{grid-template-columns:1fr !important;}
  }
  @media(max-width:600px){
    .g1{grid-template-columns:1fr !important;}
    .sg{gap:28px !important;}
  }
  @media(prefers-reduced-motion:reduce){
    .rv,.rvl,.rvr,.rvs{opacity:1 !important;transform:none !important;transition:none !important;}
    *{animation:none !important;}
  }
`;

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const G    = "#e8971a";
const GL   = "#f5a623";
const BORD = "rgba(255,255,255,0.07)";
const BODY = "rgba(255,255,255,0.70)";
const CBKG = "#111d40";
const CBKG2= "#0f1a38";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const TYPED_WORDS = ["Isolated.", "Encrypted.", "Controlled.", "Admissible."];

const PILLARS = [
  { num:"01", icon:"🖥️", title:"Secure Offline Infrastructure",
    items:["Isolated systems (air-gapped environments) with no internet connectivity","Dedicated secure servers and storage devices"] },
  { num:"02", icon:"🔒", title:"Data Protection & Encryption",
    items:["Strong encryption protocols applied for data at rest","Data remains fully inaccessible without proper authorization"] },
  { num:"03", icon:"🛂", title:"Controlled Data Access",
    items:["Only the authorised person can access or even know the path of data","Strict role-based and device-based access controls","Multi-layer authentication for physical and system access"] },
  { num:"04", icon:"🔁", title:"Secure Data Transfer",
    items:["Safe offline transfer methods — encrypted drives, controlled ports","Prevention of data leakage during movement between systems"] },
];

const TIMELINE = [
  { n:1, title:"Isolate",          body:"Data is moved into air-gapped, internet-free environments on dedicated secure servers and storage devices — physically removed from exposure." },
  { n:2, title:"Encrypt",          body:"Strong encryption protocols are applied to all data at rest, ensuring it remains completely inaccessible without proper authorization." },
  { n:3, title:"Control",          body:"Role-based and device-based access controls, combined with multi-layer authentication, ensure only authorised individuals can reach the data." },
  { n:4, title:"Transfer Safely",  body:"When movement is necessary, encrypted drives and controlled ports are used to prevent any leakage between systems." },
  { n:5, title:"Document & Certify", body:"Every action is logged end-to-end, maintaining a fully traceable chain of custody that is admissible in legal proceedings." },
];

const STATS = [
  { num:2,   suffix:"",    label:"ISO Certifications" },
  { num:0,   suffix:"",    label:"Internet-Connected Vaults" },
  { num:100, suffix:"%",   label:"Chain-of-Custody Logged" },
  { num:24,  suffix:"/7",  label:"Controlled Access Monitoring" },
];

const COMPLIANCE = [
  { tag:"Legal Admissibility", title:"Fully Maintained Chain of Custody (CoC)",
    items:["End-to-end documentation of data handling, access, and movement","Ensures integrity, traceability, and admissibility in legal proceedings"] },
  { tag:"Indian Evidence Framework", title:"Section 63(4)(c) Certificate Compliance",
    items:["Proper handling, storage, and presentation of digital evidence","Ensures data is legally valid and defensible in court"] },
  { tag:"DPDP Act, 2023", title:"Alignment with Digital Personal Data Protection Act",
    items:["Protection of personal and sensitive data per Indian regulations","Data minimization, purpose limitation, and security safeguards","Lawful processing and controlled access mechanisms"] },
];

const CERTS = [
  { code:"ISO 27001:2022", name:"Information Security Management",
    desc:"Guarantees the highest level of data security and risk management — sensitive information handled under strict global standards for confidentiality, integrity, and compliance." },
  { code:"ISO 9001:2015", name:"Quality Management",
    desc:"Ensures consistent quality, structured processes, and a customer-first approach — reflecting our commitment to reliable services and continuous improvement." },
];

const INDUSTRIES = [
  "Banking & NBFCs","FinTech","Government & PSU","Law Enforcement","Insurance",
  "Healthcare","Real Estate","Legal Firms","Corporates & MNCs","Insolvency Professionals",
  "Banking & NBFCs","FinTech","Government & PSU","Law Enforcement","Insurance",
  "Healthcare","Real Estate","Legal Firms","Corporates & MNCs","Insolvency Professionals",
];

const FAQS = [
  { q:"What does \"air-gapped\" actually mean for my data?",
    a:"Your data lives on dedicated servers and storage devices with zero internet connectivity. There is no network path for an external attacker to reach it — physical isolation, not just firewall rules." },
  { q:"Who can access the vault once data is stored?",
    a:"Only authorised individuals, verified through role-based and device-based access controls plus multi-layer authentication. Even the storage path itself is known only to those authorised." },
  { q:"Is this approach legally recognised in India?",
    a:"Yes. Our process is aligned with Section 63(4)(c) of the Indian Evidence Framework and the Digital Personal Data Protection Act, 2023 — meaning the data we protect remains admissible and defensible in court." },
  { q:"How is data moved without exposing it?",
    a:"Through safe offline transfer methods only — encrypted drives and controlled ports — eliminating the data leakage risk that comes with open network transfers." },
  { q:"What happens if data needs to be presented as evidence?",
    a:"A fully maintained chain of custody is documented end-to-end, covering handling, access, and movement — ensuring integrity, traceability, and full admissibility in legal proceedings." },
];

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useReveal(cls="rv") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(cls);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("vis"); io.disconnect(); }
    },{threshold:0.1});
    io.observe(el);
    return () => io.disconnect();
  },[cls]);
  return ref;
}

function useStagger(cls="rv") {
  const ref = useRef(null);
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const ios = [...p.children].map((c,i) => {
      c.classList.add(cls);
      c.style.transitionDelay = `${i*0.09}s`;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { c.classList.add("vis"); io.disconnect(); }
      },{threshold:0.08});
      io.observe(c);
      return io;
    });
    return () => ios.forEach(io => io.disconnect());
  },[cls]);
  return ref;
}

/* Typewriter cycling word effect */
function useTypewriter(words, typeSpeed=70, pause=1400, deleteSpeed=40) {
  const [text, setText] = useState("");
  useEffect(() => {
    let wordIdx = 0, charIdx = 0, deleting = false, timeoutId;
    const tick = () => {
      const current = words[wordIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
        timeoutId = setTimeout(tick, typeSpeed);
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
        timeoutId = setTimeout(tick, deleteSpeed);
      }
    };
    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  },[]);
  return text;
}

/* Count-up animation on scroll into view */
function useCountUp(target, duration=1600) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    },{threshold:0.4});
    io.observe(el);
    return () => io.disconnect();
  },[target,duration]);
  return [ref, val];
}

/* ══════════════════════════════════════════
   STARS CANVAS
══════════════════════════════════════════ */
function Stars() {
  const cv = useRef(null);
  useEffect(() => {
    const canvas = cv.current;
    const ctx = canvas.getContext("2d");
    let W,H,stars=[],raf;
    const resize = () => { W=canvas.width=innerWidth; H=canvas.height=innerHeight; };
    const init = () => { stars=Array.from({length:120},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.3,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,alpha:Math.random()*.6+.2,pulse:Math.random()*Math.PI*2})); };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){
        const dx=stars[i].x-stars[j].x,dy=stars[i].y-stars[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){ctx.beginPath();ctx.strokeStyle=`rgba(232,151,26,${.07*(1-d/130)})`;ctx.lineWidth=.5;ctx.moveTo(stars[i].x,stars[i].y);ctx.lineTo(stars[j].x,stars[j].y);ctx.stroke();}
      }
      stars.forEach(s=>{
        s.pulse+=.015;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(232,151,26,${s.alpha*(.7+.3*Math.sin(s.pulse))})`;ctx.fill();
        s.x+=s.vx;s.y+=s.vy;
        if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;
      });
      raf=requestAnimationFrame(draw);
    };
    resize();init();draw();
    addEventListener("resize",()=>{resize();init();});
    return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={cv} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav() {
  const [open,setOpen]=useState(false);
  const [sc,setSc]=useState(false);
  useEffect(()=>{
    const fn=()=>setSc(scrollY>8);
    addEventListener("scroll",fn);return()=>removeEventListener("scroll",fn);
  },[]);
  const go=(id)=>{ id?document.getElementById(id)?.scrollIntoView({behavior:"smooth"}):window.location.href="/"; setOpen(false); };
  const links=[["About",null],["Services","services-link"],["Data Security","pillars"],["Compliance","compliance"],["FAQ","faq"],["Contact","contact"]];
  return(<>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:sc?"rgba(9,15,30,.98)":"rgba(9,15,30,.92)",
      backdropFilter:"blur(12px)",borderBottom:`1px solid ${BORD}`,display:"flex",alignItems:"center",
      justifyContent:"space-between",padding:"0 48px",height:64,transition:"background .3s"}}>
      <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
        <span style={{color:G,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20}}>✕</span>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.15rem",letterSpacing:2,
          textTransform:"uppercase",color:"#fff"}}>FORFRA<span style={{color:G,fontWeight:500,fontSize:".82rem",letterSpacing:3,marginLeft:6}}>SOLUTIONS</span></span>
      </a>
      <ul className="dn" id="dnav" style={{display:"flex",gap:30,listStyle:"none"}}>
        {links.map(([l,id])=> l==="Services"
          ? <li key={l}><a className="nbtn" href="/services.html" style={{textDecoration:"none"}}>{l}</a></li>
          : <li key={l}><button className="nbtn" onClick={()=>go(id)}>{l}</button></li>
        )}
      </ul>
      <button className="ncta dn" id="dcta" onClick={()=>go("contact")}>Get in Touch</button>
      <button onClick={()=>setOpen(o=>!o)} aria-label="Menu" style={{display:"none",flexDirection:"column",gap:5,
        background:"none",border:"none",cursor:"pointer",padding:4}} className="dfl" id="hambtn">
        {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2,background:"#fff",borderRadius:2}}/>)}
      </button>
    </nav>
    {open&&<div style={{position:"fixed",top:64,left:0,right:0,zIndex:99,background:"#090f1e",padding:"20px 28px 28px",
      display:"flex",flexDirection:"column",gap:0,borderBottom:`1px solid ${BORD}`}}>
      {links.map(([l,id])=> l==="Services"
        ? <a key={l} className="moba" href="/services.html">{l}</a>
        : <button key={l} className="moba" onClick={()=>go(id)}>{l}</button>
      )}
      <button className="ncta" onClick={()=>go("contact")} style={{marginTop:16}}>Get in Touch</button>
    </div>}
    <style>{`@media(min-width:961px){#dnav{display:flex!important}#dcta{display:block!important}#hambtn{display:none!important}}`}</style>
  </>);
}

/* ══════════════════════════════════════════
   HERO  (with typewriter line)
══════════════════════════════════════════ */
function Hero() {
  const typed = useTypewriter(TYPED_WORDS);
  return(
    <section className="hpad" style={{minHeight:"94vh",background:"linear-gradient(160deg,#090f1e 0%,#0d1635 50%,#0a1a42 100%)",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",
      padding:"140px 48px 80px",position:"relative",overflow:"hidden",zIndex:1}}>

      <span className="au1" style={{display:"inline-block",border:"1px solid rgba(232,151,26,.5)",color:G,
        fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:600,letterSpacing:4,
        textTransform:"uppercase",padding:"7px 22px",borderRadius:20,marginBottom:32}}>ISO 27001:2022 CERTIFIED</span>

      <h1 className="au2" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,
        fontSize:"clamp(2.8rem,7vw,5.6rem)",lineHeight:.97,letterSpacing:-1,textTransform:"uppercase",color:"#fff"}}>
        UNBREACHABLE<br/><span className="shine-text">DATA PROTECTION.</span>
      </h1>

      {/* Typewriter line */}
      <div className="au3" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.3rem",
        letterSpacing:1,textTransform:"uppercase",color:G,marginTop:18,minHeight:"1.6em"}}>
        {typed}<span className="typecursor">&nbsp;</span>
      </div>

      <p className="au4" style={{fontFamily:"'Barlow',sans-serif",fontWeight:500,fontSize:"1.05rem",
        color:"rgba(255,255,255,.85)",maxWidth:600,margin:"18px auto 0",lineHeight:1.6,fontStyle:"italic"}}>
        "We build silent vaults for powerful minds — shielding your most confidential data with offline control."
      </p>

      <p className="au5" style={{fontFamily:"'Barlow',sans-serif",fontWeight:400,fontSize:"1rem",color:BODY,
        maxWidth:620,margin:"18px auto 0",lineHeight:1.7}}>
        We don't treat data as files. We treat it as high-value assets, protected with the discipline, secrecy, and layered control once reserved for royal treasuries — now delivered through modern air-gapped systems.
      </p>

      <div className="au6" style={{display:"flex",flexWrap:"wrap",gap:14,justifyContent:"center",marginTop:36}}>
        {["Air-Gapped Infrastructure","Zero Exposure Policy","DPDP Act 2023 Aligned","Section 63(4)(c) Compliant"].map(b=>(
          <span key={b} className="hbadge"><span style={{width:6,height:6,borderRadius:"50%",background:G}}/>{b}</span>
        ))}
      </div>

      <div className="au6" style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginTop:32}}>
        <button className="bgold" onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
          style={{border:"none",cursor:"pointer"}}>Request a Vault Assessment</button>
        <button className="bgh" onClick={()=>document.getElementById("pillars")?.scrollIntoView({behavior:"smooth"})}
          style={{border:"1px solid rgba(255,255,255,.3)",cursor:"pointer",background:"transparent"}}>Explore the Approach</button>
      </div>

      <div className="au7" style={{position:"absolute",bottom:22,left:"50%",transform:"translateX(-50%)",
        display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{color:"rgba(255,255,255,.45)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:".68rem",
          letterSpacing:3,textTransform:"uppercase"}}>Scroll</span>
        <div className="pulse" style={{width:1,height:40,background:`linear-gradient(to bottom,${G},transparent)`}}/>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER STAT
══════════════════════════════════════════ */
function CountStat({ stat }) {
  const [ref, val] = useCountUp(stat.num);
  return (
    <div ref={ref} style={{textAlign:"center"}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"2.6rem",color:"#000",lineHeight:1}}>
        {val}{stat.suffix}
      </div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".7rem",fontWeight:700,letterSpacing:2.5,
        textTransform:"uppercase",color:"rgba(0,0,0,.65)",marginTop:4}}>{stat.label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MARQUEE — industries served
══════════════════════════════════════════ */
function IndustryMarquee() {
  return (
    <div className="marquee-wrap" style={{overflow:"hidden",padding:"28px 0",borderTop:`1px solid ${BORD}`,borderBottom:`1px solid ${BORD}`}}>
      <div className="marquee-track">
        {INDUSTRIES.concat(INDUSTRIES).map((ind,i)=>(
          <span key={i} className="industry-chip" style={{
            flexShrink:0, margin:"0 10px", background:CBKG, border:`1px solid ${BORD}`,
            borderRadius:30, padding:"10px 22px", fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:".85rem", fontWeight:600, letterSpacing:.5, color:"rgba(255,255,255,.8)",
            whiteSpace:"nowrap",
          }}>{ind}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14,maxWidth:820,margin:"0 auto"}}>
      {FAQS.map((f,i)=>{
        const isOpen = openIdx === i;
        return (
          <div key={i} className="faq-item" style={{
            background:CBKG, border:`1px solid ${isOpen?"rgba(232,151,26,.35)":BORD}`,
            borderRadius:12, overflow:"hidden", cursor:"pointer",
          }} onClick={()=>setOpenIdx(isOpen?-1:i)}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:"1.02rem",
                color:"#fff",paddingRight:16}}>{f.q}</span>
              <span style={{flexShrink:0,width:26,height:26,borderRadius:"50%",border:`1px solid ${G}`,
                display:"flex",alignItems:"center",justifyContent:"center",color:G,fontSize:"1rem",fontWeight:700,
                transition:"transform .3s",transform:isOpen?"rotate(45deg)":"none"}}>+</span>
            </div>
            <div style={{
              maxHeight:isOpen?"200px":"0px", opacity:isOpen?1:0,
              transition:"max-height .35s ease,opacity .3s ease,padding .3s ease",
              padding:isOpen?"0 24px 22px":"0 24px",
            }}>
              <p style={{fontSize:".9rem",color:BODY,lineHeight:1.7}}>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   ORBIT VISUAL (replaces simple lock — adds outer ring rotation)
══════════════════════════════════════════ */
function OrbitLock() {
  return (
    <div className="floaty" style={{display:"flex",alignItems:"center",justifyContent:"center",position:"relative",height:260}}>
      <div className="spin-slow" style={{position:"absolute",width:210,height:210,
        border:"1px dashed rgba(232,151,26,.25)",borderRadius:"50%"}}>
        {[0,90,180,270].map(deg=>(
          <span key={deg} style={{position:"absolute",width:6,height:6,borderRadius:"50%",background:G,
            top:"50%",left:"50%",transform:`rotate(${deg}deg) translate(105px) rotate(-${deg}deg)`,
            marginTop:-3,marginLeft:-3}}/>
        ))}
      </div>
      <div className="spin-slow-rev" style={{position:"absolute",width:160,height:160,
        border:"1px solid rgba(232,151,26,.35)",borderRadius:"50%"}}/>
      <div style={{position:"absolute",width:160,height:160,border:"1px solid rgba(232,151,26,.35)",
        borderRadius:"50%",animation:"pulseRing 2.6s ease-out infinite"}}/>
      <div style={{position:"absolute",width:160,height:160,border:"1px solid rgba(232,151,26,.35)",
        borderRadius:"50%",animation:"pulseRing 2.6s ease-out infinite",animationDelay:".9s"}}/>
      <div style={{width:96,height:96,borderRadius:"50%",
        background:`linear-gradient(135deg,${G} 0%,${GL} 100%)`,display:"flex",alignItems:"center",
        justifyContent:"center",fontSize:40,position:"relative",zIndex:2,
        boxShadow:"0 0 40px rgba(232,151,26,.35)"}}>🔐</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════ */
function Rev({children,style={},cls="rv"}) {
  const ref=useReveal(cls);
  return <div ref={ref} style={style}>{children}</div>;
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function DataSecurityPage() {
  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=GLOBAL_CSS;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  const pillarsRef = useStagger();
  const compRef    = useStagger();
  const certRef    = useStagger();
  const lockRef    = useReveal("rvl");
  const procRef    = useReveal("rvr");

  return(
    <div style={{background:"#090f1e",minHeight:"100vh",position:"relative"}}>
      <Stars/>
      <Nav/>
      <Hero/>

      {/* INDUSTRY MARQUEE */}
      <section style={{background:"#0d1635",position:"relative",zIndex:1}}>
        <IndustryMarquee/>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="sp" style={{background:"#090f1e",padding:"100px 48px",position:"relative",zIndex:1}}>
        <Rev style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
            textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>THE ROYAL VAULT APPROACH</span>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.2vw,3.4rem)",
            textTransform:"uppercase",lineHeight:1.05,letterSpacing:-.5,color:"#fff"}}>
            SECRECY. ISOLATION. <span style={{color:G}}>CONTROL.</span>
          </h2>
          <div style={{width:48,height:3,background:G,borderRadius:2,margin:"20px auto"}}/>
          <p style={{fontFamily:"'Barlow',sans-serif",fontSize:".95rem",color:BODY,lineHeight:1.75,maxWidth:780,margin:"0 auto"}}>
            We follow a "royal vault" approach to data protection — inspired by how trusted advisors of ancient kingdoms safeguarded wealth with secrecy, limited access, and layered control. Combined with modern air-gapped systems, we create environments where data is not just stored, but strategically hidden, isolated, and accessible only to verified authorities.
          </p>
        </Rev>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="sp" style={{background:"#0d1635",padding:"80px 48px",position:"relative",zIndex:1}}>
        <Rev style={{maxWidth:1100,margin:"0 auto",textAlign:"center",marginBottom:48}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
            textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>CERTIFIED &amp; ACCOUNTABLE</span>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,3.6vw,3rem)",
            textTransform:"uppercase",lineHeight:1.05,color:"#fff"}}>
            OUR <span style={{color:G}}>ISO CERTIFICATIONS.</span>
          </h2>
        </Rev>
        <div ref={certRef} className="g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
          gap:24,maxWidth:900,margin:"0 auto"}}>
          {CERTS.map(c=>(
            <div key={c.code} style={{background:CBKG,border:"1px solid rgba(232,151,26,.25)",borderRadius:14,
              padding:"30px 28px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${G},transparent)`}}/>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <span style={{fontSize:30}}>🏅</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.3rem",color:G}}>{c.code}</span>
              </div>
              <h4 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.05rem",
                textTransform:"uppercase",color:"#fff",marginBottom:10}}>{c.name}</h4>
              <p style={{fontSize:".88rem",color:BODY,lineHeight:1.65}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="sp" style={{background:"#090f1e",padding:"100px 48px",position:"relative",zIndex:1}}>
        <Rev style={{maxWidth:1300,margin:"0 auto",textAlign:"center"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
            textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>HOW WE PROTECT YOUR DATA</span>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.2vw,3.4rem)",
            textTransform:"uppercase",lineHeight:1.05,color:"#fff"}}>
            FOUR PILLARS OF <span style={{color:G}}>THE VAULT.</span>
          </h2>
        </Rev>
        <div ref={pillarsRef} className="pgrid g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",
          gap:24,maxWidth:1300,margin:"64px auto 0"}}>
          {PILLARS.map(p=>(
            <div key={p.num} className="pillar" style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:12,
              padding:"36px 30px 32px"}}>
              <span className="pillar-num" style={{position:"absolute",top:14,right:22,
                fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"3.2rem",
                color:"rgba(255,255,255,.04)",lineHeight:1,pointerEvents:"none",transition:"color .35s"}}>{p.num}</span>
              <span style={{fontSize:30,marginBottom:18,display:"block"}}>{p.icon}</span>
              <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.2rem",
                textTransform:"uppercase",letterSpacing:.4,color:"#fff",marginBottom:14,lineHeight:1.2}}>{p.title}</h3>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                {p.items.map((it,i)=>(
                  <li key={i} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:".86rem",color:BODY,lineHeight:1.5}}>
                    <span style={{flexShrink:0,width:6,height:6,background:G,borderRadius:"50%",marginTop:6}}/>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS / ORBIT VISUAL + TIMELINE */}
      <section id="process" className="sp" style={{background:"#0d1635",padding:"100px 48px",position:"relative",zIndex:1}}>
        <div className="pgrid" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.3fr",
          gap:64,alignItems:"start"}}>

          <div ref={lockRef}>
            <OrbitLock/>
            <p style={{textAlign:"center",color:BODY,fontSize:".88rem",lineHeight:1.6,marginTop:20}}>
              Every layer of access is verified, logged, and traceable — from server room to courtroom.
            </p>
          </div>

          <div ref={procRef}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
              textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>OUR APPROACH IN ACTION</span>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(1.7rem,3vw,2.6rem)",
              textTransform:"uppercase",lineHeight:1.05,color:"#fff",marginBottom:8}}>
              FROM ISOLATION TO <span style={{color:G}}>ADMISSIBILITY.</span>
            </h2>
            <div style={{width:48,height:3,background:G,borderRadius:2,margin:"20px 0"}}/>

            <div style={{maxWidth:1000,position:"relative"}}>
              <div style={{position:"absolute",left:24,top:8,bottom:8,width:2,
                background:`linear-gradient(to bottom,${G},rgba(232,151,26,.1))`}}/>
              {TIMELINE.map((t,i)=>(
                <div key={t.n} style={{display:"flex",gap:28,marginBottom:i===TIMELINE.length-1?0:44,position:"relative"}}>
                  <div style={{flexShrink:0,width:50,height:50,borderRadius:"50%",background:CBKG,
                    border:`2px solid ${G}`,display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"1.2rem",color:G,
                    position:"relative",zIndex:1}}>{t.n}</div>
                  <div>
                    <h4 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.15rem",
                      textTransform:"uppercase",color:"#fff",marginBottom:8,paddingTop:10}}>{t.title}</h4>
                    <p style={{fontSize:".9rem",color:BODY,lineHeight:1.65,maxWidth:540}}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS — animated count-up */}
      <div className="stsp sg" style={{background:G,padding:"36px 48px",display:"flex",
        justifyContent:"center",gap:80,flexWrap:"wrap",position:"relative",zIndex:1}}>
        {STATS.map(s=><CountStat key={s.label} stat={s}/>)}
      </div>

      {/* COMPLIANCE */}
      <section id="compliance" className="sp" style={{background:"#090f1e",padding:"100px 48px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Rev style={{textAlign:"center",marginBottom:48}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
              textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>WHAT MAKES US DIFFERENT</span>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.2vw,3.4rem)",
              textTransform:"uppercase",lineHeight:1.05,color:"#fff"}}>
              SECURITY <span style={{color:G}}>WITH ACCOUNTABILITY.</span>
            </h2>
            <div style={{width:48,height:3,background:G,borderRadius:2,margin:"20px auto"}}/>
          </Rev>

          <Rev style={{background:CBKG2,border:`1px solid ${BORD}`,borderRadius:14,padding:"32px 36px",marginBottom:48}}>
            <p style={{color:BODY,fontSize:".95rem",lineHeight:1.75}}>
              We combine security with accountability — we don't just isolate data, we create controlled environments with strict access protocols, full chain of custody, and compliance with legal standards. This means your data isn't just safe — it's also admissible, traceable, and handled with complete integrity, something other companies don't focus on.
            </p>
          </Rev>

          <div ref={compRef} className="g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24}}>
            {COMPLIANCE.map(c=>(
              <div key={c.title} className="comp" style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:12,
                padding:"30px 28px"}}>
                <span style={{display:"inline-block",background:"rgba(232,151,26,.12)",color:G,
                  fontFamily:"'Barlow Condensed',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:2,
                  textTransform:"uppercase",padding:"5px 12px",borderRadius:12,marginBottom:14}}>{c.tag}</span>
                <h4 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.05rem",
                  textTransform:"uppercase",color:"#fff",marginBottom:12,lineHeight:1.25}}>{c.title}</h4>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                  {c.items.map((it,i)=>(
                    <li key={i} style={{fontSize:".85rem",color:BODY,lineHeight:1.5,paddingLeft:14,position:"relative"}}>
                      <span style={{position:"absolute",left:0,color:G,fontSize:".72rem",top:1}}>—</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Rev cls="rvs" style={{background:`linear-gradient(135deg,${CBKG} 0%,rgba(17,29,64,.5) 100%)`,
            border:"1px solid rgba(232,151,26,.25)",borderRadius:16,padding:"48px 44px",maxWidth:900,
            margin:"60px auto 0",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:G}}/>
            <h3 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:"1.5rem",
              textTransform:"uppercase",color:"#fff",marginBottom:16}}>
              NOT JUST SAFE. <span style={{color:G}}>ADMISSIBLE, TRACEABLE, COMPLETE.</span>
            </h3>
            <p style={{color:BODY,fontSize:".95rem",lineHeight:1.75}}>
              Our certified experts analyze, isolate, and protect financial and digital records to verify lawful conduct and provide court-admissible reports — ensuring your organization stays secure and legally defensible, even under regulatory scrutiny or law enforcement search.
            </p>
          </Rev>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sp" style={{background:"#0d1635",padding:"100px 48px",position:"relative",zIndex:1}}>
        <Rev style={{textAlign:"center",marginBottom:48}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,
            textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>QUESTIONS, ANSWERED</span>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.2vw,3.4rem)",
            textTransform:"uppercase",lineHeight:1.05,color:"#fff"}}>
            FREQUENTLY <span style={{color:G}}>ASKED.</span>
          </h2>
        </Rev>
        <FaqAccordion/>
      </section>

      {/* CTA */}
      <section id="contact" className="sp" style={{padding:"110px 48px",background:"#090f1e",textAlign:"center",
        position:"relative",zIndex:1,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,
          background:"radial-gradient(circle,rgba(232,151,26,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <Rev>
          <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:"clamp(2.2rem,4.5vw,3.8rem)",
            textTransform:"uppercase",color:"#fff",marginBottom:18,position:"relative",lineHeight:1.05}}>
            READY TO BUILD<br/><span style={{color:G}}>YOUR VAULT?</span>
          </h2>
          <p style={{fontFamily:"'Barlow',sans-serif",fontSize:".95rem",color:BODY,lineHeight:1.75,maxWidth:520,
            margin:"0 auto 36px",position:"relative"}}>
            Whether it's air-gapped infrastructure, controlled access, or court-admissible chain of custody — our certified team designs data security around your exact risk profile.
          </p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
            <a href="mailto:hello@forfrasolutions.com" className="bgold">Email Us</a>
            <a href="tel:+919711015337" className="bgh">+91 97110 15337</a>
          </div>
        </Rev>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#060c1a",borderTop:`1px solid ${BORD}`,padding:"28px 48px",display:"flex",
        alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,position:"relative",zIndex:1}}>
        <p style={{color:"rgba(255,255,255,.45)",fontSize:".8rem"}}>© 2025 Forfra Solutions. ISO 9001:2015 &amp; ISO 27001:2022 Certified.</p>
        <div style={{display:"flex",gap:24}}>
          <a href="mailto:hello@forfrasolutions.com" className="flink">hello@forfrasolutions.com</a>
          <a href="https://www.forfrasolutions.com" target="_blank" rel="noopener noreferrer" className="flink">forfrasolutions.com</a>
        </div>
      </footer>
    </div>
  );
}