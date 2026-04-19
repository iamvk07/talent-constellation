// Mock data for Talent Constellation visualization
// Represents the diversity of talent that Enabled Talent connects

export const EMPLOYERS = [
  {
    id: 'emp-1',
    type: 'employer',
    name: 'Shopify',
    industry: 'E-Commerce Tech',
    description: 'Global e-commerce platform committed to inclusive hiring and accessible workplaces.',
    roles: ['Frontend Engineer', 'Product Designer', 'Data Analyst'],
    accommodations: ['Remote-first', 'Flexible hours', 'Screen reader compatible tools'],
    matchCount: 5,
    color: '#f59e0b',
  },
  {
    id: 'emp-2',
    type: 'employer',
    name: 'RBC',
    industry: 'Financial Services',
    description: 'Canada\'s largest bank with dedicated accessibility programs and adaptive workstations.',
    roles: ['Software Developer', 'UX Researcher', 'Business Analyst'],
    accommodations: ['Adaptive workstations', 'Sign language interpreter', 'Mental health support'],
    matchCount: 4,
    color: '#f59e0b',
  },
  {
    id: 'emp-3',
    type: 'employer',
    name: 'Microsoft',
    industry: 'Enterprise Software',
    description: 'Pioneer in accessible technology, with industry-leading disability hiring initiatives.',
    roles: ['Accessibility Engineer', 'Cloud Developer', 'Program Manager'],
    accommodations: ['Voice control tools', 'Quiet workspace', 'Custom ergonomic setup'],
    matchCount: 6,
    color: '#f59e0b',
  },
  {
    id: 'emp-4',
    type: 'employer',
    name: 'Telus',
    industry: 'Telecommunications',
    description: 'Canadian telco with strong DEI programs and assistive technology infrastructure.',
    roles: ['Network Engineer', 'Customer Experience Designer', 'AI Developer'],
    accommodations: ['Hybrid work', 'Assistive tech stipend', 'Neurodiversity support'],
    matchCount: 4,
    color: '#f59e0b',
  },
  {
    id: 'emp-5',
    type: 'employer',
    name: 'Deloitte',
    industry: 'Professional Services',
    description: 'Global firm with formalized disability inclusion strategies and mentorship programs.',
    roles: ['Consultant', 'Data Scientist', 'DevOps Engineer'],
    accommodations: ['Flexible deadlines', 'Captioning services', 'Accessible offices'],
    matchCount: 3,
    color: '#f59e0b',
  },
  {
    id: 'emp-6',
    type: 'employer',
    name: 'Ubisoft',
    industry: 'Gaming & Creative',
    description: 'Game studio actively building accessible workflows and creative inclusive environments.',
    roles: ['Game Developer', 'QA Engineer', '3D Artist'],
    accommodations: ['Sensory-friendly spaces', 'Remote work', 'Visual accommodation tools'],
    matchCount: 3,
    color: '#f59e0b',
  },
]

export const CANDIDATES = [
  { id: 'c-01', type: 'candidate', name: 'Priya S.', skills: ['React', 'TypeScript', 'Accessibility'], accessibility: 'Low vision', matchScore: 94, employers: ['emp-1', 'emp-3'], color: '#818cf8' },
  { id: 'c-02', type: 'candidate', name: 'Jordan M.', skills: ['Python', 'ML', 'Data Viz'], accessibility: 'ADHD', matchScore: 89, employers: ['emp-1', 'emp-5'], color: '#818cf8' },
  { id: 'c-03', type: 'candidate', name: 'Chen W.', skills: ['Cloud', 'Azure', 'DevOps'], accessibility: 'Deaf', matchScore: 92, employers: ['emp-3', 'emp-2'], color: '#818cf8' },
  { id: 'c-04', type: 'candidate', name: 'Amara T.', skills: ['UX Design', 'Figma', 'Research'], accessibility: 'Mobility impairment', matchScore: 87, employers: ['emp-2', 'emp-4'], color: '#818cf8' },
  { id: 'c-05', type: 'candidate', name: 'Lucas F.', skills: ['Node.js', 'GraphQL', 'AWS'], accessibility: 'Autism spectrum', matchScore: 96, employers: ['emp-1', 'emp-5'], color: '#818cf8' },
  { id: 'c-06', type: 'candidate', name: 'Yuki N.', skills: ['Game Dev', 'Unity', 'C#'], accessibility: 'Chronic illness', matchScore: 91, employers: ['emp-6'], color: '#818cf8' },
  { id: 'c-07', type: 'candidate', name: 'Fatima A.', skills: ['Data Science', 'SQL', 'Tableau'], accessibility: 'Blind', matchScore: 88, employers: ['emp-2', 'emp-5'], color: '#818cf8' },
  { id: 'c-08', type: 'candidate', name: 'Marcus B.', skills: ['Network Eng.', '5G', 'Security'], accessibility: 'Hearing impaired', matchScore: 85, employers: ['emp-4'], color: '#818cf8' },
  { id: 'c-09', type: 'candidate', name: 'Sofia L.', skills: ['3D Art', 'Blender', 'Unreal'], accessibility: 'Dyslexia', matchScore: 90, employers: ['emp-6'], color: '#818cf8' },
  { id: 'c-10', type: 'candidate', name: 'Omar K.', skills: ['Backend', 'Go', 'Kubernetes'], accessibility: 'PTSD', matchScore: 83, employers: ['emp-3', 'emp-4'], color: '#818cf8' },
  { id: 'c-11', type: 'candidate', name: 'Nia R.', skills: ['Product', 'Agile', 'Analytics'], accessibility: 'ADHD', matchScore: 86, employers: ['emp-1', 'emp-2'], color: '#818cf8' },
  { id: 'c-12', type: 'candidate', name: 'Ethan J.', skills: ['iOS', 'Swift', 'VoiceOver'], accessibility: 'Low vision', matchScore: 93, employers: ['emp-3'], color: '#818cf8' },
  { id: 'c-13', type: 'candidate', name: 'Lena M.', skills: ['QA Testing', 'Selenium', 'Jira'], accessibility: 'Cerebral palsy', matchScore: 88, employers: ['emp-6', 'emp-5'], color: '#818cf8' },
  { id: 'c-14', type: 'candidate', name: 'Raj P.', skills: ['AI/ML', 'TensorFlow', 'Python'], accessibility: 'Autism spectrum', matchScore: 95, employers: ['emp-3', 'emp-4'], color: '#818cf8' },
  { id: 'c-15', type: 'candidate', name: 'Zoe H.', skills: ['React Native', 'Expo', 'Firebase'], accessibility: 'Anxiety disorder', matchScore: 82, employers: ['emp-1'], color: '#818cf8' },
  { id: 'c-16', type: 'candidate', name: 'Kwame A.', skills: ['Consulting', 'Strategy', 'Excel'], accessibility: 'Mobility impairment', matchScore: 87, employers: ['emp-5', 'emp-2'], color: '#818cf8' },
  { id: 'c-17', type: 'candidate', name: 'Iris C.', skills: ['Cybersecurity', 'Pen Testing', 'SIEM'], accessibility: 'Deaf', matchScore: 91, employers: ['emp-2', 'emp-3'], color: '#818cf8' },
  { id: 'c-18', type: 'candidate', name: 'Ben T.', skills: ['Embedded C', 'IoT', 'RTOS'], accessibility: 'ADHD', matchScore: 84, employers: ['emp-4'], color: '#818cf8' },
  { id: 'c-19', type: 'candidate', name: 'Aisha N.', skills: ['Accessibility', 'WCAG', 'React'], accessibility: 'Blind', matchScore: 97, employers: ['emp-3', 'emp-1'], color: '#818cf8' },
  { id: 'c-20', type: 'candidate', name: 'Dev S.', skills: ['Java', 'Spring', 'Microservices'], accessibility: 'Chronic pain', matchScore: 86, employers: ['emp-2', 'emp-5'], color: '#818cf8' },
  { id: 'c-21', type: 'candidate', name: 'Maya V.', skills: ['UI Animation', 'GSAP', 'Three.js'], accessibility: 'Dyslexia', matchScore: 92, employers: ['emp-6', 'emp-1'], color: '#818cf8' },
  { id: 'c-22', type: 'candidate', name: 'Tae K.', skills: ['Blockchain', 'Solidity', 'Web3'], accessibility: 'Autism spectrum', matchScore: 88, employers: ['emp-5'], color: '#818cf8' },
  { id: 'c-23', type: 'candidate', name: 'Nadia F.', skills: ['Content Strategy', 'SEO', 'CMS'], accessibility: 'MS', matchScore: 80, employers: ['emp-4', 'emp-1'], color: '#818cf8' },
  { id: 'c-24', type: 'candidate', name: 'Alex R.', skills: ['Systems Design', 'Rust', 'WASM'], accessibility: 'PTSD', matchScore: 89, employers: ['emp-3', 'emp-6'], color: '#818cf8' },
  { id: 'c-25', type: 'candidate', name: 'Chloe P.', skills: ['Business Intel.', 'Power BI', 'SQL'], accessibility: 'Chronic illness', matchScore: 85, employers: ['emp-2', 'emp-5'], color: '#818cf8' },
]

// Build match map: employer -> [candidates]
export function buildMatchMap() {
  const map = {}
  EMPLOYERS.forEach(e => { map[e.id] = [] })
  CANDIDATES.forEach(c => {
    c.employers.forEach(empId => {
      if (map[empId]) map[empId].push(c.id)
    })
  })
  return map
}

export const ALL_NODES = [...EMPLOYERS, ...CANDIDATES]

export function getNodeById(id) {
  return ALL_NODES.find(n => n.id === id)
}

export function getMatchesForNode(id) {
  const node = getNodeById(id)
  if (!node) return []
  if (node.type === 'candidate') {
    return node.employers.map(empId => getNodeById(empId)).filter(Boolean)
  }
  return CANDIDATES.filter(c => c.employers.includes(id))
}
