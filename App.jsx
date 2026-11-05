import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines,
  BrainCircuit, BriefcaseBusiness, Check, ChevronRight, CircleHelp, Command,
  Compass, Cpu, Github, Lightbulb, Linkedin, Menu, MessageSquare, MousePointer2,
  Network, Play, Radio, Send, Sparkles, Terminal, X, Zap
} from "lucide-react";

const projects = [
  {
    id: "tokenwise", number: "01", title: "TokenWise AI", type: "AI SYSTEMS",
    status: "BUILDING", color: "mint",
    summary: "A practical experiment in making AI applications cheaper and more efficient without blindly sacrificing quality.",
    problem: "LLM applications can become expensive and slow when every request is sent to the same large model with the full context.",
    approach: ["Measure token usage and latency before optimizing.", "Route simple requests to smaller models and complex requests to stronger ones.", "Use semantic caching for repeated or similar questions.", "Evaluate quality, cost and response time together."],
    stack: ["Python", "FastAPI", "Local LLMs", "Semantic Search"],
    outcome: "Designed as an end-to-end portfolio project with measurable evaluation: cost per request, cache hit rate, latency and answer quality."
  },
  {
    id: "finx", number: "02", title: "FinX", type: "FINTECH / DATA",
    status: "PROJECT", color: "blue",
    summary: "An AI-driven financial companion concept focused on making personal and family financial information easier to understand.",
    problem: "Financial information is scattered across accounts, transactions and expenses. It is difficult to turn that information into useful decisions.",
    approach: ["Bring account and transaction information into one view.", "Organize expenses and income into understandable categories.", "Explore personalized insights based on financial behaviour.", "Design family-aware experiences with separate member views."],
    stack: ["Flutter", "Firebase", "Python", "Machine Learning"],
    outcome: "A product-thinking project spanning mobile UI, backend data design, financial workflows and ML experimentation."
  },
  {
    id: "credit", number: "03", title: "Credit Risk Lab", type: "MACHINE LEARNING",
    status: "EXPERIMENT", color: "violet",
    summary: "A model-building exercise focused on understanding risk signals, model performance and decision thresholds.",
    problem: "A model can look accurate while still making poor decisions on unseen data or across different customer segments.",
    approach: ["Explore and validate input features.", "Build a repeatable preprocessing and modelling pipeline.", "Evaluate with suitable metrics rather than accuracy alone.", "Inspect thresholds and the trade-off between false positives and false negatives."],
    stack: ["Python", "Pandas", "Scikit-learn", "Model Evaluation"],
    outcome: "A learning-led experiment emphasizing honest evaluation, interpretation and the limits of predictive models."
  }
];

const challenges = [
  { title: "Low conversion", prompt: "A product has 10,000 monthly visitors, but only 2% sign up. What would you investigate first?", hint: "Think about the funnel, user intent, friction and evidence before jumping to solutions." },
  { title: "Rising AI costs", prompt: "Your AI product's usage doubled, but its API bill increased by 4×. How would you bring costs under control?", hint: "Consider measurement, model routing, caching, context size and quality trade-offs." },
  { title: "Silent users", prompt: "A fitness app has strong downloads, but 70% of users stop opening it after week one. What would you do?", hint: "Separate activation from retention. Look for the moment users experience value." }
];

const navItems = [
  ["Overview", "overview"], ["How I Think", "thinking"], ["Projects", "projects"], ["Challenge Room", "challenge"], ["About", "about"]
];

function App() {
  const [page, setPage] = useState("overview");
  const [activeProject, setActiveProject] = useState(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hey! I'm the portfolio guide. Ask me about a project, how I approach problems, or what I'm learning." }]);

  const go = (next) => { setPage(next); setActiveProject(null); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const project = projects.find(p => p.id === activeProject);
  const challenge = challenges[challengeIndex];

  const sendChat = () => {
    const q = chatInput.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    let reply = "I approach unfamiliar problems by clarifying the goal, finding the evidence, testing a small idea and learning from the result. Explore the How I Think and Projects sections to see examples.";
    if (lower.includes("token") || lower.includes("ai")) reply = "TokenWise AI explores practical LLM efficiency: measure token use and latency, route requests by complexity, cache semantically similar prompts, and evaluate cost against answer quality.";
    else if (lower.includes("finx") || lower.includes("finance")) reply = "FinX is a financial companion concept. It brings accounts, transactions and expenses into one experience, with a focus on useful insights and family-aware workflows.";
    else if (lower.includes("credit") || lower.includes("risk") || lower.includes("machine")) reply = "The Credit Risk Lab is about building a repeatable ML pipeline and evaluating more than accuracy. I look at threshold trade-offs, false positives, false negatives and generalization.";
    else if (lower.includes("think") || lower.includes("process")) reply = "My loop is: understand the user and problem → identify what is unknown → form a testable hypothesis → build the smallest useful experiment → measure → iterate.";
    else if (lower.includes("contact") || lower.includes("hire")) reply = "I'd love to connect. Use the LinkedIn and GitHub links in the sidebar, or add your preferred email address to the contact section before submitting.";
    setMessages(m => [...m, { from: "you", text: q }, { from: "bot", text: reply }]);
    setChatInput("");
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="brand" onClick={() => go("overview")} role="button" tabIndex="0">
          <div className="brand-mark">O<span>.</span></div>
          <div><div className="brand-name">OMKAR<span>.OS</span></div><div className="brand-sub">PERSONAL OPERATING SYSTEM</div></div>
          <button className="mobile-close icon-btn" onClick={() => setMobileNav(false)}><X size={18}/></button>
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map(([label, key], i) => {
            const Icon = [Activity, BrainCircuit, BriefcaseBusiness, CircleHelp, Compass][i];
            return <button key={key} className={`nav-link ${page === key ? "active" : ""}`} onClick={() => go(key)}><Icon size={17}/><span>{label}</span>{page === key && <span className="nav-dot"/>}</button>;
          })}
        </nav>
        <div className="side-bottom">
          <div className="availability"><span className="pulse-dot"/> OPEN TO OPPORTUNITIES</div>
          <div className="side-profile"><div className="avatar">OD</div><div><strong>Omkar Dongare</strong><small>Builder in progress</small></div><button className="icon-btn" onClick={() => setChatOpen(true)}><MessageSquare size={16}/></button></div>
          <div className="socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setMobileNav(true)}><Menu size={19}/></button>
          <div className="breadcrumb"><span>OMKAR.OS</span><ChevronRight size={13}/><strong>{navItems.find(n => n[1] === page)?.[0] || "Project"}</strong></div>
          <div className="top-right"><span className="system-status"><span className="pulse-dot"/> SYSTEM ONLINE</span><span className="top-divider"/><span className="clock-label">BUILD MODE <span className="tiny-square"/></span></div>
        </header>

        <div className="content-wrap">
          <AnimatePresence mode="wait">
            {project ? <ProjectDetail key={project.id} project={project} back={() => setActiveProject(null)}/> :
              <motion.div key={page} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}>
                {page === "overview" && <Overview go={go} setChatOpen={setChatOpen} setActiveProject={setActiveProject}/>}
                {page === "thinking" && <Thinking/>}
                {page === "projects" && <Projects setActiveProject={setActiveProject}/>}
                {page === "challenge" && <ChallengeRoom challenge={challenge} index={challengeIndex} setIndex={setChallengeIndex} answer={answer} setAnswer={setAnswer} submitted={submitted} setSubmitted={setSubmitted}/>}
                {page === "about" && <About/>}
              </motion.div>}
          </AnimatePresence>
          <footer className="footer"><span>© 2026 OMKAR.OS</span><span>BUILT WITH CURIOSITY <span className="mint">✳</span></span><span>VERSION 1.0.0</span></footer>
        </div>
      </main>

      <AnimatePresence>
        {chatOpen && <motion.div className="chat-panel" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}}>
          <div className="chat-head"><div className="chat-avatar"><Sparkles size={17}/></div><div><strong>Portfolio Guide</strong><small><span className="pulse-dot"/> READY TO ANSWER</small></div><button className="icon-btn" onClick={() => setChatOpen(false)}><X size={18}/></button></div>
          <div className="chat-messages">{messages.map((m,i)=><div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>)}</div>
          <div className="chat-suggestions"><button onClick={() => setChatInput("Tell me about TokenWise AI")}>TokenWise AI</button><button onClick={() => setChatInput("How do you think?")}>How I think</button></div>
          <div className="chat-compose"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask me something..."/><button onClick={sendChat}><Send size={16}/></button></div>
        </motion.div>}
      </AnimatePresence>
      <button className="chat-fab" onClick={() => setChatOpen(true)}><Sparkles size={17}/><span>ASK MY OS</span></button>
    </div>
  );
}

function SectionHeading({eyebrow,title,description}) {
  return <div className="section-heading"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>;
}

function Overview({go,setChatOpen,setActiveProject}) {
  return <div className="page">
    <div className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/> INDEPENDENT THINKER. CONSTANT BUILDER.</div>
        <h1>I turn <span className="outline-text">curiosity</span><br/>into things that <span className="mint">work.</span></h1>
        <p className="hero-desc">I'm Omkar — a developer and data science student who enjoys exploring problems, building practical solutions and learning in public.</p>
        <div className="hero-actions"><button className="primary-btn" onClick={() => go("projects")}>EXPLORE MY WORK <ArrowUpRight size={16}/></button><button className="text-btn" onClick={() => go("thinking")}>HOW I THINK <ArrowRight size={15}/></button></div>
        <div className="hero-meta"><span><span className="pulse-dot"/> AVAILABLE FOR WHAT'S NEXT</span><span>BASED IN INDIA</span></div>
      </div>
      <div className="hero-visual">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-core"><div className="core-inner"><BrainCircuit size={43}/><span>IDEA → ACTION</span></div></div>
        <div className="float-card card-top"><span className="mini-icon"><Lightbulb size={15}/></span><div><small>CURRENT MODE</small><strong>Curiosity: ON</strong></div></div>
        <div className="float-card card-bottom"><span className="mini-icon"><Terminal size={15}/></span><div><small>DEFAULT ACTION</small><strong>Build → Learn → Repeat</strong></div></div>
        <div className="visual-coordinate">19°04' N / 72°52' E<br/>THINKING IN PUBLIC</div>
      </div>
    </div>

    <div className="metrics-row">
      <div className="metric"><span className="metric-number">01</span><span className="metric-label">CURIOSITY<br/>BEFORE CERTAINTY</span></div>
      <div className="metric"><span className="metric-number">02</span><span className="metric-label">BUILD<br/>TO UNDERSTAND</span></div>
      <div className="metric"><span className="metric-number">03</span><span className="metric-label">MEASURE<br/>WHAT MATTERS</span></div>
      <div className="metric"><span className="metric-number">∞</span><span className="metric-label">ALWAYS<br/>LEARNING</span></div>
    </div>

    <div className="section-block">
      <div className="block-top"><div><div className="eyebrow"><span className="eyebrow-line"/> SELECTED BUILDS</div><h2>Things I've been thinking about.</h2></div><button className="text-btn" onClick={() => go("projects")}>VIEW ALL <ArrowUpRight size={15}/></button></div>
      <div className="project-grid">{projects.map(p=><ProjectCard key={p.id} project={p} onClick={()=>setActiveProject(p.id)}/>)}</div>
    </div>

    <div className="manifesto">
      <div className="manifesto-symbol"><AudioLines size={30}/></div>
      <div><div className="eyebrow">A SMALL MANIFESTO</div><h2>Potential is interesting.<br/><span className="mint">Proof is better.</span></h2><p>I'd rather show you a working experiment, a thoughtful failure or a useful question than give you a long list of adjectives.</p></div>
      <button className="manifesto-link" onClick={() => go("thinking")}>SEE HOW I THINK <ArrowUpRight size={16}/></button>
    </div>
    <div className="challenge-banner"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR TURN</div><h2>Give me a problem.<br/>I'll show you my process.</h2><p>Step into the Challenge Room and explore how I break down an unfamiliar problem.</p></div><button className="round-arrow" onClick={() => go("challenge")}><ArrowUpRight size={24}/></button><div className="banner-grid"/></div>
  </div>;
}

function ProjectCard({project:p,onClick}) {
  return <button className={`project-card ${p.color}`} onClick={onClick}>
    <div className="project-card-top"><span>{p.number} / {p.type}</span><ArrowUpRight size={17}/></div>
    <div className="project-art">{p.id==="tokenwise"?<><div className="art-chip">LLM</div><div className="art-lines"><i/><i/><i/><i/></div><div className="art-node">↗</div></>:p.id==="finx"?<><div className="finx-circle">₹</div><div className="finx-bars"><i/><i/><i/><i/><i/></div></>:<><div className="risk-ring">RISK<br/><b>↓</b></div><div className="risk-points"><i/><i/><i/><i/><i/><i/></div></>}</div>
    <div className="project-card-bottom"><div><span className="status">{p.status}</span><h3>{p.title}</h3><p>{p.summary}</p></div><span className="card-arrow"><ArrowUpRight size={17}/></span></div>
  </button>;
}

function Projects({setActiveProject}) {
  return <div className="page inner-page"><SectionHeading eyebrow="THE BUILD LOG / 001—003" title={<>Curiosity, made <span className="mint">tangible.</span></>} description="A selection of projects and experiments. Each one starts with a question worth exploring."/><div className="project-grid projects-page">{projects.map(p=><ProjectCard key={p.id} project={p} onClick={()=>setActiveProject(p.id)}/>)}</div><div className="note-strip"><Lightbulb size={18}/><span>These are honest project summaries. Add live demos, GitHub repositories and verified metrics before sharing the portfolio.</span></div></div>;
}

function ProjectDetail({project:p,back}) {
  return <motion.div className="page inner-page" initial={{opacity:0,x:12}} animate={{opacity:1,x:0}}>
    <button className="back-btn" onClick={back}><ArrowLeft size={15}/> BACK TO PROJECTS</button>
    <div className="detail-head"><div><div className="eyebrow"><span className="eyebrow-line"/> PROJECT / {p.number}</div><span className="status">{p.status} · {p.type}</span><h1>{p.title}<span className="mint">.</span></h1><p>{p.summary}</p></div><div className={`detail-art ${p.color}`}><Network size={58}/><span>IDEA / SYSTEM / IMPACT</span></div></div>
    <div className="detail-columns"><div className="detail-main"><div className="detail-section"><span className="detail-index">01 — THE PROBLEM</span><h2>Why this exists</h2><p>{p.problem}</p></div><div className="detail-section"><span className="detail-index">02 — THE APPROACH</span><h2>How I'd tackle it</h2><ol className="approach-list">{p.approach.map((a,i)=><li key={a}><span>0{i+1}</span>{a}</li>)}</ol></div><div className="detail-section"><span className="detail-index">03 — THE LEARNING</span><h2>What matters</h2><p>{p.outcome}</p></div></div><aside className="detail-aside"><span className="detail-index">TOOLS / STACK</span><div className="stack-list">{p.stack.map(s=><span key={s}>{s}</span>)}</div><div className="aside-callout"><Zap size={18}/><strong>Build note</strong><p>Replace this overview with screenshots, a live demo, a repository link and real evaluation results wherever available.</p></div></aside></div>
  </motion.div>;
}

function Thinking() {
  const steps = [
    ["01","Understand the human","Who has the problem? When does it happen? What does success actually look like?"],
    ["02","Find the unknowns","Separate facts from assumptions. Identify the information that could change the direction."],
    ["03","Make a testable bet","Write a hypothesis that can be challenged with evidence, not just enthusiasm."],
    ["04","Build the smallest test","Create a prototype, analysis or experiment that can produce a useful signal quickly."],
    ["05","Measure and adapt","Look at what happened, what surprised me and what should change next."]
  ];
  return <div className="page inner-page"><SectionHeading eyebrow="MY DEFAULT OPERATING LOOP" title={<>Thinking is a <span className="mint">skill.</span></>} description="I don't expect to know everything at the start. I want to get better at asking the right question, testing assumptions and learning quickly."/><div className="thinking-layout"><div className="thinking-flow">{steps.map(([n,t,d],i)=><div className="thinking-step" key={n}><div className="step-number">{n}</div><div className="step-content"><h3>{t}</h3><p>{d}</p></div><div className="step-icon">{[<Compass/>,<CircleHelp/>,<Lightbulb/>,<Terminal/>,<Activity/>][i]}</div></div>)}</div><aside className="thinking-aside"><div className="eyebrow">A RULE I TRY TO FOLLOW</div><div className="big-quote">Don't fall in love with the first solution.</div><p>Stay close to the problem. Be willing to change your mind when the evidence says so.</p><div className="quote-mark">“</div></aside></div><div className="principles"><div><span>01</span><strong>Curiosity over ego</strong><p>Ask before assuming.</p></div><div><span>02</span><strong>Evidence over hype</strong><p>Measure before claiming.</p></div><div><span>03</span><strong>Progress over perfection</strong><p>Ship, learn, improve.</p></div></div></div>;
}

function ChallengeRoom({challenge,index,setIndex,answer,setAnswer,submitted,setSubmitted}) {
  const next = () => {setIndex((index+1)%challenges.length);setAnswer("");setSubmitted(false);};
  return <div className="page inner-page"><SectionHeading eyebrow="INTERACTIVE THINKING EXERCISE" title={<>Welcome to the <span className="mint">Challenge Room.</span></>} description="No perfect answers. I care about the questions you ask, the assumptions you challenge and how you decide what to do next."/><div className="challenge-layout"><div className="challenge-main"><div className="challenge-top"><span><Radio size={14}/> LIVE SCENARIO</span><span>CHALLENGE 0{index+1} / 0{challenges.length}</span></div><div className="challenge-number">0{index+1}</div><h2>{challenge.title}<span className="mint">.</span></h2><p className="challenge-prompt">{challenge.prompt}</p><div className="input-label">YOUR APPROACH <span>THINK OUT LOUD</span></div><textarea value={answer} onChange={e=>{setAnswer(e.target.value);setSubmitted(false)}} placeholder="I'd start by...&#10;&#10;The first thing I'd want to understand is..."></textarea><div className="challenge-actions"><button className="primary-btn" disabled={!answer.trim()} onClick={()=>setSubmitted(true)}>SUBMIT MY THINKING <ArrowUpRight size={15}/></button><button className="text-btn" onClick={next}>NEXT SCENARIO <ArrowRight size={15}/></button></div>{submitted&&<div className="feedback"><Check size={17}/><div><strong>Thinking captured.</strong><p>Good thinking starts with making your assumptions visible. Review your answer: did you define the problem, identify missing evidence, prioritize an action and decide how to measure success?</p></div></div>}</div><aside className="challenge-side"><div className="eyebrow">A SMALL HINT</div><p>{challenge.hint}</p><div className="hint-divider"/><div className="eyebrow">WHAT I'M LOOKING FOR</div>{["Problem framing","Useful questions","Prioritization","Measurable next step"].map((s,i)=><div className="check-row" key={s}><span>0{i+1}</span>{s}</div>)}</aside></div><p className="disclaimer">This is a self-guided exercise, not an automated assessment. The value is in making your reasoning visible.</p></div>;
}

function About() {
  return <div className="page inner-page"><SectionHeading eyebrow="A LITTLE CONTEXT" title={<>Still learning. Always <span className="mint">building.</span></>} description="I'm Omkar Dongare, based in India. My interests sit at the intersection of software, data, AI and products that solve real problems."/><div className="about-grid"><div className="about-card about-main"><div className="eyebrow">THE SHORT VERSION</div><h2>I like the space between “what if?” and “it works.”</h2><p>I'm currently pursuing Data Science and building my skills through hands-on projects. I enjoy moving between technical implementation and the bigger question: who does this help, and how will we know?</p><p>This site is my working notebook — a place to show what I'm exploring, what I'm building and how my thinking changes along the way.</p></div><div className="about-card"><div className="eyebrow">AREAS I'M EXPLORING</div><div className="interest-list">{["Artificial Intelligence","Data Science & Analytics","Backend Engineering","Product Thinking","Experimentation & Growth"].map((s,i)=><div key={s}><span>0{i+1}</span>{s}</div>)}</div></div></div><div className="contact-card"><div><div className="eyebrow">HAVE A GOOD PROBLEM?</div><h2>Let's figure it out.</h2><p>I'm interested in thoughtful teams, ambitious problems and opportunities to learn by building.</p></div><a className="primary-btn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN <ArrowUpRight size={16}/></a></div><div className="note-strip"><Lightbulb size={18}/><span>Before publishing: replace the generic social links with your real profiles and add a contact email if you want recruiters to reach you directly.</span></div></div>;
}

export default App;
