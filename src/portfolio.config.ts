import type { PortfolioConfig } from './types.ts';

/*
  ============================================================
  THIS IS THE ONLY FILE YOU NEED TO EDIT.
  ============================================================
  1. Replace every example below with your own details.
  2. Put your photos and video in /public/media.
  3. Tip: wrap a word in *asterisks* in any title to make it italic serif.
     Example: 'Hi, I\'m *Alex.*'
  Save, and the site updates instantly while `npm run dev` is running.
*/

const config: PortfolioConfig = {
  site: {
    title: 'Alex Morgan | Senior DevOps Engineer',
    description: 'Senior DevOps Engineer. I build reliable platforms on AWS and Kubernetes.',
    logo: 'Alex Morgan',
    // One accent colour. Everything else stays black and white.
    accent: '#F5A623',
    // Keeps a small "Template by Vishal Nigam" link in the footer. Set to false to remove it.
    showCredit: true,
    // Optional: a "Download resume" button. Upload a resume WITHOUT your phone or home address.
    // resumePdf: 'media/resume.pdf',
  },

  hero: {
    eyebrow: 'Senior DevOps Engineer / AWS and Kubernetes',
    title: 'Platform *Engineer.*',
    intro: 'I build cloud platforms that ship fast and stay up. Currently helping teams run Kubernetes at scale.',
    backdropWord: 'ALEX',
    // Your animated hero. Full guide: README, "Create your animated hero".
    // Path 1 (image only): video: '', poster: 'media/hero.jpg'
    // Path 2 (talking video): video: 'media/hero.mp4', poster: 'media/hero.jpg'
    video: '',
    poster: '',
    // Optional: the same video with a transparent background (.webm) so your name shows around you.
    videoTransparent: '',
    posterTransparent: '',
    primaryCta: { label: 'See my work', href: '#work' },
    secondaryCta: { label: 'Download resume', href: 'media/resume.pdf' },
    quickFacts: [
      { value: '7+ yrs', label: 'in cloud and DevOps' },
      { value: '99.95%', label: 'uptime on the platforms I run' },
    ],
  },

  about: {
    greeting: "Hi, I'm *Alex.*",
    paragraphs: [
      'I make cloud platforms boring, in the best way. Predictable deploys, quiet pagers, happy developers.',
      'Right now I run the Kubernetes platform for a fintech team of 80 engineers. Before that, I moved a monolith from on-prem to AWS.',
      'Outside work I write about infrastructure as code and mentor junior engineers.',
    ],
    buttons: [
      { label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/your-profile' },
      { label: 'View GitHub', href: 'https://github.com/your-username' },
    ],
    facts: [
      { label: 'Based in', value: 'Toronto, ON' },
      { label: 'Focus', value: 'Platform engineering' },
      { label: 'Cloud', value: 'AWS, Azure' },
      { label: 'Open to', value: 'Senior and lead roles' },
    ],
    badge: {
      org: 'Platform Team',
      // A square headshot. Example: 'media/headshot.jpg'
      photo: '',
      role: 'DevOps Engineer',
      idNumber: 'DO-0420-TO',
      back: [
        { label: 'Region', value: 'us-east-1' },
        { label: 'Access', value: 'Production' },
        { label: 'On-call', value: 'Weekly' },
        { label: 'Since', value: '2018' },
      ],
    },
  },

  skills: {
    title: 'Tools of the *trade.*',
    subtitle: 'My periodic table. Hover any element.',
    // Each column of the table. Add, remove, or rename.
    groups: [
      { id: 'cloud', label: 'Cloud' },
      { id: 'iac', label: 'IaC' },
      { id: 'containers', label: 'Containers' },
      { id: 'cicd', label: 'CI/CD' },
      { id: 'observe', label: 'Observability' },
      { id: 'code', label: 'Code' },
    ],
    // symbol = 1 or 2 letters. group must match an id above. note is optional.
    elements: [
      { symbol: 'Aw', name: 'AWS', group: 'cloud', note: 'Primary cloud. 6 years.' },
      { symbol: 'Az', name: 'Azure', group: 'cloud' },
      { symbol: 'Ia', name: 'IAM', group: 'cloud', note: 'Least privilege, always.' },
      { symbol: 'Vp', name: 'VPC', group: 'cloud' },
      { symbol: 'Tf', name: 'Terraform', group: 'iac', note: 'Every resource in code.' },
      { symbol: 'An', name: 'Ansible', group: 'iac' },
      { symbol: 'Pu', name: 'Pulumi', group: 'iac' },
      { symbol: 'K8', name: 'Kubernetes', group: 'containers', note: 'Ran 40+ clusters.' },
      { symbol: 'Dk', name: 'Docker', group: 'containers' },
      { symbol: 'Hm', name: 'Helm', group: 'containers' },
      { symbol: 'Gh', name: 'GitHub Actions', group: 'cicd' },
      { symbol: 'Ac', name: 'Argo CD', group: 'cicd', note: 'GitOps for every app.' },
      { symbol: 'Jk', name: 'Jenkins', group: 'cicd' },
      { symbol: 'Pr', name: 'Prometheus', group: 'observe' },
      { symbol: 'Gf', name: 'Grafana', group: 'observe' },
      { symbol: 'Dd', name: 'Datadog', group: 'observe' },
      { symbol: 'Py', name: 'Python', group: 'code' },
      { symbol: 'Go', name: 'Go', group: 'code' },
      { symbol: 'Sh', name: 'Bash', group: 'code' },
    ],
  },

  // Your work history. Delete this whole block to hide the section.
  // Tip: let Claude fill this from your resume. See README, "Build it with Claude".
  experience: {
    title: 'Seven years, *one thread.*',
    subtitle: 'Making platforms boring, in the best way.',
    jobs: [
      {
        role: 'Senior Platform Engineer',
        company: 'Example Fintech Inc.',
        location: 'Toronto, ON',
        start: '03/2022',
        end: 'Present',
        summary: 'I run the Kubernetes platform for a team of 80 engineers.',
        highlights: [
          'Built a self-service platform so teams create namespaces, pipelines and dashboards on their own. Setup time went from 3 days to 10 minutes.',
          'Moved 40+ services to GitOps with Argo CD, so every change is reviewed and every deploy can be rolled back.',
          'Rebuilt alerting across 60 services. Mean time to detect dropped from 20 minutes to 3.',
          'Mentor four junior engineers through on-call and design reviews.',
        ],
        stack: ['EKS', 'Terraform', 'Argo CD', 'Prometheus'],
      },
      {
        role: 'DevOps Engineer',
        company: 'Example Retail Co.',
        location: 'Toronto, ON',
        start: '06/2018',
        end: '03/2022',
        highlights: [
          'Led the move of a 10-year-old monolith and 42 services from on-prem to AWS with zero downtime.',
          'Cut infrastructure cost by about 30% in the first year after the migration.',
        ],
        stack: ['AWS', 'Terraform', 'Docker', 'Jenkins'],
      },
    ],
    earlier: [{ role: 'Systems Administrator', company: 'Example Hosting', years: '2016 – 2018' }],
    education: [{ degree: 'B.Sc., Computer Science', school: 'Example University', years: '2012 – 2016' }],
  },

  // Leave as [] to hide this section.
  certifications: [
    { name: 'AWS Certified Solutions Architect, Professional', issuer: 'AWS', year: '2024' },
    { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', year: '2023' },
    { name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', year: '2022' },
  ],

  projects: [
    {
      title: 'Self-service Kubernetes platform',
      tagline: 'From ticket to cluster in 10 minutes.',
      description:
        'Built an internal platform so teams can create namespaces, pipelines, and dashboards on their own. Cut setup time from 3 days to 10 minutes.',
      stack: ['EKS', 'Terraform', 'Argo CD', 'Backstage'],
      status: 'In production',
      link: { label: 'Read the write-up', href: 'https://example.com' },
    },
    {
      title: 'On-prem to AWS migration',
      tagline: '42 services. Zero downtime.',
      description: 'Led the move of a 10-year-old monolith and its services to AWS. Saved about 30% on infrastructure cost.',
      stack: ['AWS', 'Terraform', 'Docker', 'RDS'],
      status: 'Shipped',
    },
    {
      title: 'Cost guardrails bot',
      tagline: 'Catches waste before the bill does.',
      description: 'A Slack bot that flags idle resources and oversized instances every morning.',
      stack: ['Python', 'Lambda', 'Slack API'],
      status: 'Open source',
      link: { label: 'View on GitHub', href: 'https://github.com/your-username' },
    },
    {
      title: 'Observability stack',
      tagline: 'One place to see everything.',
      description: 'Standardized metrics, logs, and alerts across 60 services. Mean time to detect dropped from 20 minutes to 3.',
      stack: ['Prometheus', 'Grafana', 'Loki'],
      status: 'In production',
    },
  ],

  moments: {
    title: 'Proud *moments.*',
    subtitle: 'Keep scrolling.',
    items: [
      { value: '40', unit: 'clusters', title: 'Running in production', detail: 'Across three regions, with GitOps for every one.' },
      { value: '3', unit: 'min', title: 'Mean time to detect', detail: 'Down from 20 minutes after the observability rebuild.' },
      { value: '30', unit: '%', title: 'Cloud cost saved', detail: 'In the first year after the AWS migration.' },
      { value: '12', unit: 'mentees', title: 'Engineers mentored', detail: 'Four of them now lead their own platform teams.' },
      { value: '1st', title: 'Conference talk', detail: 'Spoke about platform engineering at a local DevOps meetup.' },
    ],
  },

  contact: {
    title: "Let's *talk.*",
    text: 'Hiring for a platform or DevOps role? Or just want to talk Kubernetes? My inbox is open.',
    email: 'you@example.com',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-profile' },
      { label: 'GitHub', href: 'https://github.com/your-username' },
      { label: 'Resume', href: 'media/resume.pdf' },
    ],
  },
};

export default config;
