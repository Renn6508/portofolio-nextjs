export const PROJECTS = [
  {
    num: '01',
    title: 'Management Stok Barang',
    tags: ['HTML', 'Javascript', 'CSS'],
    year: 'Nov 30, 2025',
    role: 'Front End Developer',
    image: '/assets/projects/barangku.png',
    description:
      'Platform e-commerce lengkap dengan fitur cart, payment gateway Midtrans, manajemen produk, dan dashboard admin real-time. Dibangun dengan arsitektur microservice untuk skalabilitas tinggi.',
    details: [
      { label: 'Client',   value: 'Projek Ujian Akhir Semester Sekolah' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Front End Developer' },
      { label: 'Duration', value: '3 Months' },
    ],
    features: [
      'Autentikasi JWT dengan refresh token',
      'Payment gateway Midtrans & Xendit',
      'Real-time stock management',
      'Admin dashboard dengan analytics',
      'Optimasi SEO & Core Web Vitals',
    ],
    link: 'https://projek-barangku.netlify.app/',
    github: 'https://github.com/Renn6508/BarangKu',
  },
  {
    num: '02',
    title: 'Profile Web Company Seblak ',
    tags: ['HTML', 'Tailwind CSS', 'Next JS', 'Node JS',],
    year: 'Jan 22, 2025',
    role: 'Frontend Dev',
    image: '/assets/projects/seblak_sultan.png',
    description:
      'Dashboard visualisasi data interaktif untuk perusahaan logistik. Menampilkan data pengiriman real-time, heatmap rute, dan prediksi ML untuk optimasi armada.',
    details: [
      { label: 'Client',   value: 'Sizie April Profita' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Frontend Developer' },
      { label: 'Duration', value: '2 Months' },
    ],
    features: [
      'Chart interaktif dengan D3.js & Recharts',
      'Real-time data via WebSocket',
      'Export PDF & Excel report',
      'Filter & drill-down multi-level',
      'Dark / Light mode toggle',
    ],
    link: 'https://praktikum-sizie.vercel.app/',
    github: 'https://github.com/Renn6508/praktikum-sizie',
  },
  {
    num: '03',
    title: 'Profile Company Web Krunchi Melt',
    tags: ['React Native', 'Firebase'],
    year: 'Aug 29, 2025',
    role: 'Frontend Developer',
    image: '/assets/projects/krunchimelt.png',
    description:
      'Aplikasi mobile banking lengkap dengan fitur transfer, tagihan, dan investasi. Menggunakan biometric authentication dan enkripsi end-to-end untuk keamanan maksimal.',
    details: [
      { label: 'Client',   value: 'Krunchi Melt' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Frontend Developer' },
      { label: 'Duration', value: '4 Months' },
    ],
    features: [
      'Biometric (fingerprint & FaceID)',
      'Transfer antar bank real-time',
      'Notifikasi push transaksi',
      'QR Code payment scanner',
      'Investasi reksa dana & saham',
    ],
    link: 'https://renn6508.github.io/html_catalog/',
    github: 'https://github.com/Renn6508/html_catalog',
  },
  {
    num: '04',
    title: 'Layout Profile Company H2OPURE Asia Bali',
    tags: ['Figma', 'UI UX Design',],
    year: 'Jan 12, 2024',
    role: 'Creative Graphic Designer',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    description:
      'Landing page SaaS dengan animasi 3D WebGL, scroll-driven storytelling, dan micro-interactions memukau. Lighthouse score 98+ dengan loading time < 1.5 detik.',
    details: [
      { label: 'Client',   value: 'H2OPURE Asia' },
      { label: 'Year',     value: '2024' },
      { label: 'Role',     value: 'Creative Graphic Designer' },
      { label: 'Duration', value: '4 months' },
    ],
    features: [
      'WebGL background dengan Three.js',
      'ScrollTrigger pinning & scrubbing',
      'Particle system interaktif',
      'Lottie animation integration',
      'A/B testing dengan Vercel Edge',
    ],
    link: 'https://www.figma.com/design/XFhqjrIOSDc46SRi68lLXt/H2OPURE-Layout-Company-Profile?node-id=0-1&t=o2ra5xEHrDERNGHj-1',
    github: null,
  },
  {
    num: '05',
    title: 'Business Portfolio',
    tags: ['Next JS', 'Tailwind CSS', 'HTML', 'TypeScript', 'React'],
    year: '2025',
    role: 'Fullstack Dev',
    image: '/assets/projects/rendyatmawijaya.png',
    description:
      'Backend scalable untuk platform sosial media dengan 50K+ pengguna aktif. GraphQL subscriptions, Redis caching, dan deployment AWS ECS untuk performa maksimal.',
    details: [
      { label: 'Client',   value: 'Rendy Atmawijaya' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Fullstack Developer' },
      { label: 'Duration', value: '6 Months' },
    ],
    features: [
      'GraphQL subscriptions real-time',
      'Redis caching layer',
      'AWS S3 + CloudFront CDN',
      'Rate limiting & DDoS protection',
      '99.9% uptime SLA',
    ],
    link: 'https://rendy-atmawijaya.vercel.app/',
    github: 'https://github.com/Renn6508/rendy-atmawijaya-profile',
  },
]

export const SKILLS = [
  { icon: '⚡', name: 'Frontend',  desc: 'React, Next.js, TypeScript, Tailwind CSS, GSAP — antarmuka cepat & memukau.', level: '01' },
  { icon: '🔧', name: 'Backend',   desc: 'Node.js, Express, GraphQL, REST API, auth & keamanan sistem produksi.', level: '02' },
  { icon: '🗄️', name: 'Database', desc: 'MongoDB, PostgreSQL, Redis — desain skema & optimasi query.', level: '03' },
  { icon: '🎨', name: 'UI / UX',   desc: 'Figma, prototipe interaktif, design system, user research.', level: '04' },
  { icon: '☁️', name: 'DevOps',    desc: 'Docker, CI/CD, AWS, Vercel deployment & monitoring infrastruktur.', level: '05' },
  { icon: '📱', name: 'Mobile',    desc: 'React Native, Expo — aplikasi cross-platform iOS & Android.', level: '06' },
]

export const PROGRAMMING_LANGUAGES = [
  { name: 'HTML', percentage: 95 },
  { name: 'CSS', percentage: 90 },
  { name: 'JavaScript', percentage: 92 },
  { name: 'Python', percentage: 75 },
  { name: 'PHP', percentage: 70 },
  { name: 'Next.js', percentage: 88 },
  { name: 'Lua', percentage: 60 },
  { name: 'Dart', percentage: 80 },
  { name: 'Rust', percentage: 55 },
  { name: 'R', percentage: 65 },
  { name: 'Java', percentage: 78 },
  { name: 'REST API', percentage: 90 },
]

export const FRAMEWORKS_TOOLS = [
  { name: 'Git', percentage: 95 },
  { name: 'Github', percentage: 95 },
  { name: 'VSCode', percentage: 98 },
  { name: 'Composer', percentage: 80 },
  { name: 'Figma', percentage: 85 },
  { name: 'Canva', percentage: 80 },
  { name: 'Inkscape', percentage: 75 },
  { name: 'Node.js', percentage: 90 },
  { name: 'React', percentage: 92 },
  { name: 'Flutter', percentage: 82 },
  { name: 'MySql', percentage: 88 },
  { name: 'PostgreSQL', percentage: 85 },
]

export const CERTIFICATES = [
  {
    id: 1,
    title: 'Program Entrepreneur Vokasi Kreatif dan Terpadu (PERVEKT)',
    issuer: 'Dinas Pendidikan Provinsi Jawa Timur dengan Institut Teknologi Sepuluh Nopember',
    date: '2025',
    image: '/assets/certificate/pervekt.png',
    description: 'Pelatihan Keterampilan Kewirausahaan SMK.',
    pdfUrl: '/assets/Sertifikat_PERVEKT.pdf',
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=70',
    description: 'Full stack development course including frontend, backend, and database design.',
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Mastery',
    issuer: 'LinkedIn Learning',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=70',
    description: 'Advanced JavaScript concepts and modern ES6+ features.',
    pdfUrl: '#',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Interaction Design Foundation',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=70',
    description: 'UI/UX design principles, user research, and design thinking.',
    pdfUrl: '#',
  },
  {
    id: 5,
    title: 'Node.js Backend Development',
    issuer: 'Udemy',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e0?w=600&q=70',
    description: 'Build scalable backend applications with Node.js and Express.',
    pdfUrl: '#',
  },
  {
    id: 6,
    title: 'Flutter Mobile Development',
    issuer: 'Udacity',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&q=70',
    description: 'Cross-platform mobile development using Flutter framework.',
    pdfUrl: '#',
  },
]

export const GITHUB_USERNAME = 'Renn6508'
export const WAKATIME_USERNAME = 'Renn6508'

export const GALLERY_IMGS = [
  { src: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?w=600&q=70', label: 'Mountain Summit' },
  { src: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=600&q=70', label: 'Wild Forest' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=70', label: 'Open Horizon' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70', label: 'Snow Peak' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=70', label: 'Valley Depths' },
]

export const COLLABORATORS = [
  {
    name: 'Amirah Syauqillah Harsono',
    role: 'Network Engineer & SysAdmin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
    url: 'https://amirah-portfolio.vercel.app/',
  },
  {
    name: 'Collaborator 2',
    role: 'Fullstack Developer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
    url: 'https://leosatriaa.vercel.app/',
  },
  {
    name: 'Collaborator 3',
    role: 'Mobile Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    url: 'https://example.com/collaborator3',
  },
]
