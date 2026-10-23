// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Venkata Abhinav Kumar Gupta Gunda',
  short: 'Abhinav Gunda',
  handle: 'abhinav',
  roles: ['Security Engineer', 'AI Red Teamer', 'Penetration Tester', 'LLM Security Researcher'],
  location: 'Proddatur, Andhra Pradesh, India',
  email: 'gunda.abhinav26@gmail.com',
  linkedin: 'https://www.linkedin.com/in/venkata-abhinav-kumar-gupta-5a9278372',
  github: 'https://github.com/abhinav260506',
  resume: './Abhinav_Gunda_Resume.pdf',
  summary:
    'I break systems so they can be rebuilt stronger. Offensive security engineer working where classic VA/PT meets the new attack surface of LLMs, RAG pipelines and autonomous AI agents.',
}

export const stats = [
  { value: 3, suffix: '', label: 'AI security systems built' },
  { value: 42, suffix: '%', label: 'False-positive reduction' },
  { value: 92, suffix: '%', label: 'Utility kept under attack' },
  { value: 100, prefix: '<', suffix: 'ms', label: 'Injection detection latency' },
]

export const experience = [
  {
    company: 'VIC IT Consulting',
    role: 'Security Engineer Intern',
    location: 'Johannesburg, South Africa · Remote',
    tools: ['Burp Suite', 'Nmap', 'Acunetix', 'Kali Linux'],
    points: [
      'Executed Vulnerability Assessments and Penetration Testing (VA/PT) across web applications, network infrastructure and cloud environments.',
      'Performed targeted reconnaissance in Kali Linux to surface OWASP Top 10 vulnerabilities — SQLi, XSS, Broken Authentication — and drafted enterprise remediation reports.',
      'Assisted in real-time threat evaluation and attack-vector analysis to harden client infrastructure and streamline internal SecOps testing lifecycles.',
    ],
    scope: ['Web Apps', 'Network', 'Cloud'],
  },
]

export const projects = [
  {
    id: 'CASE-001',
    name: 'OSINT-Threat Intelligence',
    tagline: 'Automated OSINT Threat Intelligence & Knowledge Graph Engine',
    period: 'May 2026 — Aug 2026',
    status: 'ACTIVE REPO',
    severity: 'CRITICAL',
    github: 'https://github.com/abhinav260506/osint-threat-intelligence-graph',
    demo: 'https://github.com/abhinav260506/osint-threat-intelligence-graph#readme',
    stack: ['FastAPI', 'Neo4j', 'Cytoscape.js', 'Python', 'React', 'Docker'],
    summary:
      'An end-to-end OSINT Threat Intelligence knowledge graph mapping raw advisories (CISA/Mandiant) into STIX 2.1 property graphs in Neo4j with automated IoC extraction and hybrid ML clustering.',
    chain: ['OSINT Ingestion', 'IoC Extraction', 'Neo4j (STIX 2.1)', 'HDBSCAN Analytics', 'Threat Intel UI'],
    attacks: ['Shared C2 infrastructure detection', 'APT campaign correlation', 'Defanged IoC extraction', 'Multi-hop attack chain discovery'],
    points: [
      'Architected an end-to-end OSINT Threat Intelligence Knowledge Graph mapping raw advisories (CISA/Mandiant) into STIX 2.1 property graphs in Neo4j.',
      'Engineered an automated extraction and defanging pipeline achieving 98.4% recall on network indicators and 100% on cryptographic hashes.',
      'Built hybrid ML + Graph Data Science analytics (HDBSCAN + Jaccard + Louvain) achieving 94.7% candidate discovery recall to uncover hidden C2 infrastructure across APT campaigns.',
    ],
    metric: { value: '98.4%', label: 'IoC extraction recall' },
  },
  {
    id: 'CASE-002',
    name: 'Surgical-Guard',
    tagline: 'Semantic Middleware for AI Agent Security',
    period: 'Jan 2026 — Apr 2026',
    status: 'ACTIVE REPO',
    severity: 'HIGH',
    github: 'https://github.com/abhinav260506/Surgical-Guard-',
    demo: 'https://github.com/abhinav260506/Surgical-Guard-#readme',
    stack: ['Transformers.js', 'Chrome API', 'WebAssembly'],
    summary:
      'A browser-based AI firewall that stops indirect prompt injection and data exfiltration before hostile content reaches an autonomous agent.',
    chain: ['Web Content', 'Semantic Engine', 'I2D Transmutation', 'Safe Agent'],
    attacks: ['Indirect prompt injection', 'Role-shift hijacking', 'Paraphrased attacks', 'Data exfiltration'],
    points: [
      'Architected a browser-based AI firewall mitigating IPI and data exfiltration in LLM-integrated autonomous workflows.',
      'Local-first semantic engine on Transformers.js performs real-time intent analysis, catching paraphrased and role-shift attacks in under 100ms.',
      'Instruction-to-Data (I2D) Transmutation neutralises hostile instructions into passive data while preserving 92% system utility.',
    ],
    metric: { value: '<100ms', label: 'On-device detection' },
  },
  {
    id: 'CASE-003',
    name: 'Agentic Threat Orchestrator',
    tagline: 'Multimodal Cyber-Physical Threat Detection',
    period: 'Oct 2025 — Dec 2025',
    status: 'SOC VERIFIED',
    severity: 'HIGH',
    github: 'https://github.com/abhinav260506/Agentic-Threat-Orchestrator',
    demo: 'https://github.com/abhinav260506/Agentic-Threat-Orchestrator#soc-auditability',
    stack: ['Gemini', 'Random Forest', 'OpenCV', 'ChromaDB', 'Flask'],
    summary:
      'A decentralised multi-agent system correlating network telemetry with surveillance feeds to catch attacks that span the digital and physical worlds.',
    chain: ['Network Telemetry', 'Perception Agents', 'Cross-Modal Fusion', 'XAI SOC Report'],
    attacks: ['Brute-force logins', 'Unauthorised facility entry', 'Cyber-physical attack chains'],
    points: [
      'Decentralised multi-agent system using Gemini and Random Forest for cross-modal correlation of network telemetry and video.',
      'Perception agents identify cyber-physical attack chains (e.g. brute-force logins paired with unauthorised entry), cutting false positives by 42%.',
      'Explainable-AI pipeline in Flask produces verifiable chain-of-thought logs for automated SOC audit reports.',
    ],
    metric: { value: '-42%', label: 'False positive rate' },
  },
]

export const skills = [
  {
    group: 'Offensive Security',
    code: 'OFFSEC',
    items: ['Penetration Testing', 'VA/PT', 'OWASP Top 10', 'Reconnaissance', 'Network Security', 'Burp Suite', 'Nmap', 'Acunetix', 'Kali Linux'],
  },
  {
    group: 'AI / LLM Security',
    code: 'AISEC',
    items: ['LLM Red Teaming', 'Prompt Injection (IPI)', 'RAG Security', 'Data Exfiltration Defense', 'Transformers.js', 'ChromaDB', 'Ollama'],
  },
  {
    group: 'Defense & Monitoring',
    code: 'BLUE',
    items: ['Splunk', 'Wireshark', 'Threat Analysis', 'SOC Reporting', 'Explainable AI'],
  },
  {
    group: 'Engineering',
    code: 'DEV',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'ReactJS', 'WebAssembly', 'Chrome Extensions', 'FastAPI', 'Flask', 'Git', 'Firebase', 'MySQL', 'Firestore'],
  },
]

export const certifications = [
  {
    title: 'Cybersecurity & Ethical Hacking',
    issuer: 'iHUB DivyaSampark, IIT Roorkee × Intellipaat',
    url: 'https://tih.iitr.ac.in/certificate/intellipaat/IPTIH26080025.jpg',
  },
  {
    title: 'IBM Cybersecurity Analyst',
    issuer: 'IBM SkillsBuild',
    url: 'https://courses.vit.skillsnetwork.site/certificates/4d3ff90deb29406b9b2dfb49e98108dc',
  },
  {
    title: 'Cybersecurity Job Simulations',
    issuer: 'Deloitte Australia & Tata · Forage (Aug 2025)',
  },
  {
    title: 'AWS Cloud Technology Training',
    issuer: 'Sri Sathya Sai Seva Organizations (Jul — Aug 2025)',
    url: 'https://drive.google.com/file/d/1OhRBZXhao9A1a1H8lbq-4tm0gKCUDSyT/view?usp=drive_link',
  },
  {
    title: 'Adobe Hackathon',
    issuer: 'Offline-first document intelligence: hierarchy extraction & PDF QA',
  },
]

export const education = [
  { school: 'Vellore Institute of Technology', detail: 'B.Tech, Computer Science & Engineering', score: 'CGPA 7.95', period: 'Aug 2023 — Present', place: 'Chennai, TN' },
  { school: 'Turito Junior College', detail: 'Intermediate (M.P.C)', score: '92.7%', period: 'Jun 2021 — Apr 2023', place: 'Hyderabad, TS' },
  { school: 'Narayana Olympiad School', detail: 'Secondary School Certificate', score: 'GPA 9.9 / 10', period: 'Jul 2020 — May 2021', place: 'Proddatur, AP' },
]

export const languages = ['Telugu (Native)', 'English (Fluent)', 'Hindi (Intermediate)', 'German (Basic)']

export const platforms = [
  {
    name: 'TryHackMe',
    tag: 'OFFSEC LABS',
    role: 'Offensive Security & Red Teaming',
    handle: 'abhinav26',
    url: 'https://tryhackme.com/p/abhinav260506',
    badge: 'Active Rank',
    stats: 'Rooms: VA/PT, Web Fundamentals, Network Security',
  },
  {
    name: 'Hack The Box',
    tag: 'PEN-TESTING',
    role: 'Privilege Escalation & Machine Exploitation',
    handle: 'abhinav',
    url: 'https://app.hackthebox.com',
    badge: 'Security Labs',
    stats: 'Focus: Linux/Windows Exploits & CTFs',
  },
  {
    name: 'PortSwigger Web Security',
    tag: 'APPSEC ACADEMY',
    role: 'OWASP Top 10 Exploitation & Defense',
    handle: 'Practitioner',
    url: 'https://portswigger.net/web-security',
    badge: 'Burp Suite Lab',
    stats: 'SQLi, XSS, SSRF, Auth Bypass & Token Manipulation',
  },
]
