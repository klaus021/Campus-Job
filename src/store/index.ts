import { create } from 'zustand';

export type Department = 'CSE' | 'EEE' | 'Civil' | 'Mechanical' | 'Cyber Security' | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  department: Department;
  bio: string;
  skills: string[];
  university: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  balance: number;
  completedJobs: number;
}

export interface Gig {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  department: Department;
  price: number;
  deliveryDays: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  orders: number;
  image: string;
  createdAt: string;
}

export interface Job {
  id: string;
  clientId: string;
  title: string;
  description: string;
  department: Department;
  budget: number;
  deadline: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  applicants: string[];
  assignedTo?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  proposedBudget: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Order {
  id: string;
  gigId?: string;
  jobId?: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: 'active' | 'delivered' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryDate: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'message' | 'review' | 'application' | 'payment';
  title: string;
  content: string;
  read: boolean;
  timestamp: string;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  revieweeId: string;
  gigId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  fromId: string;
  toId: string;
  amount: number;
  type: 'payment' | 'withdrawal' | 'refund';
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export type Page = 'home' | 'gigs' | 'jobs' | 'gig-detail' | 'job-detail' | 'create-gig' | 'create-job' | 'profile' | 'messages' | 'orders' | 'notifications' | 'login' | 'register' | 'dashboard' | 'edit-profile' | 'payments';

const sampleUsers: User[] = [
  {
    id: 'u1', name: 'Rahim Ahmed', email: 'rahim@ugv.edu', password: '123456',
    avatar: '', department: 'CSE', bio: 'Full-stack developer specializing in React & Node.js. 3rd year CSE student passionate about building web applications.',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'TypeScript'], university: 'University of Global Village',
    rating: 4.8, reviewCount: 24, joinedDate: '2024-01-15', balance: 15000, completedJobs: 24
  },
  {
    id: 'u2', name: 'Fatima Khan', email: 'fatima@ugv.edu', password: '123456',
    avatar: '', department: 'EEE', bio: 'EEE student with expertise in circuit design, PCB layout, and embedded systems programming.',
    skills: ['Circuit Design', 'MATLAB', 'Arduino', 'PCB Design', 'Embedded C'], university: 'University of Global Village',
    rating: 4.9, reviewCount: 18, joinedDate: '2024-02-20', balance: 22000, completedJobs: 18
  },
  {
    id: 'u3', name: 'Arif Hassan', email: 'arif@ugv.edu', password: '123456',
    avatar: '', department: 'Civil', bio: 'Civil engineering student proficient in AutoCAD, structural analysis, and project estimation.',
    skills: ['AutoCAD', 'ETABS', 'Revit', 'Structural Analysis', 'Estimation'], university: 'University of Global Village',
    rating: 4.7, reviewCount: 12, joinedDate: '2024-03-10', balance: 8500, completedJobs: 12
  },
  {
    id: 'u4', name: 'Nusrat Jahan', email: 'nusrat@ugv.edu', password: '123456',
    avatar: '', department: 'CSE', bio: 'UI/UX designer and frontend developer. I create beautiful, user-friendly interfaces.',
    skills: ['Figma', 'UI/UX', 'React', 'Tailwind CSS', 'Adobe XD'], university: 'University of Global Village',
    rating: 4.9, reviewCount: 31, joinedDate: '2023-11-05', balance: 28000, completedJobs: 31
  },
  {
    id: 'u5', name: 'Kamal Uddin', email: 'kamal@ugv.edu', password: '123456',
    avatar: '', department: 'Mechanical', bio: 'Mechanical engineering student skilled in SolidWorks, 3D modeling, and thermodynamics.',
    skills: ['SolidWorks', '3D Modeling', 'ANSYS', 'AutoCAD', 'MATLAB'], university: 'University of Global Village',
    rating: 4.6, reviewCount: 9, joinedDate: '2024-04-01', balance: 5200, completedJobs: 9
  },
  {
    id: 'u6', name: 'Sara Begum', email: 'sara@ugv.edu', password: '123456',
    avatar: '', department: 'Cyber Security', bio: 'Cybersecurity enthusiast with expertise in network security, penetration testing, and ethical hacking.',
    skills: ['Penetration Testing', 'Network Security', 'Python', 'Kali Linux', 'OSINT'], university: 'University of Global Village',
    rating: 4.8, reviewCount: 15, joinedDate: '2024-01-30', balance: 12000, completedJobs: 15
  },
];

const gigImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
];

const sampleGigs: Gig[] = [
  { id: 'g1', sellerId: 'u1', title: 'I will build a full-stack web application using React & Node.js', description: 'I will develop a complete web application with React frontend and Node.js backend. Includes responsive design, database integration, authentication, and deployment. Perfect for course projects, personal websites, or startup MVPs.\n\nWhat you get:\n- Clean, modern UI with React\n- RESTful API with Node.js/Express\n- MongoDB database setup\n- User authentication\n- Deployment assistance\n- 3 rounds of revisions', department: 'CSE', price: 5000, deliveryDays: 7, tags: ['React', 'Node.js', 'Web Development', 'Full Stack'], rating: 4.8, reviewCount: 24, orders: 30, image: gigImages[0], createdAt: '2024-06-01' },
  { id: 'g2', sellerId: 'u2', title: 'I will design and simulate electronic circuits using MATLAB', description: 'Professional circuit design and simulation services. I can help with analog/digital circuits, control systems, and signal processing assignments.\n\nServices include:\n- Circuit schematic design\n- MATLAB/Simulink simulation\n- Detailed analysis report\n- Component selection guidance\n- Lab report preparation', department: 'EEE', price: 3000, deliveryDays: 5, tags: ['MATLAB', 'Circuit Design', 'Simulation', 'Electronics'], rating: 4.9, reviewCount: 18, orders: 22, image: gigImages[2], createdAt: '2024-06-05' },
  { id: 'g3', sellerId: 'u3', title: 'I will create detailed AutoCAD drawings and structural designs', description: 'Professional AutoCAD drafting and structural design services for civil engineering projects. Floor plans, elevations, sections, and structural details.\n\nIncludes:\n- 2D AutoCAD drawings\n- Structural layout\n- Bill of quantities\n- Design calculations\n- Multiple revisions', department: 'Civil', price: 4000, deliveryDays: 6, tags: ['AutoCAD', 'Structural Design', 'Drafting', 'Civil Engineering'], rating: 4.7, reviewCount: 12, orders: 15, image: gigImages[3], createdAt: '2024-06-10' },
  { id: 'g4', sellerId: 'u4', title: 'I will design stunning UI/UX for your web and mobile apps', description: 'I create beautiful, intuitive user interfaces that users love. From wireframes to high-fidelity prototypes, I handle the complete design process.\n\nDeliverables:\n- User research & analysis\n- Wireframes\n- High-fidelity mockups in Figma\n- Interactive prototype\n- Design system/style guide\n- Developer handoff ready files', department: 'CSE', price: 3500, deliveryDays: 5, tags: ['UI/UX', 'Figma', 'Web Design', 'Mobile Design'], rating: 4.9, reviewCount: 31, orders: 38, image: gigImages[1], createdAt: '2024-05-20' },
  { id: 'g5', sellerId: 'u5', title: 'I will create 3D models and engineering drawings in SolidWorks', description: 'Professional 3D modeling and engineering drawings using SolidWorks. Perfect for course projects, prototypes, and manufacturing drawings.\n\nServices:\n- 3D part modeling\n- Assembly design\n- Engineering drawings with GD&T\n- FEA analysis (basic)\n- Rendering and animation', department: 'Mechanical', price: 4500, deliveryDays: 7, tags: ['SolidWorks', '3D Modeling', 'Engineering Drawing', 'CAD'], rating: 4.6, reviewCount: 9, orders: 11, image: gigImages[4], createdAt: '2024-06-15' },
  { id: 'g6', sellerId: 'u6', title: 'I will perform security audits and penetration testing', description: 'Comprehensive security assessment for your web applications and networks. Identify vulnerabilities before they are exploited.\n\nIncludes:\n- Vulnerability assessment\n- Web application security testing\n- Network security audit\n- Detailed report with remediation steps\n- Follow-up consultation', department: 'Cyber Security', price: 6000, deliveryDays: 10, tags: ['Penetration Testing', 'Security Audit', 'Ethical Hacking', 'Network Security'], rating: 4.8, reviewCount: 15, orders: 18, image: gigImages[5], createdAt: '2024-06-08' },
  { id: 'g7', sellerId: 'u1', title: 'I will build a responsive portfolio website', description: 'Get a professional portfolio website to showcase your work. Built with modern technologies and optimized for all devices.\n\nFeatures:\n- Responsive design\n- Portfolio gallery\n- Contact form\n- SEO optimized\n- Fast loading\n- Free hosting setup', department: 'CSE', price: 2500, deliveryDays: 4, tags: ['Portfolio', 'Website', 'Responsive', 'HTML/CSS'], rating: 4.7, reviewCount: 16, orders: 20, image: gigImages[1], createdAt: '2024-07-01' },
  { id: 'g8', sellerId: 'u4', title: 'I will create professional presentations and infographics', description: 'Eye-catching presentations and infographics for your academic projects, thesis defense, or any purpose.\n\nIncludes:\n- Custom designed slides\n- Data visualization\n- Infographic design\n- Icon and illustration\n- Print-ready files', department: 'Other', price: 1500, deliveryDays: 3, tags: ['Presentation', 'Infographic', 'Design', 'PowerPoint'], rating: 4.8, reviewCount: 22, orders: 28, image: gigImages[0], createdAt: '2024-07-05' },
  { id: 'g9', sellerId: 'u2', title: 'I will program Arduino and ESP32 projects', description: 'Custom Arduino and ESP32 programming for IoT projects, robotics, and embedded systems.\n\nServices:\n- Sensor integration\n- Motor control\n- IoT connectivity (WiFi/Bluetooth)\n- PCB design for custom boards\n- Complete documentation', department: 'EEE', price: 3500, deliveryDays: 6, tags: ['Arduino', 'ESP32', 'IoT', 'Embedded Systems'], rating: 4.9, reviewCount: 14, orders: 17, image: gigImages[2], createdAt: '2024-07-10' },
  { id: 'g10', sellerId: 'u6', title: 'I will write Python scripts for automation and data analysis', description: 'Custom Python scripts for automating repetitive tasks, web scraping, data analysis, and more.\n\nCapabilities:\n- Web scraping (BeautifulSoup, Selenium)\n- Data analysis (Pandas, NumPy)\n- Task automation\n- API integration\n- File processing', department: 'CSE', price: 2000, deliveryDays: 4, tags: ['Python', 'Automation', 'Data Analysis', 'Scripting'], rating: 4.7, reviewCount: 11, orders: 14, image: gigImages[5], createdAt: '2024-07-12' },
];

const sampleJobs: Job[] = [
  { id: 'j1', clientId: 'u4', title: 'Need a Backend Developer for E-commerce Project', description: 'Looking for an experienced backend developer to build REST APIs for an e-commerce platform. The project is part of our final year project and needs proper authentication, payment integration, and inventory management.\n\nRequirements:\n- Node.js/Express or Django experience\n- Database design skills\n- API documentation\n- Git version control', department: 'CSE', budget: 8000, deadline: '2025-02-15', skills: ['Node.js', 'MongoDB', 'REST API', 'Express'], status: 'open', applicants: [], createdAt: '2024-12-01' },
  { id: 'j2', clientId: 'u3', title: 'MATLAB Simulation for Control Systems Assignment', description: 'Need help with MATLAB simulation for a control systems assignment. The task involves designing PID controllers and analyzing system stability.\n\nTopics:\n- Transfer function modeling\n- PID controller design\n- Bode plot analysis\n- Step response analysis\n- MATLAB code with comments', department: 'EEE', budget: 2500, deadline: '2025-01-20', skills: ['MATLAB', 'Control Systems', 'Simulink'], status: 'open', applicants: ['u2'], createdAt: '2024-12-05' },
  { id: 'j3', clientId: 'u1', title: 'AutoCAD Floor Plan for Architecture Course', description: 'Need a detailed floor plan drawn in AutoCAD for my architecture elective course. The building is a 3-story residential complex.\n\nDeliverables:\n- Ground, first, and second floor plans\n- Elevation views (front and side)\n- Section drawing\n- Dimension annotations', department: 'Civil', budget: 3500, deadline: '2025-01-25', skills: ['AutoCAD', 'Floor Planning', 'Architecture'], status: 'open', applicants: ['u3'], createdAt: '2024-12-08' },
  { id: 'j4', clientId: 'u5', title: 'Website Security Assessment for Course Project', description: 'Looking for someone to perform a security audit on a web application we built for our course project. Need a detailed vulnerability report.\n\nScope:\n- OWASP Top 10 assessment\n- SQL injection testing\n- XSS testing\n- Authentication bypass testing\n- Written report with findings', department: 'Cyber Security', budget: 5000, deadline: '2025-02-01', skills: ['Penetration Testing', 'OWASP', 'Security Testing'], status: 'open', applicants: [], createdAt: '2024-12-10' },
  { id: 'j5', clientId: 'u2', title: 'SolidWorks Model for Robot Arm Design', description: 'Need a complete SolidWorks model of a 4-DOF robot arm for our robotics course. Including assembly and motion simulation.\n\nRequirements:\n- Individual part files\n- Complete assembly\n- Motion study/animation\n- Engineering drawings\n- BOM (Bill of Materials)', department: 'Mechanical', budget: 6000, deadline: '2025-02-10', skills: ['SolidWorks', '3D Modeling', 'Assembly Design'], status: 'open', applicants: ['u5'], createdAt: '2024-12-12' },
  { id: 'j6', clientId: 'u6', title: 'Mobile App UI Design for Campus Navigation', description: 'Need UI/UX design for a campus navigation mobile app. Should include map integration, building directory, and event notifications.\n\nScreens needed:\n- Splash & onboarding\n- Home/Map view\n- Building details\n- Event listing\n- Profile & settings\n- Search functionality', department: 'CSE', budget: 4000, deadline: '2025-01-30', skills: ['Figma', 'UI/UX', 'Mobile Design'], status: 'open', applicants: ['u4'], createdAt: '2024-12-15' },
];

const sampleApplications: Application[] = [
  { id: 'a1', jobId: 'j2', freelancerId: 'u2', coverLetter: 'I have extensive experience with MATLAB and control systems. I can deliver high-quality simulation with detailed analysis.', proposedBudget: 2500, status: 'pending', createdAt: '2024-12-06' },
  { id: 'a2', jobId: 'j3', freelancerId: 'u3', coverLetter: 'As a civil engineering student, I have completed many AutoCAD projects. I can deliver professional floor plans with all required views.', proposedBudget: 3200, status: 'pending', createdAt: '2024-12-09' },
  { id: 'a3', jobId: 'j5', freelancerId: 'u5', coverLetter: 'SolidWorks is my specialty. I have designed multiple robot assemblies and can include motion simulation.', proposedBudget: 5500, status: 'pending', createdAt: '2024-12-13' },
  { id: 'a4', jobId: 'j6', freelancerId: 'u4', coverLetter: 'UI/UX design is my passion. I have designed several mobile apps and can create a beautiful, user-friendly navigation app.', proposedBudget: 3800, status: 'pending', createdAt: '2024-12-16' },
];

const sampleOrders: Order[] = [
  { id: 'o1', gigId: 'g1', buyerId: 'u4', sellerId: 'u1', amount: 5000, status: 'completed', createdAt: '2024-11-01', deliveryDate: '2024-11-08' },
  { id: 'o2', gigId: 'g4', buyerId: 'u1', sellerId: 'u4', amount: 3500, status: 'completed', createdAt: '2024-11-05', deliveryDate: '2024-11-10' },
  { id: 'o3', gigId: 'g2', buyerId: 'u3', sellerId: 'u2', amount: 3000, status: 'active', createdAt: '2024-12-10', deliveryDate: '2024-12-15' },
  { id: 'o4', gigId: 'g6', buyerId: 'u5', sellerId: 'u6', amount: 6000, status: 'delivered', createdAt: '2024-12-08', deliveryDate: '2024-12-18' },
];

const sampleMessages: Message[] = [
  { id: 'm1', senderId: 'u4', receiverId: 'u1', content: 'Hi Rahim! I saw your web development gig. Can you also include a blog section?', timestamp: '2024-12-15T10:30:00', read: true },
  { id: 'm2', senderId: 'u1', receiverId: 'u4', content: 'Hi Nusrat! Yes, I can add a blog section with a CMS. It would be within the same price.', timestamp: '2024-12-15T10:45:00', read: true },
  { id: 'm3', senderId: 'u4', receiverId: 'u1', content: 'That sounds great! I will place the order then. Thanks!', timestamp: '2024-12-15T11:00:00', read: false },
  { id: 'm4', senderId: 'u3', receiverId: 'u2', content: 'Hi Fatima, how is the circuit simulation going?', timestamp: '2024-12-16T09:00:00', read: true },
  { id: 'm5', senderId: 'u2', receiverId: 'u3', content: 'Almost done! I will share the results by tomorrow.', timestamp: '2024-12-16T09:15:00', read: false },
];

const sampleNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'order', title: 'New Order Received', content: 'Nusrat Jahan ordered your "Full-stack web application" gig.', read: false, timestamp: '2024-12-15T11:05:00' },
  { id: 'n2', userId: 'u1', type: 'message', title: 'New Message', content: 'You have a new message from Nusrat Jahan.', read: false, timestamp: '2024-12-15T11:00:00' },
  { id: 'n3', userId: 'u2', type: 'application', title: 'Application Update', content: 'Your application for "MATLAB Simulation" has been viewed.', read: true, timestamp: '2024-12-07T14:00:00' },
  { id: 'n4', userId: 'u4', type: 'review', title: 'New Review', content: 'Rahim Ahmed left a 5-star review on your gig.', read: true, timestamp: '2024-11-12T16:30:00' },
];

const sampleReviews: Review[] = [
  { id: 'r1', orderId: 'o1', reviewerId: 'u4', revieweeId: 'u1', gigId: 'g1', rating: 5, comment: 'Excellent work! Rahim delivered a perfectly working web app. Very professional and responsive.', createdAt: '2024-11-10' },
  { id: 'r2', orderId: 'o2', reviewerId: 'u1', revieweeId: 'u4', gigId: 'g4', rating: 5, comment: 'Nusrat is incredibly talented. The UI design exceeded my expectations. Highly recommended!', createdAt: '2024-11-12' },
  { id: 'r3', orderId: 'o1', reviewerId: 'u1', revieweeId: 'u4', gigId: 'g4', rating: 4, comment: 'Great designs. Communication could be a bit faster, but overall very satisfied.', createdAt: '2024-11-15' },
];

const sampleTransactions: Transaction[] = [
  { id: 't1', fromId: 'u4', toId: 'u1', amount: 5000, type: 'payment', description: 'Payment for Full-stack web application gig', status: 'completed', createdAt: '2024-11-08' },
  { id: 't2', fromId: 'u1', toId: 'u4', amount: 3500, type: 'payment', description: 'Payment for UI/UX design gig', status: 'completed', createdAt: '2024-11-10' },
  { id: 't3', fromId: 'u3', toId: 'u2', amount: 3000, type: 'payment', description: 'Payment for Circuit simulation gig', status: 'pending', createdAt: '2024-12-10' },
  { id: 't4', fromId: 'u5', toId: 'u6', amount: 6000, type: 'payment', description: 'Payment for Security audit gig', status: 'pending', createdAt: '2024-12-08' },
];

interface AppState {
  // Data
  users: User[];
  gigs: Gig[];
  jobs: Job[];
  applications: Application[];
  orders: Order[];
  messages: Message[];
  notifications: Notification[];
  reviews: Review[];
  transactions: Transaction[];

  // Auth
  currentUser: User | null;
  
  // Navigation
  currentPage: Page;
  selectedGigId: string | null;
  selectedJobId: string | null;
  selectedChatUserId: string | null;

  // Search & Filter
  searchQuery: string;
  departmentFilter: Department | 'All';
  sortBy: string;

  // Actions
  setPage: (page: Page) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: Omit<User, 'id' | 'rating' | 'reviewCount' | 'joinedDate' | 'balance' | 'completedJobs' | 'avatar'>) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  
  setSelectedGig: (id: string | null) => void;
  setSelectedJob: (id: string | null) => void;
  setSelectedChatUser: (id: string | null) => void;
  
  setSearchQuery: (query: string) => void;
  setDepartmentFilter: (dept: Department | 'All') => void;
  setSortBy: (sort: string) => void;

  createGig: (gig: Omit<Gig, 'id' | 'rating' | 'reviewCount' | 'orders' | 'createdAt'>) => Promise<void>;
  createJob: (job: Omit<Job, 'id' | 'status' | 'applicants' | 'createdAt'>) => Promise<void>;
  applyToJob: (jobId: string, coverLetter: string, proposedBudget: number) => void;
  acceptApplication: (applicationId: string) => void;
  
  placeOrder: (gigId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  addReview: (orderId: string, revieweeId: string, gigId: string | undefined, rating: number, comment: string) => Promise<void>;

  getUserById: (id: string) => User | undefined;
  getGigById: (id: string) => Gig | undefined;
  getJobById: (id: string) => Job | undefined;
}

export const useStore = create<AppState>((set, get) => ({
  users: sampleUsers,
  gigs: sampleGigs,
  jobs: sampleJobs,
  applications: sampleApplications,
  orders: sampleOrders,
  messages: sampleMessages,
  notifications: sampleNotifications,
  reviews: sampleReviews,
  transactions: sampleTransactions,
  
  currentUser: null,
  currentPage: 'home',
  selectedGigId: null,
  selectedJobId: null,
  selectedChatUserId: null,
  searchQuery: '',
  departmentFilter: 'All',
  sortBy: 'newest',

  setPage: (page) => set({ currentPage: page }),
  
  login: async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const user = await response.json();
        // Store password locally for frontend-only comparisons
        const userWithPassword = { ...user, password } as User;
        set({ currentUser: userWithPassword, currentPage: 'home' });
        return true;
      } else {
        const errorData = await response.json();
        console.error('API login failed:', errorData.error);
      }
    } catch (error) {
      console.error('API login error:', error);
    }
    
    // Fallback to demo accounts (pre-loaded users with known passwords)
    // This allows testing without backend connectivity
    const user = get().users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user, currentPage: 'home' });
      return true;
    }
    return false;
  },
  
  register: async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          department: userData.department,
          bio: userData.bio,
          skills: userData.skills,
          university: userData.university,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const user = await response.json();
      // Add password to user object for local state (frontend only)
      const userWithPassword = { ...user, password: userData.password } as User;
      set(state => ({
        users: [...state.users, userWithPassword],
        currentUser: userWithPassword,
        currentPage: 'home'
      }));
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  },

  logout: () => set({ currentUser: null, currentPage: 'home' }),

  updateProfile: async (updates) => {
    const state = get();
    if (!state.currentUser) return;
    
    try {
      const response = await fetch(`/api/users/${state.currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        set(st => ({
          currentUser: updatedUser as User,
          users: st.users.map(u => u.id === updatedUser.id ? updatedUser : u),
        }));
        return;
      }
    } catch (error) {
      console.error('API update profile error:', error);
    }
    
    // Fallback to local update
    set(state => {
      if (!state.currentUser) return state;
      const updatedUser = { ...state.currentUser, ...updates };
      return {
        currentUser: updatedUser,
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u),
      };
    });
  },

  setSelectedGig: (id) => set({ selectedGigId: id, currentPage: id ? 'gig-detail' : 'gigs' }),
  setSelectedJob: (id) => set({ selectedJobId: id, currentPage: id ? 'job-detail' : 'jobs' }),
  setSelectedChatUser: (id) => set({ selectedChatUserId: id }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setDepartmentFilter: (dept) => set({ departmentFilter: dept }),
  setSortBy: (sort) => set({ sortBy: sort }),

  createGig: async (gigData) => {
    try {
      console.log('🚀 Creating gig:', gigData);
      const response = await fetch('/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData),
      });
      
      console.log('📡 API Response Status:', response.status);
      if (response.ok) {
        const newGig = await response.json();
        console.log('✅ Gig created successfully:', newGig);
        set(state => ({ gigs: [newGig as Gig, ...state.gigs], currentPage: 'gigs' as Page }));
        return;
      } else {
        const errorText = await response.text();
        console.error('❌ API returned error:', response.status, errorText);
      }
    } catch (error) {
      console.error('❌ API create gig error:', error);
    }
    
    // Fallback to local creation
    console.log('⚠️ Falling back to local gig creation (not saved to backend)');
    const newGig: Gig = {
      ...gigData,
      id: 'g' + Date.now(),
      rating: 0,
      reviewCount: 0,
      orders: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({ gigs: [newGig, ...state.gigs], currentPage: 'gigs' }));
  },

  createJob: async (jobData) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      
      if (response.ok) {
        const newJob = await response.json();
        set(state => ({ jobs: [newJob as Job, ...state.jobs], currentPage: 'jobs' as Page }));
        return;
      }
    } catch (error) {
      console.error('API create job error:', error);
    }
    
    // Fallback to local creation
    const newJob: Job = {
      ...jobData,
      id: 'j' + Date.now(),
      status: 'open',
      applicants: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({ jobs: [newJob, ...state.jobs], currentPage: 'jobs' }));
  },

  applyToJob: (jobId, coverLetter, proposedBudget) => {
    const { currentUser } = get();
    if (!currentUser) return;
    const app: Application = {
      id: 'a' + Date.now(),
      jobId,
      freelancerId: currentUser.id,
      coverLetter,
      proposedBudget,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({
      applications: [...state.applications, app],
      jobs: state.jobs.map(j => j.id === jobId ? { ...j, applicants: [...j.applicants, currentUser.id] } : j),
      notifications: [...state.notifications, {
        id: 'n' + Date.now(),
        userId: state.jobs.find(j => j.id === jobId)!.clientId,
        type: 'application' as const,
        title: 'New Application',
        content: `${currentUser.name} applied to your job posting.`,
        read: false,
        timestamp: new Date().toISOString(),
      }],
    }));
  },

  acceptApplication: (applicationId) => {
    set(state => {
      const app = state.applications.find(a => a.id === applicationId);
      if (!app) return state;
      const job = state.jobs.find(j => j.id === app.jobId);
      if (!job) return state;
      
      const newOrder: Order = {
        id: 'o' + Date.now(),
        jobId: job.id,
        buyerId: job.clientId,
        sellerId: app.freelancerId,
        amount: app.proposedBudget,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        deliveryDate: job.deadline,
      };

      return {
        applications: state.applications.map(a => a.id === applicationId ? { ...a, status: 'accepted' as const } : a.jobId === app.jobId && a.id !== applicationId ? { ...a, status: 'rejected' as const } : a),
        jobs: state.jobs.map(j => j.id === app.jobId ? { ...j, status: 'in-progress' as const, assignedTo: app.freelancerId } : j),
        orders: [...state.orders, newOrder],
        notifications: [...state.notifications, {
          id: 'n' + Date.now(),
          userId: app.freelancerId,
          type: 'application' as const,
          title: 'Application Accepted!',
          content: `Your application for "${job.title}" has been accepted!`,
          read: false,
          timestamp: new Date().toISOString(),
        }],
      };
    });
  },

  placeOrder: async (gigId) => {
    const { currentUser, gigs } = get();
    if (!currentUser) return;
    const gig = gigs.find(g => g.id === gigId);
    if (!gig) return;
    
    const orderData = {
      gigId,
      buyerId: currentUser.id,
      sellerId: gig.sellerId,
      amount: gig.price,
      status: 'active',
      deliveryDate: new Date(Date.now() + gig.deliveryDays * 86400000).toISOString().split('T')[0],
    };
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        const newOrder = await response.json();
        set(state => ({
          orders: [...state.orders, newOrder as Order],
          gigs: state.gigs.map(g => g.id === gigId ? { ...g, orders: g.orders + 1 } : g),
          notifications: [...state.notifications, {
            id: 'n' + Date.now(),
            userId: gig.sellerId,
            type: 'order' as const,
            title: 'New Order!',
            content: `${currentUser.name} ordered your "${gig.title}" gig.`,
            read: false,
            timestamp: new Date().toISOString(),
          }],
          currentPage: 'orders' as Page,
        }));
        return;
      }
    } catch (error) {
      console.error('API place order error:', error);
    }
    
    // Fallback to local placement
    const newOrder: Order = {
      id: 'o' + Date.now(),
      gigId,
      buyerId: currentUser.id,
      sellerId: gig.sellerId,
      amount: gig.price,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + gig.deliveryDays * 86400000).toISOString().split('T')[0],
    };

    set(state => ({
      orders: [...state.orders, newOrder],
      gigs: state.gigs.map(g => g.id === gigId ? { ...g, orders: g.orders + 1 } : g),
      notifications: [...state.notifications, {
        id: 'n' + Date.now(),
        userId: gig.sellerId,
        type: 'order' as const,
        title: 'New Order!',
        content: `${currentUser.name} ordered your "${gig.title}" gig.`,
        read: false,
        timestamp: new Date().toISOString(),
      }],
      currentPage: 'orders' as Page,
    }));
  },

  updateOrderStatus: (orderId, status) => {
    set(state => {
      const order = state.orders.find(o => o.id === orderId);
      if (!order) return state;
      
      let updatedTransactions = state.transactions;
      let updatedUsers = state.users;
      
      if (status === 'completed') {
        updatedTransactions = state.transactions.map(t => 
          (t.fromId === order.buyerId && t.toId === order.sellerId && t.amount === order.amount && t.status === 'pending')
            ? { ...t, status: 'completed' as const } : t
        );
        updatedUsers = state.users.map(u => {
          if (u.id === order.sellerId) return { ...u, balance: u.balance + order.amount, completedJobs: u.completedJobs + 1 };
          return u;
        });
      }

      return {
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o),
        transactions: updatedTransactions,
        users: updatedUsers,
        currentUser: state.currentUser ? updatedUsers.find(u => u.id === state.currentUser!.id) || state.currentUser : null,
        notifications: [...state.notifications, {
          id: 'n' + Date.now(),
          userId: status === 'delivered' ? order.buyerId : order.sellerId,
          type: 'order' as const,
          title: `Order ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          content: `Order #${orderId} has been ${status}.`,
          read: false,
          timestamp: new Date().toISOString(),
        }],
      };
    });
  },

  sendMessage: async (receiverId, content) => {
    const { currentUser } = get();
    if (!currentUser) return;
    
    const messageData = {
      senderId: currentUser.id,
      receiverId,
      content,
    };
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
      
      if (response.ok) {
        const newMsg = await response.json();
        set(state => ({
          messages: [...state.messages, newMsg as Message],
          notifications: [...state.notifications, {
            id: 'n' + Date.now(),
            userId: receiverId,
            type: 'message' as const,
            title: 'New Message',
            content: `${currentUser.name} sent you a message.`,
            read: false,
            timestamp: new Date().toISOString(),
          }],
        }));
        return;
      }
    } catch (error) {
      console.error('API send message error:', error);
    }
    
    // Fallback to local message creation
    const newMsg: Message = {
      id: 'm' + Date.now(),
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    set(state => ({
      messages: [...state.messages, newMsg],
      notifications: [...state.notifications, {
        id: 'n' + Date.now(),
        userId: receiverId,
        type: 'message' as const,
        title: 'New Message',
        content: `${currentUser.name} sent you a message.`,
        read: false,
        timestamp: new Date().toISOString(),
      }],
    }));
  },

  markNotificationRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  },

  markAllNotificationsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => 
        n.userId === state.currentUser?.id ? { ...n, read: true } : n
      ),
    }));
  },

  addReview: async (orderId, revieweeId, gigId, rating, comment) => {
    const { currentUser } = get();
    if (!currentUser) return;
    
    const reviewData = {
      orderId,
      reviewerId: currentUser.id,
      revieweeId,
      gigId,
      rating,
      comment,
    };
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      
      if (response.ok) {
        const newReview = await response.json();
        set(state => {
          const userReviews = [...state.reviews.filter(r => r.revieweeId === revieweeId), newReview as Review];
          const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
          
          return {
            reviews: [...state.reviews, newReview as Review],
            users: state.users.map(u => u.id === revieweeId ? { ...u, rating: Math.round(avgRating * 10) / 10, reviewCount: u.reviewCount + 1 } : u),
            gigs: gigId ? state.gigs.map(g => g.id === gigId ? { ...g, rating: Math.round(avgRating * 10) / 10, reviewCount: g.reviewCount + 1 } : g) : state.gigs,
            notifications: [...state.notifications, {
              id: 'n' + Date.now(),
              userId: revieweeId,
              type: 'review' as const,
              title: 'New Review',
              content: `${currentUser.name} left a ${rating}-star review.`,
              read: false,
              timestamp: new Date().toISOString(),
            }],
          };
        });
        return;
      }
    } catch (error) {
      console.error('API add review error:', error);
    }
    
    // Fallback to local review creation
    const newReview: Review = {
      id: 'r' + Date.now(),
      orderId,
      reviewerId: currentUser.id,
      revieweeId,
      gigId,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0],
    };
    set(state => {
      const userReviews = [...state.reviews.filter(r => r.revieweeId === revieweeId), newReview];
      const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
      
      return {
        reviews: [...state.reviews, newReview],
        users: state.users.map(u => u.id === revieweeId ? { ...u, rating: Math.round(avgRating * 10) / 10, reviewCount: u.reviewCount + 1 } : u),
        gigs: gigId ? state.gigs.map(g => g.id === gigId ? { ...g, rating: Math.round(avgRating * 10) / 10, reviewCount: g.reviewCount + 1 } : g) : state.gigs,
        notifications: [...state.notifications, {
          id: 'n' + Date.now(),
          userId: revieweeId,
          type: 'review' as const,
          title: 'New Review',
          content: `${currentUser.name} left a ${rating}-star review.`,
          read: false,
          timestamp: new Date().toISOString(),
        }],
      };
    });
  },

  initialize: async () => {
    try {
      // Load users from backend
      const usersResponse = await fetch('/api/users');
      if (usersResponse.ok) {
        const users = await usersResponse.json();
        if (Array.isArray(users) && users.length > 0) {
          set({ users });
        }
      }
      
      // Load gigs from backend
      const gigsResponse = await fetch('/api/gigs');
      if (gigsResponse.ok) {
        const gigs = await gigsResponse.json();
        if (Array.isArray(gigs) && gigs.length > 0) {
          set({ gigs });
        }
      }
      
      // Load jobs from backend
      const jobsResponse = await fetch('/api/jobs');
      if (jobsResponse.ok) {
        const jobs = await jobsResponse.json();
        if (Array.isArray(jobs) && jobs.length > 0) {
          set({ jobs });
        }
      }
      
      // Load orders from backend
      const ordersResponse = await fetch('/api/orders');
      if (ordersResponse.ok) {
        const orders = await ordersResponse.json();
        if (Array.isArray(orders) && orders.length > 0) {
          set({ orders });
        }
      }
      
      // Load messages from backend
      const messagesResponse = await fetch('/api/messages');
      if (messagesResponse.ok) {
        const messages = await messagesResponse.json();
        if (Array.isArray(messages) && messages.length > 0) {
          set({ messages });
        }
      }
      
      // Load reviews from backend
      const reviewsResponse = await fetch('/api/reviews');
      if (reviewsResponse.ok) {
        const reviews = await reviewsResponse.json();
        if (Array.isArray(reviews) && reviews.length > 0) {
          set({ reviews });
        }
      }
    } catch (error) {
      console.warn('Warning: Could not load data from backend, using fallback data', error);
      // Fall back to default data if backend is unavailable
    }
  },

  getUserById: (id) => get().users.find(u => u.id === id),
  getGigById: (id) => get().gigs.find(g => g.id === id),
  getJobById: (id) => get().jobs.find(j => j.id === id),
}));
